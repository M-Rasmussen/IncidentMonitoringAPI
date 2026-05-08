const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAlertSummary({ alert, events }) {
  if (process.env.AI_SUMMARY_ENABLED !== "true") {
    return null;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const eventText = events
    .slice(0, 10)
    .map(
      (event) =>
        `Level: ${event.level}, Service: ${event.service}, Message: ${event.message}, Time: ${event.created_at}`
    )
    .join("\n");

  const prompt = `
You are an SRE assistant.

Analyze this alert and related service events.

Return valid JSON only with exactly these keys:
{
  "summary": "...",
  "possibleCause": "...",
  "suggestedSteps": ["...", "...", "..."]
}

Alert:
Service: ${alert.service}
Type: ${alert.type}
Message: ${alert.message}
Event Count: ${alert.event_count}

Related Events:
${eventText}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = {
  generateAlertSummary,
};