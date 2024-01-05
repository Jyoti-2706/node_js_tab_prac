const { responseWithError } = require("../config/commonFunction");
const {
  createTab,
  getTabByIdFromDB,
  updateTab,
} = require("../bussineRule/tab");

const getTabById = (req, res) => {
  try {
    const validate = Joi.object({
      id: Joi.string().required(),
    });
    const validateSchema = validate.validate(req.params);
    if (validateSchema.error) {
      return responseInvalidArgs(res, validateSchema);
    }
    return getTabByIdFromDB(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const updateTabData = (req, res) => {
  try {
    const validate = Joi.object({
      tabName: Joi.string().required(),
      displayName: Joi.string().required(),
      isActive: Joi.boolean().optional(),
    });
    const validateSchema = validate.validate(req.body);
    if (validateSchema.error) {
      return responseInvalidArgs(res, validateSchema);
    }
    return updateTab(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const createTabData = (req, res) => {
  try {
    const validate = Joi.object({
      tabName: Joi.string().required(),
      displayName: Joi.string().required(),
    });
    const validateSchema = validate.validate(req.body);
    if (validateSchema.error) {
      return responseInvalidArgs(res, validateSchema);
    }
    return createTab(req, res);
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.export = { getTabById, createTabData, updateTabData };
