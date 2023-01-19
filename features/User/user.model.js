const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
  }
);
module.exports = UserModel = mongoose.model("user", userSchema);
