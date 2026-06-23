const express = require("express");

const router = express.Router();

router.post("/admin-login", (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin password.",
      });
    }

    res.json({
      success: true,
      message: "Admin login successful.",
      token: process.env.ADMIN_TOKEN,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

module.exports = router;