const Post = require("../models/posts.schema");

const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select("_id user username text image_url likes comments createdAt");

    return res.status(200).json({
      success: true,
      posts,
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
