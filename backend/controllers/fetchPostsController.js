const Post = require("../models/posts.schema");

const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select("_id user username text image_url likes comments createdAt")
      .lean();

    const userId = String(req.user._id);

    const postsWithMeta = posts.map((post) => ({
      ...post,
      likedByMe: (post.likes || []).some(
        (like) => String(like.user) === userId,
      ),
    }));

    return res.status(200).json({
      success: true,
      posts: postsWithMeta,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { fetchAllPosts };
