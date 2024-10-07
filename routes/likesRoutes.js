const express = require("express");
const {likesController, likedUserDataController, peopleLikedUserContoller} = require("../controllers/likesController")
const authenticateToken = require("../middlewares/authentication");
const {validateLikesController} = require("../middlewares/validation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const router = express.Router();


router.post("/likes", authenticateToken, validateLikesController, handleValidationErrors, likesController);
router.get("/likedUserData", authenticateToken, likedUserDataController);
router.get("/peopleLikedUser", authenticateToken, peopleLikedUserContoller);
module.exports = router;