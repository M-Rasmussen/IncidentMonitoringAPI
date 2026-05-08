const express = require("express");

const alertsController = require("../controllers/alerts.controller");
const { aiRateLimit } = require("../middleware/aiRateLimit");

const router = express.Router();

router.get("/", alertsController.getAlerts);
router.patch("/:id/resolve", alertsController.resolveAlert);
router.post("/:id/ai-summary", aiRateLimit, alertsController.generateAiSummary);
module.exports = router;