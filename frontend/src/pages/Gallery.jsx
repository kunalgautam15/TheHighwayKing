import galleryData from "../data/galleryData";
import "./Gallery.css";

function Gallery() {
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
          {galleryData.map((item) => (
            <div className="gallery-card" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="gallery-content">
                <span>{item.category}</span>
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