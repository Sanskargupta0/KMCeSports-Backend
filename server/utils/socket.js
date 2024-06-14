const io = require("socket.io");
const GrobalNotification = require("../models/globalNotification");
const ActiveUser = require("../models/Active_users");
const user = require("../models/User_model");

module.exports = function (server) {
  const socket = io(server);

  socket.on("connection", async (socket) => {
    socket.on("join", async (data) => {
      if (data.id || data.userName) {
        const { id, userName } = data;
        const user = await ActiveUser.findOne({ userId: id });
        if (user) {
          user.socketId = socket.id;
          await user.save();
        } else {
          await new ActiveUser({
            userId: id,
            userName,
            socketId: socket.id,
          }).save();
        }
      } else {
        socket.disconnect();
      }
    });

    setTimeout(async () => {
      try {
        let notifications;
        // Fetch all message notifications
        const globalnotification = await GrobalNotification.find({}, "-_id")
          .sort({ "notification.date": -1 })
          .limit(10);
        const activeUser = await ActiveUser.findOne({ socketId: socket.id });
        if (activeUser) {
          const userNotification = await user
            .findById(activeUser.userId, "notifications")
            .select("-_id")
            .sort({ "notification.date": -1 })
            .limit(10)
            .lean(); // Convert Mongoose document to plain JavaScript object
          notifications = [
            ...userNotification.notifications,
            ...globalnotification,
          ];
        } else {
          notifications = globalnotification;
        }

        // Emit the notifications array to the connected client
        socket.emit("initialNotifications", notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }, [2000]);


    const letapce =- funation (id)>+{
      
    }
    // setTimeout(async() => {
    //   const notifications = await GrobalNotification.find({}, "-_id") // Exclude the __v field
    //     .sort({ "notification.date": -1 }) // Sort by the date field in descending order
    //     .limit(10); // Limit the result to 10 documents
    //   socket.emit("newNotification", notifications);
    // }, 5000);

    // Disconnect event
    socket.on("disconnect", async () => {
      console.log("Client disconnected", socket.id);
      const user = await ActiveUser.deleteOne({ socketId: socket.id });
      if (user) {
        console.log("User disconnected", user);
      } else {
        console.log("User not found");
      }
    });
  });
};
