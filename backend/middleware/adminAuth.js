const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Admin token is missing.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({
      success: false,
      message: "Invalid admin token.",
    });
  }

  next();
};

module.exports = adminAuth;