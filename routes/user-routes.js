const express = require("express");
const { route } = require("./portfolio-routes");
const Router = express.Router();
const {check} = require("express-validator");
 
const userController = require("../controllers/user-controller");

Router.get("/", userController.getUsers);
Router.get("/:uid", userController.getUserById);
Router.post(
  "/login/",
  [check("username").not().isEmpty(), check("password").isLength({ min: 5 })],
  userController.userLogin
);
Router.post("/signUp/",[check('username').not().isEmpty(),check('password').not().isEmpty()], userController.userSignUp);

module.exports = Router;
