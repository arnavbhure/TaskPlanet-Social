const { param } = require("express-validator");

const likeValidator = [
  param("id").isMongoId().withMessage("Invalid post id"),
];

module.exports = likeValidator;
