const Users = require("../models/users");
const response = require("../helpers/apiResponse");

async function  uploadDocumentController(req, res) {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, "No User found");
    }
    const { documentType, screenNo } = req.body;
    console.log(req.files);
    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          document: {
            documentType: documentType,
            frontSide: req.files[0].filename,
            backSide: req.files[1].filename,
          },
          screenNo: screenNo
        },
      },
      { new: true }
    );

    return response.okResponse(res, "Images uploaded successfully");
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in uploadDocuments Api"
    );
  }
}

async function uploadPhotosController(req, res) {
  try {
    const user = await Users.findById({ _id: req.user.id });
    if (!user) {
      return response.notFoundResponse(res, "No User found");
    }
    const{screenNo} = req.body
    // console.log(req.files);
    if (req.files.length > 9) {
      return response.badRequestResponse(res, "Please provide upto 9 images");
    }
    const photos = req.files ? req.files.map((file) => file.filename) : [];
    await Users.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          photos: photos,
          screenNo: screenNo
        },
      },
      { new: true }
    );

    return response.okResponse(res, "Images uploaded successfully");
  } catch (error) {
    return response.internalServerErrorResponse(
      res,
      error.message,
      "Error in uploadPhotos Api"
    );
  }
}

module.exports = { uploadDocumentController, uploadPhotosController };
