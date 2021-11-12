const { model, Schema } = require("mongoose");

const Participant = new Schema({
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
  last_read: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date
  },
  __v: {
    type: Number,
    select: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

Participant.virtual("user", {
  ref: "User",
  localField: 'user_id',
  foreignField: '_id'
})

module.exports = model("Participant", Participant);