const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const researchRoutes = require("./routes/researchRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://multi-agent-gules.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Research Agent Backend Running");
});

app.use("/api/research", researchRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});