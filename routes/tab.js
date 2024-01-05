const express = require("express");
const {
  getTabByIdFromDB,
  createTab,
  updateTab,
} = require("../bussineRule/tab");

const router = express.Router();

router.get("/:id", getTabByIdFromDB);
router.post("/", createTab);
router.put("/:id", updateTab);

module.exports = router;
