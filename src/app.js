const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const healthRoutes = require("./routes/health.routes");
const eventRoutes = require("./routes/events.routes");
const alertRoutes = require("./routes/alerts.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/alerts", alertRoutes);

app.use(errorHandler);

module.exports = app;