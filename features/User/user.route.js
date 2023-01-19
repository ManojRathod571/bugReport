const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("./user.model");
module.exports = userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.log("Error", error);
    res.send({ err: "Something went wrong" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  let userPresent = await UserModel.find({ email });
  if (userPresent.length > 0) {
    res.send({ msg: "User is already present" });
  }
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      let user = await UserModel.create({
        email,
        password: hashedPassword,
      });
      res.send(user);
    });
  } catch (error) {
    console.log("Something went wrong");
    res.send({ msg: "signup Failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    console.log("User", user);
    if (user.length > 0) {
      let hashed_password = user[0].password;
      console.log("hashed password", hashed_password);
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "hush");
          res.send({ msg: "Login successfully", token });
        } else {
          res.send({ msg: "Login Failed" });
        }
      });
    } else {
      console.log("Please enter the correct email or password");
      res.send({ err: "Please enter the correct email or password" });
    }
  } catch (error) {
    console.log("Error", error);
    res.send({ err: "Please enter correct username or password" });
  }
});
