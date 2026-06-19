import "./Gallery.css";

function Gallery() {
  return (
    <div className="gallery-page">

      <div className="gallery-hero">
        <h1>Our Gallery</h1>
        <p>Experience The Highway King through our moments.</p>
      </div>

      <div className="gallery-grid">

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant"
          />
        </div>

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9"
            alt="Food"
          />
        </div>

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="Paneer"
          />
        </div>

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Dining"
          />
        </div>

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b"
            alt="Restaurant"
          />
        </div>

        <div className="gallery-card">
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
            alt="Pizza"
          />
        </div>

      </div>

    </div>
  );
}

export default Gallery;