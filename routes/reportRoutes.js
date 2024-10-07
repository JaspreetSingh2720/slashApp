const express = require("express");
const authenticateToken = require("../middlewares/authentication");
const {validateReportController} = require("../middlewares/validation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const {reportUserController} = require("../controllers/reportController");

const 
router = express.Router();

router.post("/reportUser", authenticateToken, validateReportController, handleValidationErrors, reportUserController);

module.exports = router;