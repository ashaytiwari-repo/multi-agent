const axios = require("axios");

exports.searchWeb = async (query) => {
  try {
    const response = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: "advanced",
        max_results: 5,
      }
    );

    return response.data.results;
  } catch (error) {
    console.log(
      "Search Agent Error:",
      error.message
    );

    return [];
  }
};