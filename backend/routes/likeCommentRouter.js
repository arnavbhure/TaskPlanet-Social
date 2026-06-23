const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");

const { toggleLike } = require("../controllers/likePostController");
const { addComment } = require("../controllers/commentPostController");

const commentValidator = require("../validators/posts/comment.validator");
const likeValidator = require("../validators/posts/like.validator");
const { validateRequest } = require("../middlewares/validateRequest");

const likeCommentRouter = express.Router();

likeCommentRouter.put(
  "/posts/:id/like",
  authMiddleware,
  likeValidator,
  validateRequest,
  toggleLike,
);

likeCommentRouter.post(
  "/posts/:id/comment",
  authMiddleware,
  commentValidator,
  validateRequest,
  addComment,
);

module.exports = likeCommentRouter;
