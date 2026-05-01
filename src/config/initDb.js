const db = require("./db");

async function initDb() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      service VARCHAR(255) NOT NULL,
      level VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS alerts (
      id SERIAL PRIMARY KEY,
      service VARCHAR(255) NOT NULL,
      type VARCHAR(100) NOT NULL,
      signature TEXT NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'open',
      event_id INTEGER,
      event_count INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      resolved_at TIMESTAMP
    );
  `);
  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_events_service
    ON events(service);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_events_level
    ON events(level);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_events_created_at
    ON events(created_at);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_events_service_level_created_at
    ON events(service, level, created_at DESC);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_alerts_service
    ON alerts(service);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_alerts_status
    ON alerts(status);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_alerts_type
    ON alerts(type);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_alerts_service_type_status
    ON alerts(service, type, status);
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_alerts_signature
    ON alerts(signature);
  `);

  console.log("Database initialized");
}

module.exports = initDb;