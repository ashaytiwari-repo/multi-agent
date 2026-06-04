require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateSectionResearch = async (
  topic,
  section,
  webData
) => {
  try {
    const formattedWebData = webData
      .map(
        (item) => `
Title: ${item.title}

Content: ${item.content}

URL: ${item.url}
`
      )
      .join("\n\n");

    const prompt = `
You are an expert AI research agent.

TOPIC:
${topic}

SECTION:
${section}

WEB SEARCH DATA:
${formattedWebData}

TASK:
Generate a detailed, accurate, and
well-structured research section.

IMPORTANT:
- Do NOT generate references
- Do NOT generate citations
- Do NOT add source URLs
- Do NOT create bibliography
- Only generate section content

Include:
- proper explanation
- latest information
- well-structured content
`;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log(
      "Research Agent Error:",
      error
    );

    throw error;
  }
};