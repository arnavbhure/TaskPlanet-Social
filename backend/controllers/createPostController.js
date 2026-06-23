const Post = require("../models/posts.schema");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    let image_url = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "social-posts",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      image_url = uploadResult.secure_url;
    }

    if (!text?.trim() && !image_url) {
      return res.status(400).json({
        success: false,
        message: "Post must contain text or image",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      username: req.user.username,
      text: text?.trim() || "",
      image_url,
    });

    return res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createPost };
