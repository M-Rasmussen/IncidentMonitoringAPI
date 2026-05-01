function EventsPanel({ events }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>Events</h2>
          <p>Recent service events ingested by the monitoring API.</p>
        </div>
      </div>

      <div className="table">
        <div className="table-header events-header">
          <span>Service</span>
          <span>Level</span>
          <span>Message</span>
          <span>Created</span>
        </div>

        {events.length === 0 ? (
          <div className="empty">No events found.</div>
        ) : (
          events.map((event) => (
            <div className="table-row events-row" key={event.id}>
              <strong>{event.service}</strong>

              <span className={`badge level-${event.level}`}>
                {event.level}
              </span>

              <span>{event.message}</span>

              <span className="muted">
                {event.created_at || event.createdAt}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventsPanel;