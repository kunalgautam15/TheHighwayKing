import "./Hero.css";
import hero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="hero-overlay">

        <div className="hero-content">

          <span className="hero-badge">
            🌿 Pure Veg Family Restaurant
          </span>

          <h1>
            THE <span>HIGHWAY</span> KING
          </h1>

          <p className="hero-tagline">
            Rule The Road, Taste The Royalty
          </p>

          <p className="hero-description">
            Delicious food, luxurious ambience, family dining,
            party booking and unforgettable memories —
            all at one destination.
          </p>

          <div className="hero-buttons">

            <Link to="/menu" className="btn-red">
              🍴 Order Online
            </Link>

            <Link
              to="/table-booking"
              className="btn-green"
            >
              🍽 Book Table
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div>
              <h2>4.8★</h2>
              <p>Google Rating</p>
            </div>

            <div>
              <h2>6 AM - 1 AM</h2>
              <p>Open Daily</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;