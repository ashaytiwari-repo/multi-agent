const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    report: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Research", researchSchema);