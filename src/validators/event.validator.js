const { z } = require("zod");

const createEventSchema = z.object({
  service: z.string().min(1, "Service is required"),
  level: z.enum(["info", "warn", "error", "critical"], {
    errorMap: () => ({
      message: "Level must be one of: info, warn, error, critical"
    })
  }),
  message: z.string().min(1, "Message is required"),
  metadata: z.object({}).passthrough().optional()
});

module.exports = {
  createEventSchema
};