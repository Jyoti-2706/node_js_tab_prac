const { responseWithError, responseREST } = require("../config/commonFunction");
const httpStatus = require("../config/httpStatus");
const Permission = require("../models/permission");
const Role = require("../models/role");
const Tabs = require("../models/tabs");

const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;
    const createTab = await Role.create({
      roleName,
    });
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Your role created successfully",
      createTab
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const getRole = await Role.find();
    if (!getRole) {
      return responseREST(res, httpStatus.NOT_FOUND, "Role not found");
    }
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Role found successfully",
      getRole
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getPermissionByRoleId = async (req, res) => {
  try {
    const { id } = req.params;
    const getPermission = await Permission.find({
      roleId: id,
    });
    if (!getPermission) {
      return responseREST(res, httpStatus.NOT_FOUND, "Permission not found");
    }
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Permission found successfully",
      getPermission
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const createRolePermissionByTabId = async (req, res) => {
  try {
    const tabId = req.params.tabId;

    const tab = await Tabs.findById(tabId);

    if (!tab) {
      return responseREST(res, httpStatus.NOT_FOUND, "Tab not found");
    }

    const createPermission = await Permission.insertMany([
      ...req.body.map((p) => ({ ...p, tabId })),
    ]);

    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Your permission created successfully",
      createPermission
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

const getAllPermission = async (req, res) => {
  try {
    const permissionData = await Permission.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $lookup: {
          from: "tabs",
          localField: "tabId",
          foreignField: "_id",
          as: "tab",
        },
      },
      {
        $unwind: "$tab",
      },
      {
        $group: {
          _id: {
            roleId: "$role._id",
            roleName: "$role.roleName",
            tabId: "$tab._id",
            tabName: "$tab.tabName",
            displayName: "$tab.displayName",
          },
          permissions: {
            $push: {
              permissionId: "$_id",
              isView: "$isView",
              isEdit: "$isEdit",
              isDelete: "$isDelete",
              isAdd: "$isAdd",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            roleId: "$_id.roleId",
            roleName: "$_id.roleName",
          },
          tabs: {
            $push: {
              tabId: "$_id.tabId",
              tabName: "$_id.tabName",
              displayName: "$_id.displayName",
              permissions: "$permissions",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          roleName: "$_id.roleName",
          roleId: "$_id.roleId",
          tabs: "$tabs",
        },
      },
    ]);
    if (!permissionData) {
      return responseREST(res, httpStatus.NOT_FOUND, "Permission not found");
    }
    return responseREST(
      res,
      httpStatus.SUCCESS,
      "Permission found successfully",
      permissionData
    );
  } catch (error) {
    return responseWithError(req, res, error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getPermissionByRoleId,
  getAllPermission,
  createRolePermissionByTabId,
};
