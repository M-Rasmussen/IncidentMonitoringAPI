function Metrics({ alerts, events }) {
  const openAlerts = alerts.filter((alert) => alert.status === "open").length;
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved").length;
  const criticalEvents = events.filter((event) => event.level === "critical").length;
  const errorEvents = events.filter((event) => event.level === "error").length;

  return (
    <section className="metrics">
      <div className="metric-card">
        <span>Open Alerts</span>
        <strong>{openAlerts}</strong>
        <small>Requires attention</small>
      </div>

      <div className="metric-card">
        <span>Resolved Alerts</span>
        <strong>{resolvedAlerts}</strong>
        <small>Closed incidents</small>
      </div>

      <div className="metric-card">
        <span>Critical Events</span>
        <strong>{criticalEvents}</strong>
        <small>Highest severity</small>
      </div>

      <div className="metric-card">
        <span>Error Events</span>
        <strong>{errorEvents}</strong>
        <small>Recent failures</small>
      </div>
    </section>
  );
}

export default Metrics;