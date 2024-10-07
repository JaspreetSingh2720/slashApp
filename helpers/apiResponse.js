exports.okResponse = (res, msg, token) => {
  return res.status(200).json({
    status: 200,
    msg: msg,
    token: token
  });
};

exports.okResponseWithData = (res, msg, data) => {
  return res.status(200).json({
    status: 200,
    msg: msg,
    data: data
  });
};


exports.createdSuccessfullyResponse = (res, msg) => {
  return res.status(201).json({
    status: 201,
    msg: msg,
  });
};

exports.badRequestResponse = (res, msg) => {
  return res.status(400).json({
    status: 400,
    msg: msg,
  });
};

exports.unauthorizedResponse = (res, msg) => {
  return res.status(401).json({
    status: 401,
    msg: msg,
  });
};

exports.notFoundResponse = (res, msg) => {
  return res.status(404).json({
    status: 404,
    msg: msg,
  });
};

exports.unauthorizedResponse = (res, msg) => {
  return res.status(401).json({
    status: 401,
    msg: msg,
  });
};

exports.internalServerErrorResponse = (res, error, msg) => {
  return res.status(500).json({
    status: 500,
    msg: msg,
    error: error,
  });
};

exports.conflictResponse= (res, msg)=> {
  return res.status(409).json({
    status: 409,
    msg: msg
  })
}