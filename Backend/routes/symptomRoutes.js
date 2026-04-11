const express = require("express");
const router = express.Router();
const { analyzeSymptoms } = require("../services/symptomService");

router.post("/analyze", async (req, res) => {
    try {
  const { symptoms } = req.body;

  const result = await analyzeSymptoms(symptoms);

  res.json(result);
   } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});

module.exports = router;