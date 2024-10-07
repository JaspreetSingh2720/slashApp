const express = require("express");
const{uploadDocumentController,uploadPhotosController} = require("../controllers/uploadImageController")
const router = express.Router();
const upload = require("../middlewares/multer");
const authenticateToken = require("../middlewares/authentication");

router.put("/uploadDocument", authenticateToken, upload.any(), uploadDocumentController);
router.put("/uploadPhotos", authenticateToken, upload.any(), uploadPhotosController);

module.exports = router;