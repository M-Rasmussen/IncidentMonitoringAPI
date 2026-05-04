import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Metrics from "./components/Metrics";
import Filters from "./components/Filters";
import AlertsPanel from "./components/AlertsPanel";
import EventsPanel from "./components/EventsPanel";
import DemoCard from "./components/DemoCard";

import {
  getAlerts,
  getEvents,
  resolveAlert,
  createEvent
} from "./services/api";

function App() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [alerts, setAlerts] = useState([]);
  const [events, setEvents] = useState([]);
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  async function fetchAlerts() {
    const params = {};

    if (serviceFilter) params.service = serviceFilter;
    if (statusFilter) params.status = statusFilter;

    const data = await getAlerts(params);
    setAlerts(data);
  }

  async function fetchEvents() {
    const params = {};

    if (serviceFilter) params.service = serviceFilter;
    if (levelFilter) params.level = levelFilter;

    const data = await getEvents(params);
    setEvents(data);
  }

  async function refreshDashboard() {
    await Promise.all([fetchAlerts(), fetchEvents()]);
  }

  async function handleResolveAlert(id) {
    await resolveAlert(id);
    await fetchAlerts();
  }

  async function createTestCriticalEvent() {
    await createEvent({
      service: "payment-api",
      level: "critical",
      message: "database connection failed"
    });

    await refreshDashboard();
  }

  async function createTestErrorEvent() {
    await createEvent({
      service: "payment-api",
      level: "error",
      message: "payment timeout"
    });

    await refreshDashboard();
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  const showDashboard = activeView === "Dashboard";
  const showAlerts = activeView === "Alerts";
  const showEvents = activeView === "Events";
  const showServices = activeView === "Services";

  return (
    <main className="page">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <section className="content">
        <Topbar
          onRefresh={refreshDashboard}
          onCreateError={createTestErrorEvent}
          onCreateCritical={createTestCriticalEvent}
        />

        <DemoCard />

        {(showDashboard || showServices) && (
          <Metrics alerts={alerts} events={events} />
        )}

        <Filters
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          onApply={refreshDashboard}
        />

        {showServices && (
          <div className="panel service-panel">
            <div className="panel-header">
              <h2>Services</h2>
              <p>Service-level health summary derived from current events and alerts.</p>
            </div>

            <div className="service-summary">
              <strong>payment-api</strong>
              <span>{alerts.filter((alert) => alert.service === "payment-api" && alert.status === "open").length} open alerts</span>
              <span>{events.filter((event) => event.service === "payment-api").length} events</span>
            </div>
          </div>
        )}

        {showDashboard && (
          <section className="grid">
            <AlertsPanel alerts={alerts} onResolveAlert={handleResolveAlert} />
            <EventsPanel events={events} />
          </section>
        )}

        {showAlerts && (
          <AlertsPanel alerts={alerts} onResolveAlert={handleResolveAlert} />
        )}

        {showEvents && (
          <EventsPanel events={events} />
        )}
      </section>
    </main>
  );
}

export default App;