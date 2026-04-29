const eventsService = require("../services/events.service");

async function createEvent(req, res, next) {
  try {
    const event = await eventsService.createEvent(req.body);

    res.status(201).json(event);
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