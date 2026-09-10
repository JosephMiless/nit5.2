const logger = (req, res, next) => {
  console.log(`you hit this route: ${req.url} ${new Date()}`);

  next();
};

const authorize = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, "jwt-secret");
  req.user = decoded;
  next();
};

module.exports = {logger, authorize}