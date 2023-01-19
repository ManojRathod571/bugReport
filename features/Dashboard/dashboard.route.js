const express = require("express");
const Task = require("./dashboard.model");
const dashboardRoute = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../User/user.model");

const authMiddleWare = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  try {
    if (!token) {
      return res.send("Token missing");
    } else {
      let verify = jwt.verify(token, SECRET_KEY);
      if (!verify) {
        return res.send("Invalid token");
      } else {
        let user = await User.findOne({ _id: verify._id });
        if (!user) {
          return res.send("user not found");
        } else {
          req._id = user._id;
          next();
        }
      }
    }
  } catch (error) {
    return res.send(error);
  }
};

dashboardRoute.use(authMiddleWare);

dashboardRoute.get("", async (req, res) => {
  const { status } = req.query;
  try {
    let task = await Task.find({ user: req._id }).populate(["user"]);
    return res.send(task);
  } catch (error) {
    return res.send(error);
  }
});

dashboardRoute.delete("/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete({ _id: req.params.id });
    return res.send({ status: 0, message: "Deleted Successfully" });
  } catch (error) {
    return res.send(e.message);
  }
});

dashboardRoute.post("", async (req, res) => {
  const { status, title } = req.body;
  try {
    let tasks = await Task.find({ user: req._id, status: status });
    if (tasks.length === 5) {
      return res.send("Can not report more than 5 bugs");
    } else {
      // let task = await Task.findById({ _id: req.params.id });
      let temp = await Task.create({
        ...req.body,
        user: req._id,
      });
      // await Task.findByIdAndDelete({ _id: req.params.id });
      return res.send(temp);
    }
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = dashboardRoute;
