const db = require("../config/db");

async function createEvent(data) {
  const result = await db.query(
    `
    INSERT INTO events (service, level, message, metadata)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      data.service,
      data.level,
      data.message,
      data.metadata || {}
    ]
  );

  return result.rows[0];
}
async function getEvents(filters = {}) {
  let query = `SELECT * FROM events WHERE 1=1`;
  const values = [];
  let index = 1;

  if (filters.service) {
    query += ` AND service = $${index++}`;
    values.push(filters.service);
  }

  if (filters.level) {
    query += ` AND level = $${index++}`;
    values.push(filters.level);
  }

  query += ` ORDER BY created_at DESC`;

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const offset = (page - 1) * limit;

  query += ` LIMIT $${index++} OFFSET $${index++}`;
  values.push(limit, offset);

  const result = await db.query(query, values);

  return {
    data: result.rows,
    pagination: {
      page,
      limit
    }
  };
}
async function getRecentErrorsByService(service, timeWindowMs) {
  const result = await db.query(
    `
    SELECT *
    FROM events
    WHERE service = $1
      AND level = 'error'
      AND created_at >= NOW() - INTERVAL '60 seconds'
    `,
    [service]
  );

  return result.rows;
}
async function getRecentEventsByService(service, limit = 10) {
  const result = await db.query(
    `
    SELECT *
    FROM events
    WHERE service = $1
    ORDER BY created_at DESC
    LIMIT $2
    `,
    [service, limit]
  );

  return result.rows;
}

module.exports = {
  createEvent,
  getEvents,
  getRecentErrorsByService,
  getRecentEventsByService
};
