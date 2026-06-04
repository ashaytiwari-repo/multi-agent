import axios from "axios";

const API = axios.create({
  baseURL: "https://multi-agent-l75k.onrender.com/api",
  
});

export default API;