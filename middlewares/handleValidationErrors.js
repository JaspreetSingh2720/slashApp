const { validationResult } = require('express-validator');
const response = require('../helpers/apiResponse'); 

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.badRequestResponse(res, errors.array());
  }
  next();
};

module.exports = handleValidationErrors;