const express = require("express");
const router = express.Router();
const pool = require("../db");

/**
 * GET all workflow rules
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workflow_rules ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching rules:", err);
    res.status(500).json({ error: "Failed to fetch rules" });
  }
});

module.exports = router;
