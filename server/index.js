const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboardRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();

//database url
mongoose
  .connect("mongodb+srv://event:event123@cluster0.kihuz5y.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

require("./models/otpAuth");
require("./models/user");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/user", dashboardRouter);

app.get("/", (req, res) => {
  res.send("Event Management micro services API.");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running🚀: http://localhost:5000/");
});
