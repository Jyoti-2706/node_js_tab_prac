const express = require("express");
const { getToken } = require("../controllers/token");

const router = express.Router();

router.get("/", getToken);

module.exports = router;
