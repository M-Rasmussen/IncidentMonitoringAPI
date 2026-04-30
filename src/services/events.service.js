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

async function getEvents(filters = {}) {
  let result = [...events];

  if (filters.service) {
    result = result.filter(event => event.service === filters.service);
  }

  if (filters.level) {
    result = result.filter(event => event.level === filters.level);
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: result.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: result.length,
      totalPages: Math.ceil(result.length / limit)
    }
  };
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