const response = require("../helpers/apiResponse");
const msgs = require("../helpers/messages");
const Messages = require("../models/messages");
const Users = require("../models/users");

const createMessagesController = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }

    await Messages.create({
      senderId: req.user.id,
      receiverId: receiverId,
      message: message,
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

const getMessagesController = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
    }
    const getMessages = await Messages.find({
      senderId: req.user.id,
      receiverId: receiverId,
    });
    if (!getMessages) {
      return response.notFoundResponse(
        res,
        msgs.notFoundResponse.NO_RECORDS_FOUND
      );
    }
    return response.okResponseWithData(res, msgs.okResponses.RECORDS_FOUND, getMessages);
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { createMessagesController, getMessagesController };
