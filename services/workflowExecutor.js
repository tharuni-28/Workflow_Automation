const pool = require("../db");

/**
 * Executes workflow rules for a given event
 * @param {Object} event
 */
async function executeWorkflow(event) {
  console.log("⚙️ Workflow Executor started");
  console.log("Event received 👉", event);

  try {
    // STEP 1: fetch rules for this event
    const rulesResult = await pool.query(
      "SELECT * FROM workflow_rules WHERE event_name = $1",
      [event.event_name]
    );

    const rules = rulesResult.rows;

    console.log(`📜 Found ${rules.length} rules`);

    // STEP 2: loop through rules (logic later)
    for (let rule of rules) {
      console.log("➡️ Executing rule:", rule.id);

      // For now: just log success
      await pool.query(
        `INSERT INTO workflow_logs (user_id, action, event_type, status)
         VALUES ($1, $2, $3, $4)`,
        [
          event.user_id,
          `Rule ${rule.id} executed`,
          "WORKFLOW",
          "SUCCESS",
        ]
      );
    }

    console.log("✅ Workflow execution completed");
  } catch (error) {
    console.error("❌ Workflow execution failed:", error.message);
  }
}

module.exports = {
  executeWorkflow,
};
