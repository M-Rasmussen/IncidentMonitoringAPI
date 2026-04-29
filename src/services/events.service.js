const events = [];

async function createEvent(data) {
  const event = {
    id: events.length + 1,
    service: data.service,
    level: data.level,
    message: data.message,
    metadata: data.metadata || {},
    createdAt: new Date().toISOString()
  };

  events.push(event);

  return event;
}

async function getEvents() {
  return events;
}

module.exports = {
  createEvent,
  getEvents
};