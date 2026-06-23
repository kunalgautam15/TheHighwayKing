const express = require("express");

const router = express.Router();

const MenuItem = require("../models/MenuItem");
const adminAuth = require("../middleware/adminAuth");

// Admin only: add new menu item
router.post("/", adminAuth, async (req, res) => {
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

// Public: get all menu items
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

// Admin only: update menu item
router.put("/:id", adminAuth, async (req, res) => {
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

// Admin only: delete menu item
router.delete("/:id", adminAuth, async (req, res) => {
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