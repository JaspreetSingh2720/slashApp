const Users = require("../models/users");
const UserAnswer = require("../models/userAnswer");
const Questions = require("../models/questions");
const JWT = require("jsonwebtoken");
const response = require("../helpers/apiResponse");
const msgs = require("../helpers/messages");
// async function addUserDataController(req, res) {
//   try {
//     const {
//       email,
//       phoneNo,
//       longitude,
//       latitude,
//       firstname,
//       lastname,
//       birthdate,
//       documentType,
//       address,
//       gender,
//       showGender,
//       perfectMatch,
//       showPerfectMatch,
//       ageRange,
//       bio,
//       education,
//       university,
//       pushNotifications,
//       interests,
//       fbUrl,
//       instaUrl,
//       snapchatUrl,
//       spotifyUrl,
//       appleMusicUrl,
//       tiktokUrl,
//       screenNo,
//     } = req.body;

//     console.log(req.files);

//     const photos = req.files.photos
//       ? req.files.photos.map((file) => file.filename)
//       : [];

//     await Users.create({
//       email,
//       phoneNo,
//       location: {
//         type: "Point",
//         coordinates: [longitude, latitude],
//       },
//       firstname,
//       lastname,
//       birthdate,
//       document: {
//         documentType: documentType,
//         frontSide: req.files.documents[0].filename,
//         backSide: req.files.documents[1].filename,
//       },
//       address,
//       gender,
//       showGender,
//       perfectMatch,
//       showPerfectMatch,
//       ageRange,
//       photos,
//       bio,
//       education,
//       university,
//       pushNotifications,
//       interests,
//       fbUrl,
//       instaUrl,
//       snapchatUrl,
//       spotifyUrl,
//       appleMusicUrl,
//       tiktokUrl,
//       screenNo,
//     });
//     return response.createdSuccessfullyResponse(
//       res,
//       "User Created Successfully"
//     );
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       "Error in addUserData Api"
//     );
//   }
// }
const signupController = async (req, res) => {
  try {
    const { email, phoneNo, screenNo } = req.body;
    if (!email && !phoneNo) {
      return response.badRequestResponse(
        res,
        "Please provide email or password"
      );
    }
    let checkUser;
    if (email) {
      checkUser = await Users.findOne({ email });
    } else if (phoneNo) {
      checkUser = await Users.findOne({ phoneNo });
    }

    if (checkUser) {
      return response.notFoundResponse(res, "User already existed");
    }

    await Users.create({ email: email, phoneNo: phoneNo, screenNo: screenNo });

    // otp generation
    const updateOtp = await Users.findOneAndUpdate(
      { $or: [{ email }, { phoneNo }] },
      { $set: { otp: "1234" } }
    );
    return response.okResponse(res, "otp generated");
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in SignUp Api"
    );
  }
};

const otpVerifyController = async (req, res) => {
  try {
    const { email, phoneNo, otp } = req.body;

    let user;

    if (email) {
       user = await Users.findOne({
        email: email,
        otp: otp,
      });
    }
    if(phoneNo){
       user = await Users.findOne({
        phoneNo: phoneNo,
        otp: otp,
      });
    }
    // const user = await Users.findOne({
    //   $or: [{ email: email }, { phoneNo: phoneNo }],
    //   otp: otp,
    // });

    if (!user) {
      return response.notFoundResponse(res, "Invalid Otp");
    }
    const token = JWT.sign(
      { id: user._id, email: email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    return response.okResponse(res, "Otp Verified", token);
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in OtpVerify Api"
    );
  }
};

const loginController = async (req, res) => {
  try {
    const { email, phoneNo } = req.body;

    if (!email && !phoneNo) {
      return response.badRequestResponse(
        res,
        "Please provide email or password"
      );
    }

    const checkUser = await Users.findOne({ $or: [{ email }, { phoneNo }] });
    console.log(checkUser);

    if (!checkUser) {
      return response.notFoundResponse(
        res,
        "User does not Exists, Please SignUp First "
      );
    }

    // otp generation
    const updateOtp = await Users.findOneAndUpdate(
      { email: email },
      { $set: { otp: "1234" } }
    );
    return response.okResponse(res, "Otp Sent Successfull");
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in Login Api"
    );
  }
};

// const signinOtpController = async (req, res) => {
//   try {
//     const { email, phoneNo, otp } = req.body;
//     const user = await Users.findOne({
//       $or: [{ email: email }, { phoneNo: phoneNo }],
//       otp: otp,
//     });

//     if (!user) {
//       return response.notFoundResponse(res, "Invaid Otp");
//     }

//     return response.okResponse(res, "Otp Verified", token);
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       "Error in SignIn Otp Api"
//     );
//   }
// };

const updateUserController = async (req, res) => {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }
    const {
      email,
      phoneNo,
      longitude,
      latitude,
      firstname,
      lastname,
      birthdate,
      address,
      gender,
      showGender,
      perfectMatch,
      showPerfectMatch,
      ageRange,
      bio,
      education,
      university,
      pushNotifications,
      interests,
      fbUrl,
      instaUrl,
      snapchatUrl,
      spotifyUrl,
      appleMusicUrl,
      tiktokUrl,
      screenNo,
    } = req.body;

    // const photos = req.files.photos
    //   ? req.files.photos.map((file) => file.filename)
    //   : [];

    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          email,
          phoneNo,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          firstname,
          lastname,
          birthdate,
          // document: {
          //   documentType: documentType,
          //   frontSide: req.files.documents[0].filename,
          //   backSide: req.files.documents[1].filename,
          // },
          address,
          gender,
          showGender,
          perfectMatch,
          showPerfectMatch,
          ageRange,
          // photos,
          bio,
          education,
          university,
          pushNotifications,
          interests,
          fbUrl,
          instaUrl,
          snapchatUrl,
          spotifyUrl,
          appleMusicUrl,
          tiktokUrl,
          screenNo,
        },
      },
      { new: true }
    );
    return response.okResponse(res, "User Updated Successfully");
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in Update User Api"
    );
  }
};

