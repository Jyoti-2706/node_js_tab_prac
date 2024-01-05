const httpStatus = require("./httpStatus");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const ENCRYPTION_KEY =
  "80790e800f266be764494be753316db53989b9dc00432bb18c43295f83899861";
const IV_LENGTH = 16;

const encryptionKeyBuffer = Buffer.from(ENCRYPTION_KEY, "hex");

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKeyBuffer, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(text) {
  const [iv, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    encryptionKeyBuffer,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

const responseWithError = (_, res, error = null) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode).json({
    ...httpStatus.INTERNAL_SERVER_ERROR,
    message: "Internal server Error",
    data: null,
    error:
      typeof error === "object" && error != null
        ? [error.error || error.message]
        : [error],
  });
};

const responseREST = (
  res,
  resHttpStatus,
  message,
  data = null,
  error = null
) => {
  return res.status(resHttpStatus.statusCode).json({
    ...resHttpStatus,
    message: message,
    data: data,
    error: error,
  });
};
const responseInvalidArgs = (res, validate) => {
  return res.status(httpStatus.INVALID_ARGUMENTS.statusCode).json({
    ...httpStatus.INVALID_ARGUMENTS,
    message: validate.error.details.map((i) => i.message).join(","),
    data: null,
    error: null,
  });
};
const signJwt = async (data, secret, expireAt) => {
  let token;
  token = jwt.sign(data, secret, {
    expiresIn: expireAt,
  });
  return token;
};
const verifyJwt = async (token, secret) => {
  try {
    const verifyJwtData = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return { status: false, message: err, data: null };
      } else if (
        decrypt(decoded.payload) !== process.env.SECURITY_VERIFICATION_STRING
      ) {
        return { status: false, message: "Invalid Token", data: null };
      } else {
        return { status: true, data: decoded, message: "Token in Valid" };
      }
    });

    if (!verifyJwtData.status) {
      if (
        verifyJwtData.message.toString().split(":")[1].trim() == "jwt expired"
      ) {
        return {
          ...httpStatus.UNAUTHORIZED,
          message: "You are unauthorized for this request",
          data: null,
          error: ["Token Exprired"],
        };
      } else {
        return {
          ...httpStatus.UNAUTHORIZED,
          message: "You are unauthorized for this request",
          data: null,
          error: ["Invalid Token"],
        };
      }
    }

    return {
      ...httpStatus.SUCCESS,
      message: "success",
      data: verifyJwtData.data,
      error: [],
    };
  } catch (error) {
    return {
      ...httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      data: null,
      error: error.message,
    };
  }
};

module.exports = {
  responseREST,
  responseWithError,
  signJwt,
  verifyJwt,
  responseInvalidArgs,
  encrypt,
  decrypt,
};
