const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const Participant = require("../models/participant.model");

class MessageService {
  async getChats(user_id) {
    const parts = await Participant.find({ user_id }, { chat_id: 1 });
    const chat_ids = parts.map(item => item.chat_id);
    return await Chat
      .find({ _id: { $in: chat_ids } })
      .populate("last_msg")
      .populate({
        path: "participants",
        populate: {
          path: "user",
          select: "name"
        }
      });
  }
  async getMessages(chat_id, user_id, offset = 0) {
    console.log(chat_id, user_id)
    await Participant.updateOne({ chat_id, user_id }, { last_read: new Date() });
    return await Message.find({ chat_id, deleted_at: { $exists: false } }).sort({ create_at: 1 }).skip(offset).limit(20);
  }
  async sendMessage(chat_id, body, user_id, recipient_id) {
    console.log(chat_id, body, user_id, recipient_id)
    if (!chat_id) {
      const chat = new Chat({})
      chat_id = chat._id;
      const parts = await Participant.insertMany([{ chat_id, user_id }, { chat_id, user_id: recipient_id }]);
      chat.participants = parts.map(item => item._id)
      await chat.save();
    }
    const msg = await Message.create({ body, user_id, chat_id });
    return await Chat.updateOne({ _id: chat_id }, { $set: { last_msg: msg._id } });
  }
  async deleteMessage(msg_id) {    
    await Message.updateOne({ _id: msg_id }, { $set: { deleted_at: new Date() } });
  }
}

module.exports = new MessageService();