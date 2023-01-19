const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: { type: String, enum: ["Critical", "Major", "Medium", "Low"] },
    title: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = Task = mongoose.model("task", taskSchema);
