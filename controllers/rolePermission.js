const {
  responseWithError,
  responseInvalidArgs,
} = require("../config/commonFunction");
const {
  createRole,
  getPermissionByRoleId,
  getAllRoles,
  getAllPermission,
  createRolePermissionByTabId,
} = require("../bussineRule/rolePermission");
const Joi = require("joi");

const createRoleData = (req, res) => {
  try {
    const validate = Joi.object({
      roleName: Joi.string().required(),
    });
    const validateSchema = validate.validate(req.body);
    if (validateSchema.error) {
      return responseInvalidArgs(res, validateSchema);
    }
    return createRole(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getAllRolesData = (req, res) => {
  try {
    return getAllRoles(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getPermissionsByRoleIdData = (req, res) => {
  try {
    const validate = Joi.object({
      roleId: Joi.string().required(),
    });
    const validateSchema = validate.validate(req.params);
    if (validateSchema.error) {
      return responseInvalidArgs(res, validateSchema);
    }
    return getPermissionByRoleId(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const createRolePermissionDataByTabId = (req, res) => {
  try {
    return createRolePermissionByTabId(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getAllPermissionData = (req, res) => {
  try {
    return getAllPermission(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = {
  createRoleData,
  getAllRolesData,
  getPermissionsByRoleIdData,
  getAllPermissionData,
  createRolePermissionDataByTabId,
};
