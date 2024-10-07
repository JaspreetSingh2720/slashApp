
const okResponses = {
    CREATED_SUCCESSFULLY: "Records Created Successfully",
    NEARBY_USERS_FOUND : "Nearby Users Found Successfully",
    RECORDS_FOUND : "All Records Found Successfully"
}

const internalServerErrorResponses = {
    INTERNAL_SERVER_ERROR : "Error In The Api"
}

const notFoundResponse = {
    NOT_FOUND : "No User Found",
    NO_RECORDS_FOUND : "No Records Found" 
}

const conflictResponses = {
    DUPLICATE_ENTRY: 'This entry already exists.',
  };

module.exports = {
    okResponses,
    internalServerErrorResponses,
    notFoundResponse,
    conflictResponses
}