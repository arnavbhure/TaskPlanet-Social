const express = require("express");
const loginController = require("../controllers/loginController");
const signupController = require("../controllers/signupController");
const meController = require("../controllers/meController");
const logoutController = require("../controllers/logoutController");
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRequest } = require("../middlewares/validateRequest");
const { loginValidator } = require("../validators/login.validator");
const { signupValidator } = require("../validators/singup.validator");
const authRouter = express.Router();

/* For login */
authRouter.post("/login", loginValidator, validateRequest, loginController);

/* For signup */
authRouter.post("/signup", signupValidator, validateRequest, signupController);

/* Current authenticated user */
authRouter.get("/me", authMiddleware, meController);

/* Logout */
authRouter.post("/logout", authMiddleware, logoutController);

module.exports = authRouter;
