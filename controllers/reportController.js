const response = require("../helpers/apiResponse");
const msgs = require("../helpers/messages");
const Users = require("../models/users");
const Report = require("../models/report");
const reportUserController = async(req, res)=>{
    try {
        const {reportedUserId, reportReason, description} = req.body;
        const user = await Users.findById({_id : req.user.id})
        if(!user){
            return response.notFoundResponse(res, msgs.notFoundResponse.NOT_FOUND);
        }
        await Report.create({userId: req.user.id,
            reportedUserId: reportedUserId,
            reportReason: reportReason,
            description: description
        })
        return response.okResponse(res, msgs.okResponses.CREATED_SUCCESSFULLY);
    } catch (error) {
        return response.internalServerErrorResponse(res, error.message, msgs.internalServerErrorResponses.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {reportUserController};