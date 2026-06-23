const Post = require("../models/posts.schema");

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const comment = {
      user: req.user._id,
      username: req.user.username,
      text: text.trim(),
      created_at: new Date(),
    };

    post.comments.push(comment);
    const savedComment = post.comments[post.comments.length - 1];

    await post.save();

    return res.status(201).json({
      success: true,
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addComment };
