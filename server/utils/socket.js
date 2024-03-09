const io = require("socket.io");
const GrobalNotification = require("../models/globalNotification");
const ActiveUser = require("../models/Active_users");

module.exports = function (server) {
  const socket = io(server);

  socket.on("connection", async (socket) => {
    console.log("Client connected", socket.id);
    socket.on("join", async (data) => {
      console.log("join", data);
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
      }
    });

    try {
      // Fetch all message notifications
      const notifications = await GrobalNotification.find({}, "-_id") // Exclude the __v field
        .sort({ "notification.date": -1 }) // Sort by the date field in descending order
        .limit(10); // Limit the result to 10 documents

      // Emit the notifications to the connected client
      socket.emit("initialNotifications", notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }

    setTimeout(async() => {
      const notifications = await GrobalNotification.find({}, "-_id") // Exclude the __v field
        .sort({ "notification.date": -1 }) // Sort by the date field in descending order
        .limit(10); // Limit the result to 10 documents
      socket.emit("notification", notifications);
    }, 3000);

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
