const router = require("express").Router();
const { verifyToken } = require("../middleware/checkToken");

router.use("/token", require("./token"));

router.use(verifyToken);
router.use("/tab", require("./tab"));
router.use("/role_permission", require("./rolePermission"));

module.exports = router;
