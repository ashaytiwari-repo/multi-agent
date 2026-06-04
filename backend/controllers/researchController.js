const Research = require("../models/Research");

const {
    generateResearchPlan,
} = require("../agents/plannerAgent");

const {
    generateSectionResearch,
} = require("../agents/researchAgent");

const {
    searchWeb,
} = require("../agents/searchAgent");

const {
    generateCitations,
} = require("../agents/citationAgent");
// GENERATE RESEARCH
exports.generateResearch = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: "Topic is required",
            });
        }

        console.log("Topic:", topic);

        // STEP 1: Planner Agent
        const sections =
            await generateResearchPlan(topic);

        console.log("Sections:", sections);

        let finalReport = `# ${topic}\n\n`;

        // STEP 2: Research Agent
        const sectionReports = await Promise.all(
            sections.map(async (section) => {

                console.log(
                    `Generating Section: ${section}`
                );

                // SEARCH AGENT
                const webResults = await searchWeb(
                    `${topic} ${section}`
                );

                // RESEARCH AGENT
                const content =
                    await generateSectionResearch(
                        topic,
                        section,
                        webResults
                    );

                // CITATION AGENT
                const citations =
                    await generateCitations(webResults);

                return `
---

# ${section}

${content}

## References

${citations.join("\n\n")}
`;
            })
        );

        // COMBINE REPORTS
        finalReport += sectionReports.join("\n");

        // STEP 3: SAVE TO DATABASE
        const savedResearch =
            await Research.create({
                topic,
                report: finalReport,
            });

        // STEP 4: RESPONSE
        res.status(200).json({
            success: true,
            research: savedResearch,
        });
    } catch (error) {
        console.log(
            "Research Controller Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

// GET RESEARCH HISTORY
exports.getResearchHistory = async (
    req,
    res
) => {
    try {
        const researches =
            await Research.find().sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            researches,
        });
    } catch (error) {
        console.log(
            "History Fetch Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.getResearchById = async (req, res) => {
  try {
    const { id } = req.params;

    const research = await Research.findById(id);

    if (!research) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    res.status(200).json({
      success: true,
      research,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};