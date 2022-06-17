const express = require('express')
const router = express.Router()

const controller = require('../../controllers/planController')

/**
 * /api/plan
 * http://localhost:9999/api/plan
 */

router.get("/", (req, res, next) => {
    res.json({ status: true, message: "Plan index router" });
});

router.get("/get-list", controller.getList);
router.post("/add-plan", controller.addPlan);
router.post("/update-plan", controller.updatePlan);
router.delete("/delete-plan", controller.delete)
router.get("/get-one", controller.getPlanById)


module.exports = router