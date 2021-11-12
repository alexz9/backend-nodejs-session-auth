const { model, Schema } = require("mongoose");

const Message = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date
  },
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    index: true,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = model("Message", Message);