const { Router } = require("express");
const userController = require("../controllers/user.controller.js");
const passport = require("passport");
const isAuth = require("../middlewares/isAuth.js");
const { body } = require("express-validator");
const validatorCheckErrors = require("../middlewares/validatorCheckErrors.js");

const router = Router();

router
  .route("/")
  .get(isAuth, userController.getUsers)

router
  .route("/search")
  .get(isAuth, userController.search)

router
  .route("/login")
  .post(
    body("login").isEmail(),
    body("password").isLength({ min: 4, max: 15 }),
    validatorCheckErrors,
    passport.authenticate("local"),
    userController.login
  )

router
  .route("/registration")
  .post(
    body("login").isEmail(),
    body("password").isLength({ min: 4, max: 15 }),
    body("name").isLength({ min: 3, max: 20 }),
    validatorCheckErrors,
    userController.registration
  )

router
  .route("/logout")
  .post(userController.logout)

module.exports = router;