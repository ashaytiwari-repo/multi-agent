const express = require("express");
const router = express.Router();

const {
  generateResearch,
  getResearchHistory,
  getResearchById,
} = require("../controllers/researchController");

router.post("/", generateResearch);

router.get("/history", getResearchHistory);

router.get("/:id", getResearchById);
module.exports = router;