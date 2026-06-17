import restaurant from "../assets/restaurant.webp.webp";

function Home() {
  return (
    <main>
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${restaurant})` }}
      >
        <div className="home-overlay">
          <p className="hero-small">Welcome to</p>

          <h1>THE HIGHWAY KING</h1>

          <p className="hero-tagline">
            Pure Veg Family Restaurant • Party Booking • Online Food Ordering
          </p>

          <p className="hero-address">
            NH27 Jhansi–Kanpur Highway, Near Jio Petrol Pump, Parichha
          </p>

          <div className="hero-buttons">
            <a href="/menu">Order Food</a>
            <a href="/party-booking">Book Party</a>
          </div>
        </div>
      </section>

      <section className="home-info">
        <h2>Why Choose Us?</h2>

        <div className="info-grid">
          <div className="info-card">
            <h3>100% Pure Veg</h3>
            <p>Fresh, tasty and family-friendly food experience.</p>
          </div>

          <div className="info-card">
            <h3>Party Booking</h3>
            <p>Birthday, anniversary and family events available.</p>
          </div>

          <div className="info-card">
            <h3>Highway Location</h3>
            <p>Perfect stop on NH27 Jhansi–Kanpur Highway.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;