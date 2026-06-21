const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

// Add new menu item
router.post("/", async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);

    res.status(201).json({
      success: true,
      message: "Menu item added successfully.",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update menu item
router.put("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      success: true,
      message: "Menu item updated successfully.",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete menu item
router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Menu item deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;