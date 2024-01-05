const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
