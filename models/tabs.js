const mongoose = require("mongoose");

const tabsSchema = new mongoose.Schema({
  tabName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  isAdd: {
    type: Boolean,
    required: true,
    default: true,
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
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Tabs = mongoose.model("tabs", tabsSchema);
module.exports = Tabs;
