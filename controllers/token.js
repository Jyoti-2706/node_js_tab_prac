const { createToken } = require("../bussineRule/authFunctions");

const getToken = (req, res) => {
  try {
    return createToken(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = { getToken };
