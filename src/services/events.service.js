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

async function getRecentErrorsByService(service, timeWindowMs) {
  const now = Date.now();

  return events.filter(event => {
    const eventTime = new Date(event.createdAt).getTime();

    return (
      event.service === service &&
      event.level === "error" &&
      now - eventTime <= timeWindowMs
    );
  });
}

module.exports = {
  createEvent,
  getEvents,
  getRecentErrorsByService
};