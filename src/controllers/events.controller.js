const eventsService = require("../services/events.service");
const alertsService = require("../services/alerts.service");

async function createEvent(req, res, next) {
  try {
    const event = await eventsService.createEvent(req.body);

    let alert = null;

    if (event.level === "critical") {
      alert = await alertsService.createAlert({
        service: event.service,
        message: `Critical event detected: ${event.message}`,
        eventId: event.id
      });
    }

    res.status(201).json({
      event,
      alert
    });
  } catch (error) {
    next(error);
  }
}

async function getEvents(req, res, next) {
  try {
    const events = await eventsService.getEvents();

    res.json(events);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
  getEvents
};