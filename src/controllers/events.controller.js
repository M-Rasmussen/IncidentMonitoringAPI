const eventsService = require("../services/events.service");
const alertEngine = require("../services/alertEngine.service");

async function createEvent(req, res, next) {
  try {
    const event = await eventsService.createEvent(req.body);
    const alert = await alertEngine.evaluateEvent(event);

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
    const events = await eventsService.getEvents(req.query);

    res.json(events);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createEvent,
  getEvents
};