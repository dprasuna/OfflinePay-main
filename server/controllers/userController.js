const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { enc } = require("crypto-js");
const accountSid = "AC87a4dee030cf415e33ea9698c520bd21";
const authToken = "05748765895ffb447c395fc0cd13401a";
const client = require("twilio")(accountSid, authToken);

require("dotenv").config();

const myPhoneNumber = "+916370796484";

const generateToken = (user) => {
  const payload = { id: user._id };
  const expiresInDuration = "1d";
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresInDuration,
  });
};

const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.json({
      token,
      user,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
};

const registerUser = async (req, res) => {
  const { userName, fullName, email, password, phoneNo, pin } = req.body;
  const amount = 10000;
  const upiId = `${userName}@offpay`;
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });
  if (userExists) {
    res.status(404).json({ messsage: "Username or Email Already Exist" });
  } else {
    const user = await User.create({
      userName,
      fullName,
      email,
      password,
      phoneNo,
      pin,
      amount,
      upiId,
    });
    if (user) {
      res.status(201).json({
        Success: "User Registered Successfully!",
      });
    } else {
      res.status(400);
    }
  }
};

const getUser = async (req, res) => {
  const userId = req.headers.authorization;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).send({ user });
    }
  } else {
    return res.status(401).send({ error: "User Not Found...!" });
  }
};

const sendMoney = async (req, res) => {
  const { amount, receiverUpi, senderId, pin } = req.body;
  const sender = await User.findOne({ _id: senderId });
  const receiver = await User.findOne({ upiId: receiverUpi });
  const senderUpi = sender.upiId;
  if (sender.amount > amount && sender.pin == pin) {
    sender.amount = sender.amount - amount;
    receiver.amount = parseInt(receiver.amount) + parseInt(amount);
    const referenceNumber = Math.floor(Math.random() * 1000000000);
    sender.transactions.push({
      type: "Debit",
      referenceNumber,
      amount,
      upiId: receiverUpi,
      date: new Date().toLocaleString(),
    });
    receiver.transactions.push({
      type: "Credit",
      referenceNumber,
      amount,
      upiId: senderUpi,
      date: new Date().toLocaleString(),
    });
    await sender.save();
    await receiver.save();
    client.messages.create({
      body: `Amount of Rs.${amount} was sent successfully.`,
      from: "+13344714125",
      to: myPhoneNumber,
    });
    res.status(200).json({ message: "Amount Sent Successfully" });
  } else {
    client.messages.create({
      body: "Transaction Failed due to Insufficient Balance or Wrong Pin",
      from: "+13344714125",
      to: myPhoneNumber,
    });
    res.status(400).json({ message: "Insufficient Balance or Wrong Pin" });
  }
};

const sendMoneyOffline = async (req, res) => {
  const encodedData = req.body.message;
  const decodedData = Buffer.from(encodedData, "base64").toString("utf8");
  const data = JSON.parse(decodedData);
  const choice = data.option;

  if (choice == "1") {
    const { pin, amount, receiverId, senderId } = data;
    const sender = await User.findOne({ _id: senderId });
    const receiver = await User.findOne({ upiId: receiverId });
    const senderUpi = sender.upiId;
    var options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const date = new Date().toLocaleString("en-IN", options);
    if (sender.amount > amount && sender.pin == pin) {
      sender.amount -= amount;
      receiver.amount += amount;
      const referenceNumber = Math.floor(Math.random() * 1000000000);
      sender.transactions.push({
        type: "Debit",
        referenceNumber,
        amount,
        upiId: receiverId,
        date,
      });
      receiver.transactions.push({
        type: "Credit",
        referenceNumber,
        amount,
        upiId: senderUpi,
        date,
      });
      await sender.save();
      await receiver.save();
      client.messages.create({
        body: `Rs.${amount} sent to ${receiverId} successfully.`,
        from: "+13344714125",
        to: myPhoneNumber,
      });
      res.status(200).json({ message: "Amount Sent Successfully" });
    } else {
      client.messages.create({
        body: "Transaction Failed due to Insufficient Balance or Wrong Pin",
        from: "+13344714125",
        to: myPhoneNumber,
      });
      res.status(400).json({ message: "Insufficient Balance or Wrong Pin" });
    }
  } else if (choice == "2") {
    const { pin, senderId } = data;
    const sender = await User.findOne({ _id: senderId });
    if (sender.pin == pin) {
      client.messages.create({
        body: `Your current balance is Rs.${sender.amount}`,
        from: "+13344714125",
        to: myPhoneNumber,
      });
      res.status(200).json({ balance: sender.amount });
    } else {
      client.messages.create({
        body: "Unable to check balance due to Wrong Pin",
        from: "+13344714125",
        to: myPhoneNumber,
      });
      res.status(400).json({ message: "Wrong Pin" });
    }
  } else if (choice == "3") {
    const { senderId } = data;
    const sender = await User.findOne({ _id: senderId });
    const last5Transactions = sender.transactions.slice(-5);
    client.messages.create({
      body: `Last 5 Transactions: ${JSON.stringify(last5Transactions)}`,
      from: "+13344714125",
      to: myPhoneNumber,
    });
    res.status(200).json({ last5Transactions });
  } else {
    client.messages.create({
      body: "Invalid Option",
      from: "+13344714125",
      to: myPhoneNumber,
    });
    res.status(400).json({ message: "Invalid Option" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  sendMoney,
  sendMoneyOffline,
};
//banda