import API from "./api";

export const getHistory = async () => {
  const res = await API.get("/research/history");
  return res.data.researches;
};

export const getResearchById = async (id) => {
  const res = await API.get(`/research/${id}`);
  return res.data.research;
};