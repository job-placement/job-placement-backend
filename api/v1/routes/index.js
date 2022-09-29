const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/jobs", require("./job"));
router.use("/skills", require("./skill"));

module.exports = router;
