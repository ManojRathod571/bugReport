const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./config/db");
const userRouter = require("./features/User/user.route");
const dashboardRoute = require("./features/Dashboard/dashboard.route");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Bug tracker");
});

app.use(express.json());
app.use("/", userRouter);
app.use("/task", dashboardRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection();
    console.log("Connected to db");
  } catch (error) {
    console.log("Not able to connect to db");
  }
  console.log(`listning to the port ${process.env.PORT}`);
});
