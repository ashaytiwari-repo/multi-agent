require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateResearchReport = async (topic) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
You are an expert research assistant.

Generate a detailed research report on:
"${topic}"

Structure the report with:
- Introduction
- Key Concepts
- Current Trends
- Advantages
- Challenges
- Future Scope
- Conclusion

Use proper headings and detailed explanations.
`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};