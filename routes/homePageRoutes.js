const express = require("express");
const {getHomePageData, getRecommendations} = require("../controllers/homePageController")
const authenticateToken = require("../middlewares/authentication")
const router = express.Router();


router.get("/homepage", authenticateToken, getHomePageData);
router.get("/getRecommendations", authenticateToken, getRecommendations);
module.exports = router;