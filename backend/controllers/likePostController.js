const Post = require("../models/posts.schema");

const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user._id;
    const username = req.user.username;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const existingLikeIndex = post.likes.findIndex(
      (l) => String(l.user) === String(userId),
    );

    let liked = false;

    if (existingLikeIndex !== -1) {
      // unlike
      post.likes.splice(existingLikeIndex, 1);
      liked = false;
    } else {
      // like
      post.likes.push({ user: userId, username });
      liked = true;
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { toggleLike };
