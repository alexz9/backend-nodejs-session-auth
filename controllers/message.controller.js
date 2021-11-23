const socketController = require("./socket.controller");
const messageService = require("../services/message.service");

class MessageController {
  async getMessages(req, res, next) {
    try {
      const { chat_id, offset } = req.query;
      const data = await messageService.getMessages(chat_id, req.user.id, offset);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async getChats(req, res, next) {
    try {
      const data = await messageService.getChats(req.user.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }  
  async createMessage(req, res, next) {
    try {
      const { recipient_id, msg, chat_id } = req.body;
      const msgData = await messageService.createMessage(chat_id, msg, req.user.id, recipient_id);
      socketController.sendMessage(req.user.id, recipient_id, msgData);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteMessage(req, res, next) {
    try {
      await messageService.deleteMessage(req.body.msg_id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();