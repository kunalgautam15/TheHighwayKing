const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GalleryImage", galleryImageSchema);