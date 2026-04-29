const alerts = [];

async function createAlert(data) {
  const alert = {
    id: alerts.length + 1,
    service: data.service,
    message: data.message,
    status: "open",
    eventId: data.eventId || null,
    createdAt: new Date().toISOString(),
    resolvedAt: null
  };

  alerts.push(alert);

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