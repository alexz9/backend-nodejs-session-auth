const { model, Schema } = require("mongoose");

const Chat = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "Participant"
  }],
  last_msg: {
    type: Schema.Types.ObjectId,
    ref: "Message"
  },
  __v: {
    type: Number,
    select: false
  }
});

module.exports = model("Chat", Chat);