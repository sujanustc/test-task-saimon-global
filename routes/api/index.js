const express = require('express')
const router = express.Router()

router.use("/package", require("./package"))
router.use("/plan", require("./plan"))

module.exports = router