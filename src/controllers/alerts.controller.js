const alertsService = require("../services/alerts.service");
const eventsService = require("../services/events.service");

const { generateAlertSummary } = require("../services/aiSummaryService");

async function getAlerts(req, res, next) {
  try {
    const alerts = await alertsService.getAlerts(req.query);
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
async function generateAiSummary(req, res, next) {
  try {
    const alert = await alertsService.getAlertById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        error: "Alert not found",
      });
    }

    if (alert.ai_generated_at) {
      return res.json(alert);
    }

    const recentEvents = await eventsService.getRecentEventsByService(
      alert.service,
      10
    );

    const aiResult = await generateAlertSummary({
      alert,
      events: recentEvents,
    });

    if (!aiResult) {
      return res.status(400).json({
        error: "AI summaries disabled",
      });
    }

    const updatedAlert = await alertsService.updateAiSummary(alert.id, {
      summary: aiResult.summary,
      possibleCause: aiResult.possibleCause,
      suggestedSteps: aiResult.suggestedSteps.join("\n"),
    });

    res.json(updatedAlert);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAlerts,
  resolveAlert,
  generateAiSummary,
};