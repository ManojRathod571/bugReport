const mongoose = require("mongoose");

module.exports = connection = () => {
  return mongoose.connect(
    "mongodb+srv://manojrathod:manojrathod@cluster0.7tr5ebo.mongodb.net/bugTrackerDB?retryWrites=true&w=majority"
  );
};
