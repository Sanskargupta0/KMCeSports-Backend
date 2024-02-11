const Contact = require("../models/contact_model");
const Email = require("../models/Email_model");
const BugReport = require("../models/bug_Report");

const constactForm = async (req, res) => {
  try {
    const responce = req.body;
    await Contact.create(responce);
    return res.status(200).json({ message: "message send successfully" });
  } catch (error) {
    res.status(422).json({ msg: "failed to send Message", error: error });
  }
};
const subscribeEmail = async (req, res) => {
  const responce = req.body;
  const isexist = await Email.findOne({ email: responce.email });
  if (isexist) {
    return res.status(422).json({ message: "Email already exist" });
  } else {
    try {
      await Email.create(responce);
      return res.status(200).json({ message: "Thanks for subscribing " });
    } catch (error) {
      res.status(422).json({ msg: "failed to subscribe", error: error });
    }
  }
};
const bugReport = async (req, res) => {
  try {
    const responce = req.body;
    await BugReport.create(responce);
    return res.status(200).json({ message: "Report send successfully" });
  } catch (error) {
    res.status(422).json({ msg: "failed to send Message", error: error });
  }
};

module.exports = { constactForm, subscribeEmail, bugReport };
