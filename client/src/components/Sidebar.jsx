function Sidebar({ activeView, setActiveView }) {
  const links = ["Dashboard", "Alerts", "Events", "Services"];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">IM</div>
        <span>Incident Monitor</span>
      </div>

      <nav>
        {links.map((link) => (
          <button
            key={link}
            className={`nav-link ${activeView === link ? "active" : ""}`}
            onClick={() => setActiveView(link)}
          >
            {link}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;