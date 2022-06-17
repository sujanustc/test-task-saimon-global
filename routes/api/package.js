const express = require('express')
const router = express.Router()

const controller = require('../../controllers/packageController')

/**
 * /api/package
 * http://localhost:9999/api/package
 */

router.get("/", (req, res, next) => {
    res.json({ status: true, message: "Package index router" });
});

router.get("/get-list", controller.getList);
router.post("/add-package", controller.addPackage);
router.post("/update-package", controller.updatePackage);
router.delete("/delete-package", controller.delete)
router.get("/get-one", controller.getPackageById)
router.get("/search", controller.getListBySearch )


module.exports = router