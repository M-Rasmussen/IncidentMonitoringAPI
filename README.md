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
<img width="894" height="906" alt="image" src="https://github.com/user-attachments/assets/503271b2-5a68-4684-90a3-3ad1e3e6ee3b" />


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

### 🤖 AI-Assisted Alert Analysis
- AI-generated operational summaries using OpenAI APIs
- Suggested remediation steps and possible root-cause analysis
- Rate-limited AI workflows to control external API usage
- Backend-only AI integration using environment-based secrets
---

## 🏗️ Architecture

Frontend (React)  → Backend API (Node.js / Express)  → Alert Engine & AI Analysis Layer → PostgreSQL (Docker)

### Backend Layers

routes → controllers → services → alert engine → database

- **Routes** → API endpoint definitions
- **Controllers** → request orchestration and response handling
- **Services** → business logic and database interaction
- **Alert Engine** → threshold detection, deduplication, alert workflows
- **Database** → persistent relational storage
---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL (Docker)
- node-postgres (pg)
-  OpenAI API

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

OPENAI_API_KEY=your_key_here
AI_SUMMARY_ENABLED=true
MAX_AI_SUMMARIES_PER_DAY=20DATABASE_URL=postgresql://postgres:postgres@localhost:5432/incident_monitor

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
POST /api/alerts/:id/ai-summary

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
- Full-stack application architecture
- Event-driven monitoring workflows
- Backend API design and service layering
- Operational alerting patterns and deduplication
- PostgreSQL relational data modeling
- React state management and async workflows
- AI-assisted operational tooling using external APIs
- Environment-based configuration and secure integrations
- Production-style deployment using Render and Docker

## 📬 Author

Built by Matthew Rasmussen
