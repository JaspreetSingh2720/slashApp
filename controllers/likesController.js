const { Likes } = require("../models/likes");
const Users = require("../models/users");
const response = require("../helpers/apiResponse");
const msgs = require("../helpers/messages");

const likesController = async (req, res) => {
  try {
    const {
      likeStatus,
      dislikeStatus,
      superLikeStatus,
      boostProfileStatus,
      likedUserId,
    } = req.body;
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }
    await Likes.create({
      userId: user._id,
      likeStatus: likeStatus,
      dislikeStatus: dislikeStatus,
      superLikeStatus: superLikeStatus,
      boostProfileStatus: boostProfileStatus,
      likedUserId: likedUserId,
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


const likedUserDataController = async (req, res) => {
  ////for $reduce
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }

    const likedUserData = await Likes.aggregate([
      {
        $match: { userId: user._id },
      },
      {
        $lookup: {
          from: "users",
          localField: "likedUserId",
          foreignField: "_id",
          as: "likedUsersData",
        },
      },
      { $unwind: "$likedUsersData" },
      {
        $addFields: {
          "likedUsersData.interestsbio": {
            $reduce: {
              input: "$likedUsersData.interests",
              initialValue: "",
              in: {
                $cond: {
                  if: { $eq: ["$$value", ""] },
                  then: { $concat: ["$$value", "$$this"] },
                  else: { $concat: ["$$value", ",", "$$this"] },
                },
              },
            },
          },
        },
      },
    ]);
    return response.okResponseWithData(
      res,
      msgs.okResponses.RECORDS_FOUND,
      likedUserData
    );
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
};

const peopleLikedUserContoller = async (req, res) => {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 1;
    let skip = (page-1)*limit;


    const peopleLikedUser = await Likes.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$likedUserId", { $toObjectId: req.user.id }],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $addFields: {
          result: { $arrayElemAt: ["$result", 0] },
        },
      },
      {
        $addFields: {
          "result.age": {
            $subtract: [
              { $year: new Date() },
              {
                $year: { $dateFromString: { dateString: "$result.birthdate" } },
              },
            ],
          },
        },
      },
      {
        $project: {
          "result.firstname": 1,
          "result.interests": 1,
          "result.age": 1,
        },
      },
    ]).skip(skip).limit(limit);
    return response.okResponseWithData(
      res,
      msgs.okResponses.RECORDS_FOUND,
      peopleLikedUser
    );
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
};
module.exports = {
  likesController,
  likedUserDataController,
  peopleLikedUserContoller,
};

// const likedUserDataController = async (req, res) => {                                     ////for $cond if then else
//   try {
//     const user = await Users.findById({ _id: req.user.id });
//     if (!user) {
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }

//     const likedUserData = await Likes.aggregate([
//       {
//         $match: { userId: user._id },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "likedUserId",
//           foreignField: "_id",
//           as: "likedUserData",
//         },
//       },
//       {
//         $project: {

//           userBtwAge : {
//             $cond : {
//               if : {ageRange : "22-25"},
//               then: '$likedUserData',
//               else: null
//             }
//           }
//         }
//       }
//     ]);
//     return response.okResponseWithData(res, msgs.okResponses.RECORDS_FOUND, likedUserData);
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// };

// const likedUserDataController = async (req, res) => {                                           //....for $count
//   try {
//     const user = await Users.findById({ _id: req.user.id });
//     if (!user) {
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }

//     const likedUserData = await Likes.aggregate([
//       {
//         $match: { userId: user._id },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "likedUserId",
//           foreignField: "_id",
//           as: "likedUserData",
//         },
//       },
//       {$count : "likedUsersCount"}
//     ]);
//     return response.okResponseWithData(res, msgs.okResponses.RECORDS_FOUND, likedUserData);
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// };

// const likedUserDataController = async (req, res) => {
//                                                                                           ////for $addFields  $map
//   try {
//     const user = await Users.findById({ _id: req.user.id });
//     if (!user) {
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }

//     const likedUserData = await Likes.aggregate([
//       {
//         $match: { userId: user._id },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "likedUserId",
//           foreignField: "_id",
//           as: "likedUserData",
//         },
//       },
//       {
//         $addFields: {
//           likedUsersData: {
//             $map: {
//               input: "$likedUserData",
//               as: "likedUser",
//               in: {
//                 name: "$$likedUser.firstname",
//                 ageRange: "$$likedUser.ageRange",
//               },
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           likedUsersData: 1,
//           tedstigField: 1,
//         },
//       },
//     ]);
//     return response.okResponseWithData(
//       res,
//       msgs.okResponses.RECORDS_FOUND,
//       likedUserData
//     );
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// };

// const likedUserDataController = async (req, res) => {                                                   ////for $push   $sum
//   try {
//     const user = await Users.findById({ _id: req.user.id });
//     if (!user) {
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }

//     const likedUserData = await Likes.aggregate([
//       {
//         $match: { userId: user._id },
//       },
//       {
//         $group: {
//           _id: "$likeStatus",
//           coins: {
//            $push: {
//             $cond: {
//               if: {_id : true},
//               then : 90,
//               else: null
//             }
//            }
//           },
//           noOfDocuments: {
//             $sum: 1
//           }
//         },
//       },
//     ]);
//     return response.okResponseWithData(
//       res,
//       msgs.okResponses.RECORDS_FOUND,
//       likedUserData
//     );
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// };

// const likedUserDataController = async (req, res) => {
//   ////for $let
//   try {
//     const user = await Users.findById({ _id: req.user.id });
//     if (!user) {
//       return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
//     }

//     const likedUserData = await Likes.aggregate([
//       {
//         $match: { userId: user._id },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "likedUserId",
//           foreignField: "_id",
//           as: "likedUsersData",
//         },
//       },
//       { $unwind: "$likedUsersData" },
//       {
//         $addFields: {
//           age: {
//             $subtract: [
//               { $year: new Date() },
//               {
//                 $year: {
//                   $dateFromString: {
//                     dateString: "$likedUsersData.birthdate",
//                     format: "%Y/%m/%d",
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       },
//       {
//         $match: {
//           $expr: {
//             $let: {
//               vars: {
//                 minAge: {
//                   $toInt: { $arrayElemAt: [{ $split: ["22-25", "-"] }, 0] },
//                 },
//                 maxAge: {
//                   $toInt: { $arrayElemAt: [{ $split: ["22-25", "-"] }, 1] },
//                 },
//               },
//               in: {
//                 $and: [
//                   { $gte: ["$age", "$$minAge"] },
//                   { $lte: ["$age", "$$maxAge"] },
//                 ],
//               },
//             },
//         },
//       },
//     ]);
//     return response.okResponseWithData(
//       res,
//       msgs.okResponses.RECORDS_FOUND,
//       likedUserData
//     );
//   } catch (error) {
//     return response.internalServerErrorResponse(
//       res,
//       error.message,
//       msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
//     );
//   }
// };
