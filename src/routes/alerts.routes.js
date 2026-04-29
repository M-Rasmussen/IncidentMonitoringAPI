const express = require("express");

const alertsController = require("../controllers/alerts.controller");

const router = express.Router();

router.get("/", alertsController.getAlerts);
router.patch("/:id/resolve", alertsController.resolveAlert);

module.exports = router;