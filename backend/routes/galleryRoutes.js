const express = require("express");
const router = express.Router();

const GalleryImage = require("../models/GalleryImage");

// Add gallery image
router.post("/", async (req, res) => {
  try {
    const image = await GalleryImage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Gallery image added successfully.",
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete gallery image
router.delete("/:id", async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;