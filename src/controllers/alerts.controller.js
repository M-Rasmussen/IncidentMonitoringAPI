const alertsService = require("../services/alerts.service");

async function getAlerts(req, res, next) {
  try {
    const alerts = await alertsService.getAlerts();

    res.json(alerts);
  } catch (error) {
    next(error);
  }
}

async function resolveAlert(req, res, next) {
  try {
    const alert = await alertsService.resolveAlert(req.params.id);

    if (!alert) {
      return res.status(404).json({
        error: "Alert not found"
      });
    }

    res.json(alert);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlerts,
  resolveAlert
};