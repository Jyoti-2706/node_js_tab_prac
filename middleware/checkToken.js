const {
  responseWithError,
  responseREST,
  verifyJwt,
} = require("../config/commonFunction");
const httpStatus = require("../config/httpStatus");

const verifyToken = async (req, res, next) => {
  try {
    let access_token;
    access_token = req.headers.authorization.replace("Bearer ", "");

    if (
      !access_token ||
      access_token == "undefined" ||
      access_token == undefined
    ) {
      return responseREST(
        res,
        httpStatus.UNAUTHORIZED,
        "You are unauthorized for this request..",
        null,
        null
      );
    }

    if (access_token) {
      const verifyJwtData = await verifyJwt(
        access_token,
        process.env.ACCESS_JWT_SECRET
      );
      if (!verifyJwtData.status) {
        return responseREST(
          res,
          httpStatus.UNAUTHORIZED,
          verifyJwtData.message,
          null,
          null
        );
      }
      next();
    }
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = {
  verifyToken,
};
