const instance = require("../utils/Razorpay/setup");
const crypto = require("crypto");
const User = require("../models/User_model")
const joinedGames = require("../models/Games_model")

const createOrder = async (req, res) => {
  const { price, gameId } = req.body;
  try {
    const joinedUser = await joinedGames.findById(gameId);
    
    if(joinedUser.playerdata.includes(req.user.userid)){
      return res.status(200).json({success: false, msg: "You have already joined this game"});
    }
    else if(joinedUser.playerdata.length === joinedUser.numberofPlayers.number){
      return res.status(200).json({success: false, msg: "Game is already full"});
    }
    else{
    const options = {
      amount: Number(price * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: gameId,
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  }
  } catch (error) {
    console.log(error);
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, gameId, formData }= req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                              .update(body.toString())
                              .digest("hex");
    if (expectedSignature === razorpay_signature) {
      const user = await User.findById(req.user.userid);
      const gameData = await joinedGames.findById(gameId);
      user.joinedGames.push({
        gameId,
        joinedAt: new Date(),
        payment_id: razorpay_payment_id,
        formData
      });
      user.tournaments.participated += 1;
      gameData.playerdata.push(req.user.userid);
      gameData.numberofPlayers.currentLeftSpace -= 1;
      const update = await user.save();
      const updateGame = await gameData.save();
      if(update && updateGame){
      res.status(200).json({ success: true });
      }
      else{
        res.status(400).json({ success: false,  msg:"error in updating user data" });
      }
    } else {
      res.status(400).json({ success: false });
    }  
  } catch (error) {
    console.log(error)
  }
};


module.exports = { createOrder, paymentVerification };
