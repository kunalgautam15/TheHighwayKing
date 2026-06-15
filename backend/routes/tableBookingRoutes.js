const express = require("express");

const router = express.Router();

const TableBooking = require("../models/TableBooking");

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

router.get("/", async (req, res) => {
  try {
    const tableBookings = await TableBooking.find().sort({
      createdAt: -1,
    });

    res.json(tableBookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
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