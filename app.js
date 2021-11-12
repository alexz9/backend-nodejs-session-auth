const express = require("express");
const session = require("express-session");
const connectFileStore = require('session-file-store');
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const expressWs = require("express-ws");
const cors = require("cors");

const startDataBase = require("./db");
const apiRouter = require("./routes");
const userService = require("./services/user.service");
const socketController = require("./controllers/socket.controller");
const errorMiddleware = require("./middlewares/errorMiddleware");

const FileStore = connectFileStore(session);

passport.serializeUser((user, done) => {  
  console.log(`serialize`,)
  done(null, user)
})
passport.deserializeUser((user, done) => {
  console.log('deserialize', user)
  done(null, user)
})

passport.use(new localStrategy({ usernameField: 'login', passwordField: 'password' }, userService.login));

const app = express();
expressWs(app);

const sessionParser = session({
  secret: "sdfdsffs",
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: (30 * 24 * 60 * 60 * 1000)
  },
  store: new FileStore()
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionParser);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);

app.ws("/ws", socketController.connect);

app.use(errorMiddleware);

app.listen(8080, async () => {
  console.log("Сервер запущен");
  try {
    await startDataBase();
    console.log("БД подключено");
  } catch (error) {
    console.log(error);
  }
});


/* 
  1 - Mongodb следует заменить на PostgreSQL для лучшей производительности в крупных проектах. 
      С Mongo приходится делать лишние запросы. 
  2 - После удаления сообщения нужны костыли для обновления last_msg в Chat. Лучшее решение в пункте 1.
  3 - FileStore является тестовым хранилищем. Заменить на Redis или Mongodb.
  4 - WS не отправит сообщение по сокету, если диалог Chat еще не создан. 
      Решение в предаварительном получении данных от БД, либо вовсе обновлять весь список чатов вместо сообщения.
  5 - Можно расширить возможности сокета за счет замены ws на socket.io
*/