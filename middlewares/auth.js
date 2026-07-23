module.exports = (req, res, next) => {
  // TEMP: assume user 1 is logged in
  req.user = {
    id: 1,
    role: "ADMIN"
  };
  next();
};
const jwt = require("jsonwebtoken");
const SECRET = "workflow_secret";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

