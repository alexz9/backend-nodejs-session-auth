const { Router } = require("express");
const userRouter = require("./user.routes");
const messageRouter = require("./message.routes");

const router = new Router();

router.use("/users", userRouter);
router.use("/messages", messageRouter);

module.exports = router;