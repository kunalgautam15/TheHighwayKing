import "./Gallery.css";

import img1 from "../assets/667684622_1364974539000228_7072891323784273819_n.jpg";
import img2 from "../assets/667736821_1364974735666875_4019101381168717394_n.jpg";
import img3 from "../assets/667987983_1364974462333569_4432384417421141288_n.jpg";
import img4 from "../assets/669580013_1364974599000222_9532336355546882_n.jpg";
import img5 from "../assets/670599051_1364974659000216_3768677059654462997_n.jpg";
import img6 from "../assets/681302101_1380230924141256_1056288194259606910_n.jpg";
import img7 from "../assets/681688673_1380230984141250_6076094736399533365_n.jpg";
import img8 from "../assets/681688673_1380231027474579_5000083418532118004_n.jpg";
import img9 from "../assets/684002890_1380231164141232_3720874070361932966_n.jpg";
import img10 from "../assets/684655881_1380231214141227_6224520316401419297_n.jpg";

function Gallery() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <h1>Our Gallery</h1>
        <p>Experience The Highway King through our real restaurant moments.</p>
      </section>

      <section className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-card" key={index}>
            <img src={image} alt={`The Highway King Gallery ${index + 1}`} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Gallery;