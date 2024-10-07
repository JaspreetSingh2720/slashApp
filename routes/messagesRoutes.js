const express = require("express");
const {createMessagesController, getMessagesController} = require("../controllers/messagesController")
const authenticateToken = require("../middlewares/authentication");

const router = express.Router();

router.post("/createMessages", authenticateToken, createMessagesController);
router.get("/getMessages", authenticateToken, getMessagesController);

module.exports = router