const db = require("../config/db");

async function findOpenAlert(service, type, signature) {
  const result = await db.query(
    `
    SELECT *
    FROM alerts
    WHERE service = $1
      AND type = $2
      AND signature = $3
      AND status = 'open'
    LIMIT 1
    `,
    [service, type, signature]
  );

  return result.rows[0] || null;
}

async function createAlert(data) {
  const type = data.type || "generic";
  const signature = data.signature || data.message;

  const existingAlert = await findOpenAlert(data.service, type, signature);

  if (existingAlert) {
    const result = await db.query(
      `
      UPDATE alerts
      SET
        event_count = event_count + 1,
        last_seen_at = CURRENT_TIMESTAMP,
        message = $1,
        event_id = $2
      WHERE id = $3
      RETURNING *
      `,
      [data.message, data.eventId || existingAlert.event_id, existingAlert.id]
    );

    return result.rows[0];
  }

  const result = await db.query(
    `
    INSERT INTO alerts (
      service,
      type,
      signature,
      message,
      status,
      event_id,
      event_count
    )
    VALUES ($1, $2, $3, $4, 'open', $5, 1)
    RETURNING *
    `,
    [
      data.service,
      type,
      signature,
      data.message,
      data.eventId || null
    ]
  );

  return result.rows[0];
}

async function getAlerts(filters = {}) {
  let query = `SELECT * FROM alerts WHERE 1=1`;
  const values = [];
  let index = 1;

  if (filters.service) {
    query += ` AND service = $${index++}`;
    values.push(filters.service);
  }

  if (filters.status) {
    query += ` AND status = $${index++}`;
    values.push(filters.status);
  }

  if (filters.type) {
    query += ` AND type = $${index++}`;
    values.push(filters.type);
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

async function resolveAlert(id) {
  const result = await db.query(
    `
    UPDATE alerts
    SET
      status = 'resolved',
      resolved_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0] || null;
}

async function getAlertById(id) {
  const result = await db.query(
    `
    SELECT *
    FROM alerts
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

async function updateAiSummary(alertId, aiData) {
  const result = await db.query(
    `
    UPDATE alerts
    SET
      ai_summary = $1,
      ai_possible_cause = $2,
      ai_suggested_steps = $3,
      ai_generated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
    `,
    [
      aiData.summary,
      aiData.possibleCause,
      aiData.suggestedSteps,
      alertId,
    ]
  );

  return result.rows[0] || null;
}

module.exports = {
  createAlert,
  getAlerts,
  resolveAlert,
  getAlertById,
  updateAiSummary
};
