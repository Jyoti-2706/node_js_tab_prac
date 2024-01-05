const {
  signJwt,
  encrypt,
  responseWithError,
  responseREST,
} = require("../config/commonFunction");
const httpStatus = require("../config/httpStatus");

const createToken = async (req, res) => {
  try {
    const expireAt =
      new Date().getTime() + parseInt(process.env.ACCESS_TOKEN_EXPIRY_MILISEC);

    let access_token;
    access_token = await signJwt(
      {
        payload: encrypt(process.env.SECURITY_VERIFICATION_STRING),
        expireAt,
      },
      process.env.ACCESS_JWT_SECRET,
      process.env.ACCESS_EXPIRES_IN_HOURS
    );

    return responseREST(res, httpStatus.SUCCESS, "Token created successfully", {
      access_token: access_token,
      access_token_exprires_at: new Date(expireAt),
    });
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = {
  createToken,
};
