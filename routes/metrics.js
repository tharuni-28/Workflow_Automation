const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET system metrics
router.get("/", async (req, res) => {
  try {
    const events = await pool.query("SELECT COUNT(*) FROM workflow_events");
    const rules = await pool.query("SELECT COUNT(*) FROM workflow_rules");
    const logs = await pool.query("SELECT COUNT(*) FROM workflow_logs");
    const failed = await pool.query(
      "SELECT COUNT(*) FROM workflow_logs WHERE status = 'FAILED'"
    );

    res.json({
      totalEvents: Number(events.rows[0].count),
      totalRules: Number(rules.rows[0].count),
      totalLogs: Number(logs.rows[0].count),
      failedWorkflows: Number(failed.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});
// GET workflow status summary
router.get("/status-summary", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT status, COUNT(*) 
      FROM workflow_logs
      GROUP BY status
    `);

    const summary = {};
    result.rows.forEach(row => {
      summary[row.status || "UNKNOWN"] = Number(row.count);
    });

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch status summary" });
  }
});
// GET recent workflow activity
router.get("/recent-activity", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, action, status, created_at
      FROM workflow_logs
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
});


module.exports = router;
