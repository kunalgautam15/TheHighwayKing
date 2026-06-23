const express = require("express");

const router = express.Router();

const Order = require("../models/Order");
const adminAuth = require("../middleware/adminAuth");

// Public: place order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, items, totalAmount } = req.body;

    if (!customerName || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Customer name, phone and address are required.",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required.",
      });
    }

    const cleanItems = items.map((item) => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const order = await Order.create({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: cleanItems,
      totalAmount: Number(totalAmount),
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.log("Order Create Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin only: get all orders
router.get("/", adminAuth, async (req, res) => {
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

// Public: track order by phone
router.get("/track/:phone", async (req, res) => {
  try {
    const phone = req.params.phone.trim();

    const orders = await Order.find({
      phone,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin only: update order status
router.put("/:id/status", adminAuth, async (req, res) => {
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

// Admin only: delete order
router.delete("/:id", adminAuth, async (req, res) => {
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