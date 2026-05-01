function Topbar({ onRefresh, onCreateError, onCreateCritical }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Observability</p>
        <h1>Incident Monitoring Dashboard</h1>
      </div>

      <div className="actions">
        <button className="secondary" onClick={onRefresh}>
          Refresh
        </button>
        <button onClick={onCreateError}>Create Error</button>
        <button className="danger" onClick={onCreateCritical}>
          Create Critical
        </button>
      </div>
    </header>
  );
}

export default Topbar;