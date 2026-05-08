const rateLimit = require("express-rate-limit");

const aiRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: Number(process.env.MAX_AI_SUMMARIES_PER_DAY || 20),
  message: {
    error: "Daily AI summary limit reached. Please try again later.",
  },
});

module.exports = { aiRateLimit };