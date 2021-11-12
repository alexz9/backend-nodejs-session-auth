const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
  async getUsers(userId) {
    return await User.find({ _id: { $ne: userId } });
  }
  async search(userId, search) {
    const reg = new RegExp(`(${search})`, "gi");
    return await User.find({ _id: { $ne: userId }, login: reg }, { _id: 1, name: 1 });
  }
  async login(login, password, done) {
    const user = await User.findOne({ login }, { password: 1});
    if (!user) {
      return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return done(null, false);
    }
    done(null, { id: user._id });
  }
  async registration(login, password, name) {
    const user = await User.findOne({ login });
    if (user) {
      return null;
    }
    const hash = await bcrypt.hash(password, 3);
    return await User.create({ password: hash, login, name });
  }
}

module.exports = new UserService();