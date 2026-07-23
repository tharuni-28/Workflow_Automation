const express = require("express");
const cors = require("cors");
const path = require("path");
const metricsRouter = require("./routes/metrics");
const authRoutes = require("./routes/auth"); // ✅ ADD THIS

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));app.use("/metrics", metricsRouter);
app.use("/auth", authRoutes); // ✅ ADD THIS


// =====================
// ROUTES
// =====================
const usersRouter = require("./routes/users");
const eventsRouter = require("./routes/events");
const rulesRouter = require("./routes/rules");
const logsRouter = require("./routes/logs");

app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/rules", rulesRouter);
app.use("/logs", logsRouter);

// =====================
// ROOT TEST
// =====================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"frontend", "index.html"))
});

// =====================
// START SERVER
// =====================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});