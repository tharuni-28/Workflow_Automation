const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

const SECRET = "workflow_secret";

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // 2. check password (IMPORTANT)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3. generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    // 4. response
    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;