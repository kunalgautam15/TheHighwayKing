const express = require("express");

const router = express.Router();

const GalleryImage = require("../models/GalleryImage");

router.post("/", async (req, res) => {
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