const KMCWallet = require('../models/KMCWallet');
const user = require('../models/User_model');
const RedeemItem = require('../models//Redeem_item');
const getWalletData = async (req, res) => {
    try {
        const walletData = await KMCWallet.findOne({ 'user.id': req.user.userid })
        .select({
            _id: 0,
            user: 0,
            __v: 0,
        });        if (!walletData) {
            return res.status(400).json({ msg: "Wallet not found" });
        }
        res.status(200).json(walletData);
    } catch (error) {
        console.log(error);
    }
};

const paymentHistory = async (req, res) => {
    try {
        const paymentHistory = await user.findOne({ _id: req.user.userid }).select({
            paymentHistory: 1,
        });
        res.status(200).json(paymentHistory);
    } catch (error) {
        console.log(error);
    }
};

const getRedeemItems = async (req, res) => {
    try {
        const redeemItems = await RedeemItem.find().select({
            request: 0,
        });
        res.status(200).json(redeemItems);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getWalletData, paymentHistory, getRedeemItems };