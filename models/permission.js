const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "role",
  },
  tabId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tabs",
  },
  isView: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdd: {
    type: Boolean,
    required: true,
    default: false,
  },
  isEdit: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDelete: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Permission = mongoose.model("permission", permissionSchema);
module.exports = Permission;
