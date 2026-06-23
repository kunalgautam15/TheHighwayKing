const express = require("express");

const router = express.Router();

const GalleryImage = require("../models/GalleryImage");
const adminAuth = require("../middleware/adminAuth");

// Admin only: add gallery image
router.post("/", adminAuth, async (req, res) => {
  try {
    const { title, category, image } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Title and image URL are required.",
      });
    }

    const galleryImage = await GalleryImage.create({
      title: title.trim(),
      category: category?.trim() || "Restaurant",
      image: image.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Gallery image added successfully.",
      image: galleryImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Public: get gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({
      createdAt: -1,
    });

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

// Admin only: delete gallery image
router.delete("/:id", adminAuth, async (req, res) => {
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