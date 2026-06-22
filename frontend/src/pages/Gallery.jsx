import { useEffect, useState } from "react";
import galleryData from "../data/galleryData";
import "./Gallery.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState(galleryData);

  useEffect(() => {
    getGalleryImages();
  }, []);

  const getGalleryImages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery`);
      const data = await response.json();

      if (data.success && data.images.length > 0) {
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.log("Gallery loading failed. Showing default gallery.", error);
    }
  };

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <p className="gallery-small-title">OUR GALLERY</p>

        <h2 className="gallery-main-title">The Highway King Moments</h2>

        <p className="gallery-description">
          Explore our pure veg food, family ambience and highway restaurant
          vibes.
        </p>

        <div className="gallery-grid">
          {galleryImages.map((item) => (
            <div className="gallery-card" key={item._id || item.id}>
              <img src={item.image} alt={item.title} />

              <div className="gallery-content">
                <span>{item.category || "Restaurant"}</span>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;