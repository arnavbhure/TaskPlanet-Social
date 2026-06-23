const { body, param } = require("express-validator");

const commentValidator = [
  param("id").isMongoId().withMessage("Invalid post id"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 and 500 characters"),
];

module.exports = commentValidator;
