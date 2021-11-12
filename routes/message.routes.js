const { Router } = require("express");
const { body, query } = require("express-validator");
const messageController = require("../controllers/message.controller");
const isAuth = require("../middlewares/isAuth.js");
const validatorCheckErrors = require("../middlewares/validatorCheckErrors");

const router = Router();

router.use(isAuth);

router
  .route("/")
  .get(
    query("chat_id").isMongoId(),
    validatorCheckErrors,
    messageController.getMessages
  )
  .post(
    body("msg").isString(),
    body("recipient_id").isMongoId(),
    validatorCheckErrors,
    messageController.createMessage
  )
  .delete(
    body("msg_id").isMongoId(),
    validatorCheckErrors,
    messageController.deleteMessage
  )

router
  .route("/chats")
  .get(messageController.getChats)  

module.exports = router;