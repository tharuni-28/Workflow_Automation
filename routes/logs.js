const express = require("express");
const router = express.Router();
const pool = require("../db");

/**
 * GET logs with pagination
 * /logs?page=1&limit=10
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const logsQuery = `
      SELECT *
      FROM workflow_logs
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM workflow_logs`;

    const logsResult = await pool.query(logsQuery, [limit, offset]);
    const countResult = await pool.query(countQuery);

    res.json({
      page,
      limit,
      totalLogs: parseInt(countResult.rows[0].count),
      data: logsResult.rows
    });
  } catch (err) {
    console.error("Logs pagination error:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});
const { retryFailedWorkflow } = require("../services/ruleEngine");

router.post("/retry/:id", async (req, res) => {
  try {
    const logId = req.params.id;
    const result = await retryFailedWorkflow(logId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
