const alerts = [];
const lastAlertByKey = {};

async function createAlert(data) {
 const now = Date.now();
  const cooldownMs = 60 * 1000; // 60 seconds

  const dedupeKey = `${data.service}:${data.type || "generic"}`;
  const lastAlertTime = lastAlertByKey[dedupeKey];

  if (lastAlertTime && now - lastAlertTime < cooldownMs) {
    return null;
  }

  const alert = {
    id: alerts.length + 1,
    service: data.service,
    type: data.type || "generic",
    message: data.message,
    status: "open",
    eventId: data.eventId || null,
    createdAt: new Date().toISOString(),
    resolvedAt: null
  };

  alerts.push(alert);
  lastAlertByKey[dedupeKey] = now;
  console.log(alerts);
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