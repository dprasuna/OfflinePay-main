const express = require ("express");
const {
  loginUser,
  registerUser,
  getUser,
  sendMoney,
  sendMoneyOffline,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getUser").get(getUser);
router.route("/sendMoney").post(sendMoney);
router.route("/sendMoneyOffline").post(sendMoneyOffline);



module.exports=router;