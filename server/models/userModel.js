const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TransactionSchema = new mongoose.Schema({
    referenceNumber: String,
    type: String,
    upiId: String,
    amount: Number,
    date: String,
  });

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
    upiId: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    pin: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    transactions: [TransactionSchema], 
})


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = new mongoose.model("userDatas", userSchema);
