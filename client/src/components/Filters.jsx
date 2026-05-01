function Filters({
  serviceFilter,
  setServiceFilter,
  statusFilter,
  setStatusFilter,
  levelFilter,
  setLevelFilter,
  onApply
}) {
  return (
    <section className="filters">
      <input
        placeholder="Service: payment-api"
        value={serviceFilter}
        onChange={(e) => setServiceFilter(e.target.value)}
      />

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All alert statuses</option>
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
      </select>

      <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
        <option value="">All event levels</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
        <option value="critical">Critical</option>
      </select>

      <button onClick={onApply}>Apply Filters</button>
    </section>
  );
}

export default Filters;