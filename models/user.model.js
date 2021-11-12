const { model, Schema } = require("mongoose");

const User = new Schema({
  login: {
    type: String,
    required: true,
    select: false
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = model("User", User);