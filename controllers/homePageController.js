const Users = require("../models/users");
const response = require("../helpers/apiResponse");
const msgs = require("../helpers/messages");
const { UserAnswer } = require("../models/userAnswer");
const mongoose= require("mongoose");
async function getHomePageData(req, res) {
  try {
    console.log(req.user.id);
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.badRequestResponse(res, "No user found");
    }
    // console.log(user.location.coordinates);

    const nearUser = await Users.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: user.location.coordinates },
          distanceField: "dist.calculated",
          maxDistance: 10000,
          spherical: true,
        },
      },
    ]);
    const data = nearUser.map((i) => ({
      name: i.firstname,
      birthdate: new Date().getFullYear() - new Date(i.birthdate).getFullYear(),
      distance: i.dist.calculated / 1609,
      profileImage: i.photos[0],
    }));
    console.log(nearUser);
    return response.okResponseWithData(
      res,
      "Nearby Users Found Successfully",
      data
    );
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in getHomePage Api"
    );
  }
}

// async function getRecommendations(req, res) {
//   try {
//     const current_user = await Users.findById({ _id: req.user.id });
//     if (!current_user) {
//       return response.badRequestResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }
//     console.log("+++++++++++", current_user)
//     // console.log("==========================",current_user.location.coordinates)
//     const recommendedUsers = await Users.aggregate([
//       {
//         $geoNear: {
//           near: {type : "Point", coordinates: current_user.location.coordinates},
//           distanceField: "distance",
//           maxDistance: 50000,
//           spherical : true
//         }
//       },
//       {
//         $match: {
//           _id: {$ne: current_user._id},
//           gender: current_user.perfectMatch,
//           perfectMatch: current_user.gender
//         }
//       },
//       {
//         $lookup: {
//           from : "likes",
//           localField: "_id",
//           foreignField: "userId",
//           as : "likes"
//         }
//       },
//       {
//         $addFields: {
//           sharedInterests: {$size: {$setIntersection: ["$interests", current_user.interests]}},
//           likeStatus: {$in: [current_user._id, "$likes.likedUserId"]}
//         }
//       },
//       {
//         $match: {
//           sharedInterests: {$gt: 0}
//         }
//       },
//       {
//         $sort: {
//           likeStatus: -1,
//           sharedInterests: -1,
//           distance: 1
//         }
//       },
//     ]);
//     if(!recommendedUsers){
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }
//     return response.okResponseWithData(res, msgs.okResponses.RECORDS_FOUND, recommendedUsers);
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// }

async function getRecommendations(req, res) {
  try {
    
    const current_user = await Users.findById({ _id: req.user.id });

  console.log("curent_user", current_user)
    if (!current_user) {
      return response.badRequestResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }

    const currentUserAnswer = await UserAnswer.aggregate([
      {
        $match: {
          userId: current_user._id
        }
      }
    ])///////
    console.log("herrrrrrrrrreeeeeeee", currentUserAnswer);

    const recommendedUsers = await Users.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: current_user.location.coordinates,
          },
          distanceField: "distance",
          maxDistance: 50000,
          spherical: true,
        },
      },
      {
        $match: {
          _id: { $ne: current_user._id },
          gender: current_user.perfectMatch,
          perfectMatch: current_user.gender,
        },
      },
      {
        $lookup: {
          from: "useranswers",
          localField: "_id",
          foreignField: "userId",
          as: "recommendedUserAnswers",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "userId",
          as: "likes",
        },
      },
      {
        $addFields: {
          sharedInterests: {
            $size: { $setIntersection: ["$interests", current_user.interests] },
          },
          likeStatus: { $in: [current_user._id, "$likes.likedUserId"] },

          matchedAnswers: {
            $size: {
              $setIntersection: [
                "$recommendedUserAnswers.options",
                currentUserAnswer.map((i)=>i.options),
              ],
            },
          },
        },
      },
      {
        $match: {
          sharedInterests: { $gt: 0 },
          matchedAnswers : {$gte : 2}
        },
      },
      {
        $sort: {
          likeStatus: -1,
          matchedAnswers: -1,
          sharedInterests: -1,
          distance: 1,
        },
      },
    ]);
    if (!recommendedUsers) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }
    return response.okResponseWithData(
      res,
      msgs.okResponses.RECORDS_FOUND,
      recommendedUsers,
    );
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { getHomePageData, getRecommendations };
