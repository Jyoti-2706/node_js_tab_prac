const { responseWithError, responseREST } = require("../config/commonFunction");
const httpStatus = require("../config/httpStatus");
const Permission = require("../models/permission");
const Role = require("../models/role");
const Tabs = require("../models/tabs");

const getTabByIdFromDB = async (req, res) => {
  try {
    const { id } = req.params;
    const getTab = await Tabs.findById({
      tabId: id,
    });

    if (!getTab) {
      return responseREST(res, httpStatus.NOT_FOUND, "Tab not found");
    }
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Tab found successfully",
      getTab
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const createTab = async (req, res) => {
  try {
    const { tabName, displayName } = req.body;
    const createTab = await Tabs.create({
      tabName,
      displayName,
    });

    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Your tab created successfully",
      createTab
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const updateTab = async (req, res) => {
  try {
    const { tabName, displayName, isActive } = req.body;
    const tabId = req.params.id;
    let tabData = await Tabs.findById(req.params.id);
    if (!tabData) {
      return responseREST(res, httpStatus.NOT_FOUND, "Tab not found");
    }

    const updateTab = await Tabs.findByIdAndUpdate(
      tabId,
      {
        tabName,
        displayName,
        isEdit: true,
        isActive,
      },
      { new: true }
    );
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Your tab updated successfully",
      updateTab
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = { getTabByIdFromDB, createTab, updateTab };
