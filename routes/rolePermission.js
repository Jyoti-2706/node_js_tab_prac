const express = require("express");
const {
  createRoleData,
  getPermissionsByRoleIdData,
  getAllPermissionData,
  createRolePermissionDataByTabId,
} = require("../controllers/rolePermission");

const router = express.Router();

router.get("/", getAllPermissionData);
router.post("/", createRoleData);
router.get("/:roleId", getPermissionsByRoleIdData);
router.post("/:tabId", createRolePermissionDataByTabId);

module.exports = router;
