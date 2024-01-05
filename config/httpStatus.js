module.exports = {
    SUCCESS: {
        statusCode: 200,
        status: true,
    },
    NOT_SUCCESS: {
        statusCode: 422,
        status: false,
    },
    UNAUTHORIZED: {
        status: false,
        statusCode: 401
    },
    INTERNAL_SERVER_ERROR: {
        status: false,
        statusCode: 500
    },
    INVALID_ARGUMENTS: {
        status: false,
        statusCode: 422
    },
    ALREADY_EXIST: {
        status: false,
        statusCode: 409
    },
    NOT_FOUND: {
        status: false,
        statusCode: 404
    }
};
