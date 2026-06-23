const { body } = require("express-validator");

const createPostValidator = [
  body().custom((value, { req }) => {
    if (!req.body.text?.trim() && !req.file) {
      throw new Error("Post must contain text or image");
    }

    return true;
  }),
];

module.exports = createPostValidator;
