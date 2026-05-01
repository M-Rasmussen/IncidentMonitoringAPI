# 📊 Incident Monitoring System

A full-stack incident monitoring and alerting system inspired by modern observability platforms like Datadog.  
This application ingests service events, detects anomalies, generates alerts, and provides a real-time dashboard for monitoring system health.

---

## 🚀 Live Demo

👉 **Frontend:** https://incident-monitor-dashboard.onrender.com  
👉 **Backend API:** https://incident-monitor-api.onrender.com

> ⚠️ Note: The app may take a few seconds to load if hosted on a free tier.

---

## 📸 Dashboard Preview
<img width="1130" height="909" alt="image" src="https://github.com/user-attachments/assets/2aaa5e55-453d-4303-b97a-0c0eaff78b1a" />

---

## 🚀 Overview

This project simulates a production-style monitoring system where:

- Services emit events (`info`, `warn`, `error`, `critical`)
- The backend processes and analyzes event streams
- Alerts are generated based on severity and rate thresholds
- Alerts are deduplicated and tracked over time
- A React dashboard visualizes system state and allows interaction

---

## 🧠 Key Features

### 🔔 Intelligent Alerting Engine
- Critical events trigger immediate alerts
- Error-rate threshold detection (e.g. **5+ errors in 60s**)
- Alert deduplication using signatures
- Open alert reuse to prevent alert flooding
- Event count tracking and last-seen updates

### 🗄️ Persistent Data Layer
- PostgreSQL-backed storage (Dockerized)
- Relational integrity with foreign key constraints
- Indexed queries for performance optimization

### 📊 Observability Dashboard (React)
- Real-time alerts and events view
- Filtering by service, level, status
- Resolve alerts directly from UI
- Metrics summary (open alerts, error volume, critical events)
- Fully responsive, dashboard-style UI

### 🔎 Query Capabilities
Supports filtering and pagination:

- `/api/events`
- `/api/alerts`

Query parameters:
- `service`
- `level`
- `status`
- `type`

---

## 🏗️ Architecture

Frontend (React)  → Backend API (Node.js / Express)  → Alert Engine (business logic layer) → PostgreSQL (Docker)

### Backend Layers
controllers → services → alert engine → database
- **Controllers** → HTTP layer
- **Services** → DB interaction
- **Alert Engine** → core logic (rules, dedup, thresholds)
- **Database** → persistent storage

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL (Docker)
- node-postgres (pg)

### Frontend
- React (Vite)
- Axios
- CSS (custom responsive design)

### Dev Tools
- Docker
- Nodemon
- Git

---

## 📦 Installation

### 1. Clone the repo
git clone (https://github.com/M-Rasmussen/IncidentMonitoringAPI)
cd IncidentMonitoringAPI

### 2. Start PostgreSQL (Docker)
docker run --name incident-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=incident_monitor \
  -p 5432:5432 \
  -d postgres

### 3. Configure environment

Create .env in root:

PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/incident_monitor

### 4. Start backend
npm install
npm run dev

### 5. Start frontend
cd client
npm install
npm run dev
## 🌐 Usage
Open:
http://localhost:5173

### Actions:
- Create error events
- Create critical events
- View alerts + events
- Resolve alerts
- Apply filters

## 📡 API Endpoints
### Events
POST /api/events
GET  /api/events

### Alerts
GET    /api/alerts
PATCH  /api/alerts/:id/resolve

### 🧪 Example Event Payload
{
  "service": "payment-api",
  "level": "error",
  "message": "payment timeout"
}

## ⚡ Performance Considerations
- Indexed queries:
  - service
  - level
  - created_at
- Composite indexes for filtering
- Efficient alert deduplication
- Minimal redundant alert creation

### 🧠 What This Project Demonstrates
- Backend system design
- Event-driven architecture
- Data modeling and relational integrity
- API design with filtering and pagination
- Full-stack integration
- Real-world alerting patterns (deduplication, thresholds)

###📬 Author

Built by Matthew Rasmussen
