const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8000;
dbConnect();

app.get("/", async (req, res) => {
  res.send("Welcome to the Backend API!");
});


app.use("/users", userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
