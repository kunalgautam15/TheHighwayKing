const express = require("express");

const router = express.Router();

const TableBooking = require("../models/TableBooking");
const adminAuth = require("../middleware/adminAuth");

// Public: submit table booking
router.post("/", async (req, res) => {
  try {
    const tableBooking = await TableBooking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Table booking saved successfully.",
      tableBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin only: get all table bookings
router.get("/", adminAuth, async (req, res) => {
  try {
    const tableBookings = await TableBooking.find().sort({
      createdAt: -1,
    });

    res.json(tableBookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin only: delete table booking
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await TableBooking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Table booking deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;