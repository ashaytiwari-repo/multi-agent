exports.generateCitations = async (
  webResults
) => {
  try {
    const citations = webResults.map(
      (item, index) => {
        return `${index + 1}. ${
          item.url
        }`;
      }
    );

    return citations;
  } catch (error) {
    console.log(
      "Citation Agent Error:",
      error
    );

    return [];
  }
};