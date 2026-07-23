const express = require("express");
const router = express.Router();
const pool = require("../db");
const { executeWorkflow } = require("../services/workflowExecutor");

// CREATE EVENT (TRIGGER WORKFLOW)
router.post("/", async (req, res) => {
  const { event_name, user_id } = req.body;

  if (!event_name || !user_id) {
    return res.status(400).json({
      error: "event_name and user_id are required",
    });
  }

  try {
    // 1️⃣ Save event
    const eventResult = await pool.query(
      `INSERT INTO workflow_events (event_name, user_id)
       VALUES ($1, $2) RETURNING *`,
      [event_name, user_id]
    );

    const event = eventResult.rows[0];

    // 2️⃣ Trigger workflow engine
    await executeWorkflow(event);

    res.status(201).json({
      message: "Event created & workflow executed 🚀",
      event,
    });
  } catch (error) {
    console.error("❌ Event error:", error.message);
    res.status(500).json({
      error: "Failed to create event",
    });
  }
});
// GET EVENTS (with optional filter)
router.get("/", async (req, res) => {
  try {
    const { event_name } = req.query;

    let query = "SELECT * FROM workflow_events ORDER BY created_at DESC";
    let values = [];

    if (event_name) {
      query = "SELECT * FROM workflow_events WHERE event_name = $1 ORDER BY created_at DESC";
      values = [event_name];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Fetch events failed:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});


module.exports = router;
