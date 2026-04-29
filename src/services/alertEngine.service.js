const eventsService = require("./events.service");
const alertsService = require("./alerts.service");

async function evaluateEvent(event) {
  if (event.level === "critical") {


    return alertsService.createAlert({
        service: event.service,
        type: "critical_event",
        signature: event.message,
        message: `Critical event detected: ${event.message}`,
        eventId: event.id
    });
  }

  if (event.level === "error") {
    const recentErrors = await eventsService.getRecentErrorsByService(
      event.service,
      60 * 1000
    );


    
    if (recentErrors.length >= 5) {
      return alertsService.createAlert({
        service: event.service,
        type: "error_rate",
        signature: `${event.service}:error_rate:60s`,
        message: `High error rate detected: ${recentErrors.length} errors in 60 seconds`,
        eventId: event.id
      });
    }
  }

  return null;
}

module.exports = {
  evaluateEvent
};