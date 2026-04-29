const alerts = [];
const lastAlertByKey = {};

function findOpenAlert(service, type, signature) {
  return alerts.find(
    alert =>
      alert.service === service &&
      alert.type === type &&
      alert.signature === signature &&
      alert.status === "open"
  );
}

async function createAlert(data) {
  const type = data.type || "generic";
  const signature = data.signature || data.message;

  const existingAlert = findOpenAlert(data.service, type, signature);

  if (existingAlert) {
    existingAlert.lastSeenAt = new Date().toISOString();
    existingAlert.eventCount += 1;
    existingAlert.message = data.message;
    existingAlert.eventId = data.eventId || existingAlert.eventId;
    return existingAlert;
  }

  const now = Date.now();
  const cooldownMs = 60 * 1000;

  const dedupeKey = `${data.service}:${type}:${signature}`;
  const lastAlertTime = lastAlertByKey[dedupeKey];

  if (lastAlertTime && now - lastAlertTime < cooldownMs) {
    return null;
  }

  const alert = {
    id: alerts.length + 1,
    service: data.service,
    type,
    signature,
    message: data.message,
    status: "open",
    eventId: data.eventId || null,
    eventCount: 1,
    createdAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString(),
    resolvedAt: null
  };

  alerts.push(alert);
  lastAlertByKey[dedupeKey] = now;

  return alert;
}

async function getAlerts() {
  return alerts;
}

async function resolveAlert(id) {
  const alert = alerts.find(alert => alert.id === Number(id));

  if (!alert) {
    return null;
  }

  alert.status = "resolved";
  alert.resolvedAt = new Date().toISOString();

  return alert;
}

module.exports = {
  createAlert,
  getAlerts,
  resolveAlert
};