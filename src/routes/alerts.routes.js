const express = require("express");

const alertsController = require("../controllers/alerts.controller");
const { requireAdmin } = require("../middleware/requireAdmin");

const router = express.Router();

router.get("/", alertsController.getAlerts);
router.patch("/:id/resolve", alertsController.resolveAlert);
router.post("/:id/ai-summary", requireAdmin, alertsController.generateAiSummary);

module.exports = router;