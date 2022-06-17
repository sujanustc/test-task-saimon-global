const express = require("express");
const router = express.Router();

router.use("/api", require("./api"));

router.get("/", (req, res, next) => {
    res.json({ status: true, message: "Test Task For Saimon Global!" });
});

module.exports = router;