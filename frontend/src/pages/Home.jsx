import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import restaurant from "../assets/restaurant.webp.webp";
import galleryData from "../data/galleryData";

import "./Home.css";

function Home() {
  const galleryImages = galleryData.slice(0, 6);

  return (
    <main className="home-page">
      <Hero />

      <section className="about-v2">
        <div className="about-v2-image">
          <img src={restaurant} alt="The Highway King Restaurant" />
        </div>

        <div className="about-v2-content">
          <span>ABOUT THE HIGHWAY KING</span>
          <h2>Pure Veg Family Restaurant on NH27</h2>
          <p>
            The Highway King is a premium pure veg family restaurant near Jio
            Petrol Pump, Parichha. Perfect for family dining, highway stops,
            parties and special celebrations.
          </p>

          <div className="about-v2-points">
            <div>🍽 Pure Veg Food</div>
            <div>🎉 Party Booking</div>
            <div>🚗 Parking Space</div>
            <div>🕒 Open 6 AM - 1 AM</div>
          </div>
        </div>
      </section>

      <section className="why-v2">
        <div className="section-title">
          <span>WHY CHOOSE US</span>
          <h2>Food, Comfort & Royal Highway Vibes</h2>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <h3>🥗 Pure Veg</h3>
            <p>Fresh vegetarian food for families and travellers.</p>
          </div>

          <div className="why-card">
            <h3>👨‍👩‍👧 Family Friendly</h3>
            <p>Comfortable ambience for family dinner and get-togethers.</p>
          </div>

          <div className="why-card">
            <h3>🎉 Party Space</h3>
            <p>Perfect for birthday, anniversary and family functions.</p>
          </div>

          <div className="why-card">
            <h3>🚗 Parking</h3>
            <p>Easy parking space for guests and highway travellers.</p>
          </div>
        </div>
      </section>

      <section className="services-v2">
        <div className="section-title">
          <span>OUR SERVICES</span>
          <h2>Everything You Need At One Place</h2>
        </div>

        <div className="service-grid">
          <div className="service-card">
            🍽
            <h3>Dine In</h3>
            <p>Premium family dining experience.</p>
          </div>

          <div className="service-card">
            🥡
            <h3>Take Away</h3>
            <p>Fresh food packed for your journey.</p>
          </div>

          <div className="service-card">
            🎂
            <h3>Party Booking</h3>
            <p>Birthday, anniversary and celebrations.</p>
          </div>

          <div className="service-card">
            📍
            <h3>Highway Stop</h3>
            <p>Perfect food stop on NH27 Parichha.</p>
          </div>
        </div>
      </section>

      <section className="gallery-v2">
        <div className="section-title">
          <span>OUR GALLERY</span>
          <h2>Experience The Ambience</h2>
        </div>

        <div className="gallery-grid-v2">
          {galleryImages.map((item) => (
            <div className="gallery-item-v2" key={item.id}>
              <img src={item.image} alt={item.title} />
            </div>
          ))}
        </div>

        <div className="gallery-btn-box">
          <Link to="/gallery" className="gallery-view-btn">
            View Full Gallery
          </Link>
        </div>
      </section>

      <section className="featured-food">
        <div className="section-title">
          <span>OUR SPECIALS</span>
          <h2>Most Loved Dishes</h2>
        </div>

        <div className="food-grid">
          <div className="food-card">
            <h3>Paneer Butter Masala</h3>
            <p>★★★★★</p>
            <span>₹250</span>
          </div>

          <div className="food-card">
            <h3>Kadhai Paneer</h3>
            <p>★★★★★</p>
            <span>₹220</span>
          </div>

          <div className="food-card">
            <h3>Veg Biryani</h3>
            <p>★★★★★</p>
            <span>₹180</span>
          </div>

          <div className="food-card">
            <h3>Cold Coffee</h3>
            <p>★★★★★</p>
            <span>₹90</span>
          </div>
        </div>
      </section>

      <section className="party-banner">
        <h2>Celebrate Every Occasion With Us 🎉</h2>
        <p>
          Birthday • Anniversary • Kitty Party • Family Function • Corporate Meet
        </p>
        <Link to="/party-booking">Book Your Party</Link>
      </section>

      <section className="review-section">
        <div className="section-title">
          <span>GOOGLE REVIEWS</span>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="review-grid">
          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              Amazing ambience and delicious food. Perfect place for family
              dinner.
            </p>
            <h4>Rahul Sharma</h4>
          </div>

          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              Highway par itna accha restaurant expect nahi kiya tha. Great
              experience.
            </p>
            <h4>Anjali Verma</h4>
          </div>

          <div className="review-card">
            ⭐⭐⭐⭐⭐
            <p>
              Party booking experience was excellent. Seating and service were
              very good.
            </p>
            <h4>Deepak Singh</h4>
          </div>
        </div>
      </section>

      <section className="home-map">
        <div className="section-title">
          <span>VISIT US</span>
          <h2>Find Us On Map</h2>
        </div>

        <iframe
          src="https://www.google.com/maps?q=25.5283895,78.770988&z=17&output=embed"
          width="100%"
          height="420"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="The Highway King Location"
        ></iframe>

        <a
          href="https://www.google.com/maps/place/the+highway+king/@25.5283894,78.7661171,17z/data=!3m1!4b1!4m6!3m5!1s0x397799cab1659d53:0x6516106ab80ebf14!8m2!3d25.5283895!4d78.770988!16s%2Fg%2F11z1vrsq5w"
          target="_blank"
          rel="noreferrer"
        >
          Open In Google Maps
        </a>
      </section>

      <footer className="home-footer">
        <h2>THE HIGHWAY KING</h2>

        <p>NH27 Jhansi–Kanpur Highway, Near Jio Petrol Pump, Parichha</p>

        <p>📞 +91 8960599978</p>

        <p>🕒 Open Daily: 6 AM - 1 AM</p>

        <div className="footer-links">
          <Link to="/menu">Order Food</Link>
          <Link to="/party-booking">Book Party</Link>
          <a
            href="https://g.page/r/CRS_DrhqEBZlEBM/review"
            target="_blank"
            rel="noreferrer"
          >
            Google Review
          </a>
        </div>

        <span>© 2026 The Highway King. All Rights Reserved.</span>
      </footer>
    </main>
  );
}

export default Home;