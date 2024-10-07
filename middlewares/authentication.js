const JWT = require("jsonwebtoken");
const response = require("../helpers/apiResponse");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return response.notFoundResponse("Token not found");
  }
  JWT.verify(token, process.env.SECRET_KEY, async (err, decodedPayload) => {
    if (err) {
      return response.unauthorizedResponse(res, "Un-Authorize User");
    }

    req.user = decodedPayload;
    console.log("tttttttttttttooooooooooooooooken", req.user)
    next();
  });
}
module.exports = authenticateToken;
