// Netlify serverless function: keeps the AI API key on the server.
exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Method not allowed" }) };
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "AI is not configured. Add OPENAI_API_KEY in Netlify environment variables." }) };
  }
  let input;
  try { input = JSON.parse(event.body || "{}"); } catch {
    return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Invalid JSON" }) };
  }
  const topic = String(input.topic || "Triangles and the Pythagorean theorem").slice(0, 120);
  const level = ["Foundation", "Standard", "Advanced"].includes(input.level) ? input.level : "Standard";
  const action = ["problem", "hint", "solution"].includes(input.action) ? input.action : "problem";
  const problem = String(input.problem || "").slice(0, 1000);
  const levelInstructions = {
    Foundation: "Use simple numbers and familiar contexts. Give one small step at a time, define terms, and provide a direct but learning-focused hint.",
    Standard: "Use a grade-level geometry problem. Expect the learner to choose and apply the relevant formula with a few steps.",
    Advanced: "Use a multi-step challenge, proof-style reasoning, or a realistic application. Require students to connect at least two ideas."
  };
  const system = `You are a careful geometry teacher creating differentiated learning activities. Topic: ${topic}. Student level: ${level}. Level guidance: ${levelInstructions[level]} Return mathematically correct content only. Verify calculations before answering. Do not make unsupported assumptions. Use units consistently. Return valid JSON only, without markdown fences, matching the requested schema.`;
  let user;
  if (action === "problem") {
    user = `Create one original geometry problem on the selected topic for the selected level. Return JSON with exactly these keys: title (short string), problem (string), answer (short string), answerDisplay (string with units), hint (one or two sentences), steps (array of 2-5 strings), explanation (2-3 sentences), numericAnswer (number if the main answer is a single number; otherwise null). Keep the problem solvable and check the answer.`;
  } else if (action === "hint") {
    user = `The student is working on this problem: ${problem}. Give a tailored hint appropriate to ${level}. Do not reveal the final answer. Return JSON with one key: hint (string).`;
  } else {
    user = `The student is working on this problem: ${problem}. Provide a checked step-by-step solution appropriate to ${level}. Return JSON with exactly these keys: steps (array of 2-5 strings), answer (string with units where relevant), explanation (2-3 sentences).`;
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: system }, { role: "user", content: user }]
      })
    });
    const payload = await response.json();
    if (!response.ok) {
      return { statusCode: 502, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "AI provider request failed", detail: payload.error?.message || "Unknown provider error" }) };
    }
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");
    const parsed = JSON.parse(content);
    return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(action === "problem" ? { problem: parsed } : parsed) };
  } catch (error) {
    return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Could not generate a valid AI response." }) };
  }
};
