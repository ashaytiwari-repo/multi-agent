const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const researchRoutes = require("./routes/researchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://multi-agent-dj41.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Research Agent Backend Running");
});

app.use("/api/research", researchRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});