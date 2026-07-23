const pool = require("../db");

const MAX_RETRY = 3;

async function executeWorkflow(event) {
  const client = await pool.connect();

  try {
    // fetch matching rules
    const rulesResult = await client.query(
      "SELECT * FROM workflow_rules WHERE event_name = $1",
      [event.event_name]
    );

    for (const rule of rulesResult.rows) {
      try {
         
       /*if (rule.action === "FAIL_TEST") {
          throw new Error("Simulated workflow failure");
        }*/

        // SUCCESS log
        await client.query(
          `INSERT INTO workflow_logs 
           (user_id, action, event_type, status) 
           VALUES ($1, $2, $3, $4)`,
          [
            event.user_id,
            `Workflow executed for ${event.event_name}`,
            "WORKFLOW",
            "SUCCESS",
          ]
        );
      } catch (ruleError) {
        // FAILED log with retry info
        await client.query(
          `INSERT INTO workflow_logs 
           (user_id, action, event_type, status, retry_count, error_message) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            event.user_id,
            `Workflow failed for ${event.event_name}`,
            "WORKFLOW",
            "FAILED",
            1,
            ruleError.message,
          ]
        );
      }
    }
  } catch (err) {
    console.error("Workflow engine error:", err.message);
  } finally {
    client.release();
  }
}
async function retryFailedWorkflow(logId) {
  const client = await pool.connect();

  try {
    const logResult = await client.query(
      "SELECT * FROM workflow_logs WHERE id = $1",
      [logId]
    );

    if (logResult.rows.length === 0) {
      throw new Error("Log not found");
    }

    const log = logResult.rows[0];

    if (log.status !== "FAILED") {
      throw new Error("Only FAILED workflows can be retried");
    }

    if (log.retry_count >= 3) {
      throw new Error("Max retry limit reached");
    }

    // 🔁 simulate retry execution
    await client.query(
      `UPDATE workflow_logs
       SET status = 'SUCCESS',
           retry_count = retry_count + 1,
           last_retry_at = NOW(),
           error_message = NULL
       WHERE id = $1`,
      [logId]
    );

    return { message: "Workflow retried successfully" };
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}
module.exports = {
  executeWorkflow,
  retryFailedWorkflow
};


