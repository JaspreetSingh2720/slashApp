const express = require("express");

const {
  signupController,
  otpVerifyController,
  loginController,
  updateUserController,
  userAnswerController,
  getAllQuestionsController,
  editUserController,
  deleteUserController,
  getUserDetailsController,
  getDashboardDetails
} = require("../controllers/userController");

const authenticateToken = require("../middlewares/authentication");

const router = express.Router();

router.post("/signup", signupController);
router.post("/otpVerify", otpVerifyController);
router.post("/signin", loginController);
router.put("/updateUser", authenticateToken, updateUserController);
router.post("/userAnswer", authenticateToken, userAnswerController);
router.get("/getAllQuestions", getAllQuestionsController);
// router.put("/deleteUser", deleteUserController);
// router.get("/getUserDetails", getUserDetailsController);
// router.put("/editUser", editUserController);
// router.get("/getDashboardDetails", getDashboardDetails);
module.exports = router;