const userAnswerController = async (req, res) => {
  try {
    const { options, questionId, screenNo } = req.body;
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }
    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { screenNo: screenNo } },
      { new: true }
    );

    await UserAnswer.create({
      userId: user._id,
      questionId: questionId,
      options: options,
    });
    return response.okResponse(res, msgs.okResponses.CREATED_SUCCESSFULLY);
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
};

const getAllQuestionsController = async (req, res) => {
  try {
    const questions = await Questions.find({});
    if (!questions.length) {
      return response.notFoundResponse(
        res,
        msgs.notFoundResponse.NO_RECORDS_FOUND
      );
    }
    return response.okResponseWithData(
      res,
      msgs.okResponses.RECORDS_FOUND,
      questions
    );
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId, deletedComment } = req.query;
    if (!userId) {
      return helper.errorResponse(res, err.message, "Please provide userId");
    }
    const deletedUser = await USERS.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          idActive: false,
          isDeleted: true,
          deletedBy: "2",
          deletedComment: deletedComment ?? "Deleted By Admin",
        },
      },
      { new: true }
    );
    if (!deletedUser) {
      return helper.errorResponse(res, err.message, "User Not Exists");
    }
    return helper.successResponse(res, messages.DELETED_SUCCESSFULLY);
  } catch (error) {
    return helper.errorResponseWithData(
      res,
      err.message,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return helper.errorResponse(res, err.message, "Please provide userId");
    }
    const userDetails = await USERS.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$_id", { $toObjectId: userId }],
          },
        },
      },
      {
        $project: {
          otp: 0,
        },
      },
    ]);
    if (!userDetails) {
      return helper.errorResponse(res, err.message, "User Not Exists");
    }
    return helper.successResponseWithData(
      res,
      "Records Found Successfully",
      userDetails
    );
  } catch (error) {
    return helper.errorResponseWithData(
      res,
      err.message,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return helper.errorResponse(res, err.message, "Please provide userId");
    }
    const users = await USERS.find({});
    if (!users) {
      return helper.errorResponse(res, err.message, "User Not Exists");
    }
    return helper.successResponseWithData(
      res,
      "Records Found Successfully",
      users
    );
  } catch (error) {
    return helper.errorResponseWithData(
      res,
      err.message,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};

exports.editUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      address,
      identity,
      perfectMatch,
      ageRange,
      bio,
      interests,
      allowLocation,
      socialId,
      userRole,
      coins,
      education,
      university,
      latitude,
      longitude,
      screenNumber,
      identityPublic,
      perfectMatchPublic,
      socialMediaPublic,
      interestsPublic,
      allowNotification,
      socialUrls,
      age,
      preferedDistance,
    } = req.body;

    const { userId } = req.query;
    if (!userId) {
      return helper.errorResponse(res, err.message, "Please provide userId");
    }

    let payloadObject = {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      address: address,
      identity: identity,
      perfectMatch: perfectMatch,
      ageRange: ageRange,
      bio: bio,
      interests: interests,
      allowLocation: allowLocation,
      socialId: socialId ?? null,
      userRole: userRole,
      coins: coins,
      education: education ?? "",
      university: university ?? "",
      latitude: latitude,
      longitude: longitude,
      isExisted: true,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      screenNumber: screenNumber,
      identityPublic: identityPublic,
      perfectMatchPublic: perfectMatchPublic,
      socialMediaPublic: socialMediaPublic,
      interestsPublic: interestsPublic,
      allowNotification: allowNotification,
      socialUrls: socialUrls,
      userAge: age ?? "",
      preferedDistance: preferedDistance,
    };
    const editUser = await USERS.findByIdAndUpdate(
      { _id: userId },
      { $set: payloadObject },
      { new: true }
    );
    if (!editUser) {
      return helper.errorResponse(res, err.message, "User Not Exists");
    }
    return helper.successResponseWithData(
      res,
      "User Edited Successfully",
      editUser
    );
  } catch (error) {
    return helper.errorResponseWithData(
      res,
      err.message,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getDashboardDetails = async (req, res) => {
  try {
    const dashboardDetails = await USERS.aggregate([
      {
        $facet: {
          stats: [
            {
              $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                totalActiveUsers: {
                  $sum: { $cond: [{ $eq: ["$idActive", true] }, 1, 0] },
                },
              },
            },
          ],
          latestUsers: [
            {
              $sort: { $createdAt: -1 },
            },
            {
              $limit: 10,
            },
          ],
        },
      },
      {
        $unwind: "$stats",
      },
    ]);

    if (!dashboardDetails) {
      return helper.errorResponse(res, err.message, "Records Not Found");
    }
    return helper.successResponseWithData(
      res,
      "Records Found Successfully",
      dashboardDetails
    );
  } catch (error) {
    return helper.errorResponseWithData(
      res,
      err.message,
      messages.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  signupController,
  otpVerifyController,
  loginController,
  updateUserController,
  userAnswerController,
  getAllQuestionsController,
};
