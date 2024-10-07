const { body } = require("express-validator");
exports.validateLikesController = [
  body("likeStatus").isBoolean().withMessage("likeStatus must be a boolean"),
  body("dislikeStatus")
    .isBoolean()
    .withMessage("dislikeStatus must be a boolean"),
  body("superLikeStatus")
    .isBoolean()
    .withMessage("superLikeStatus must be a boolean"),
  body("boostProfileStatus")
    .isBoolean()
    .withMessage("boostProfileStatus must be a boolean"),
  body("likedUserId")
    .isMongoId()
    .withMessage("likedUserId must be a valid MongoId"),
];

exports.validateReportController = [
  body("reportedUserId")
    .notEmpty()
    .withMessage("reportedUserId must not be empty")
    .isMongoId()
    .withMessage("reportedUserId must be a valid MongoId")
    .trim(),
  body("reportReason").notEmpty().trim(),
  body("description").optional().trim()
];
