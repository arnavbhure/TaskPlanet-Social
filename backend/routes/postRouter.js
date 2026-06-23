const express = require("express");
const createPostValidator = require("../validators/posts/post.validator");
const { createPost } = require("../controllers/createPostController");
const { fetchAllPosts } = require("../controllers/fetchPostsController");
const { validateRequest } = require("../middlewares/validateRequest");

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/multer");

const postRouter = express.Router();

postRouter.get("/posts", authMiddleware, fetchAllPosts);

postRouter.post("/posts", authMiddleware, upload.single("image"), createPost);

module.exports = postRouter;
