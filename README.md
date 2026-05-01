📊 Incident Monitoring System

A full-stack incident monitoring and alerting system inspired by modern observability platforms like Datadog.
This application ingests service events, detects anomalies, generates alerts, and provides a real-time dashboard for monitoring system health.

🚀 Overview

This project simulates a production-style monitoring system where:

Services emit events (info, warn, error, critical)
The backend processes and analyzes event streams
Alerts are generated based on severity and rate thresholds
Alerts are deduplicated and tracked over time
A React dashboard visualizes system state and allows interaction
🧠 Key Features
🔔 Intelligent Alerting Engine
Critical events immediately trigger alerts
Error-rate threshold detection (e.g., 5+ errors in 60s)
Deduplication using alert signatures
Open alert reuse (prevents alert spam)
Event count tracking and last-seen updates
🗄️ Persistent Data Layer
PostgreSQL-backed storage (Dockerized)
Events and alerts stored with relational integrity
Foreign key relationships between alerts and events
Indexed queries for performance optimization
📊 Observability Dashboard (React)
Real-time alerts and events view
Filter by service, level, status
Resolve alerts directly from UI
Metrics summary (open alerts, errors, critical events)
Responsive, dashboard-style UI (Datadog-inspired)
🔎 Query Capabilities
Filtering + pagination for:
Events
Alerts
Query parameters:
service
level
status
type
🏗️ Architecture
Frontend (React)
    ↓
Backend API (Node.js / Express)
    ↓
Alert Engine (business logic layer)
    ↓
PostgreSQL (Docker)
Backend Layers
controllers → services → alert engine → database
Controllers: HTTP layer
Services: DB interaction
Alert Engine: core logic (rules, dedup, thresholds)
DB: persistent storage
🛠️ Tech Stack
Backend
Node.js
Express
PostgreSQL (Docker)
node-postgres (pg)
Frontend
React (Vite)
Axios
CSS (custom responsive design)
Dev Tools
Docker
Nodemon
Git
📦 Installation
1. Clone the repo
git clone <your-repo-url>
cd IncidentMonitoringAPI
2. Start PostgreSQL (Docker)
docker run --name incident-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=incident_monitor \
  -p 5432:5432 \
  -d postgres
3. Configure environment

Create .env in root:

PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/incident_monitor
4. Start backend
npm install
npm run dev
5. Start frontend
cd client
npm install
npm run dev
🌐 Usage

Open:

http://localhost:5173
Actions:
Create error events
Create critical events
View alerts + events
Resolve alerts
Apply filters
📡 API Endpoints
Events
POST /api/events
GET  /api/events
Alerts
GET    /api/alerts
PATCH  /api/alerts/:id/resolve
🧪 Example Event Payload
{
  "service": "payment-api",
  "level": "error",
  "message": "payment timeout"
}
⚡ Performance Considerations
Indexed queries:
service
level
created_at
composite indexes for filtering
Efficient alert deduplication
Minimal redundant alert creation
🔮 Future Improvements
Authentication & user roles
Real-time updates (WebSockets)
Alert acknowledgment states
Service-level dashboards
Historical analytics & charts
Deployment (Render / Railway)
📸 Screenshots

(Add screenshots here for best impact)

🧠 What This Project Demonstrates
Backend system design
Event-driven architecture
Data modeling and relational integrity
API design with filtering and pagination
Full-stack integration
Real-world alerting patterns (deduplication, thresholds)
📬 Author

Built by [Your Name]

⭐ Notes

This project is designed to demonstrate backend and full-stack engineering skills in a realistic system design context.
