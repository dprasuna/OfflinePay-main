const mongoose= require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://qwe123:qwe123@cluster0.0xfo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{console.log("MongoDB Connected")});
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports= connectDB;