require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateResearchPlan = async (topic) => {
  try {
    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
You are a research planning AI agent.

Create a research plan for the topic:
"${topic}"

Return ONLY a JSON array of section titles.

Example:
[
  "Introduction",
  "Applications"
]
`,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    let response =
      completion.choices[0].message.content;

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};