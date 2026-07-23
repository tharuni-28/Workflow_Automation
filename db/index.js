const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "workflow_automation",
  password: "muthaitharu31",
  port: 5432,
});

module.exports = pool;
