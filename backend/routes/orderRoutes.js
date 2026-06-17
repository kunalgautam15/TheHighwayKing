const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
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
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id/status", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus,
      },
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;