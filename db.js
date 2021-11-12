const mongoose = require("mongoose");

//подключение к базе данных
const MONGO_HOSTNAME = 'localhost';
const MONGO_PORT = '27017';
const DB_NAME = "messanger";
const URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${DB_NAME}`;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = async function(){
  return mongoose.connect(URL, OPTIONS);
}