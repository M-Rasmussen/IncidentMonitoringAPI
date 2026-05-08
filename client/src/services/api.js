import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAlerts(params = {}) {
  const res = await axios.get(`${API_URL}/api/alerts`, { params });
  return res.data.data || res.data;
}

export async function getEvents(params = {}) {
  const res = await axios.get(`${API_URL}/api/events`, { params });
  return res.data.data || res.data;
}

export async function resolveAlert(id) {
  await axios.patch(`${API_URL}/api/alerts/${id}/resolve`);
}

export async function createEvent(event) {
  await axios.post(`${API_URL}/api/events`, event);
}

export async function generateAiSummary(alertId) {
  const res = await axios.post(
    `${API_URL}/api/alerts/${alertId}/ai-summary`
  );

  return res.data.data || res.data;
}