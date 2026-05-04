function DemoCard() {
  return (
    <section className="demo-card">
      <div>
        <h3>Demo Mode</h3>
        <p>
          Use the controls above to simulate service events and trigger alerts.
          Critical events create alerts immediately, while error alerts trigger
          after 5 errors within 60 seconds.
        </p>
      </div>

      <div className="demo-steps">
        <span>1. Create Error</span>
        <span>2. Create Critical</span>
        <span>3. Resolve Alert</span>
      </div>
    </section>
  );
}

export default DemoCard;