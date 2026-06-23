const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const { validateRequest } = require("../middlewares/validateRequest");
const { loginValidator } = require("../validators/login.validator");
const { signupValidator } = require("../validators/singup.validator");
const authRouter = express.Router();

/* For login */
authRouter.post(
  "/auth/login",
  loginValidator,
  validateRequest,
  loginController,
);

/* For signup */
authRouter.post(
  "/auth/signup",
  signupValidator,
  validateRequest,
  signupController,
);

module.exports = authRouter;
