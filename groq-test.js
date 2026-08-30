const OpenAI = require("openai");

async function main() {
  const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
  try {
    const c = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "system", content: "RELEVANT LIVE SITE CONTENT: " + "x".repeat(3200) },
        { role: "user", content: "what services do you offer" },
      ],
    });
    console.log("OK:", c.choices?.[0]?.message?.content?.slice(0, 100));
  } catch (e) {
    console.error("ERR:", e.status, e.error?.message || e.message);
  }
}
main();
