const userService = require("../services/user.service");

class UserController {
  async getUsers(req, res, next) {
    try {
      const data = await userService.getUsers(req.user.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async search(req, res, next) {
    try {
      const data = await userService.search(req.user.id, req.query.q);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async registration(req, res, next) {
    try {
      const { login, password, name } = req.body;
      const data = await userService.registration(login, password, name);
      if (!data) {
        return res.status(400).send("User data incorrect");
      }
      res.redirect(307, "/api/users/login");
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      console.log("route login", req.user)
      res.json({ success: true });
    } catch (error) {
      next(error);
    }    
  }
  async logout(req, res, next) {
    try {
      req.logout();
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();