import Hero from "../components/Hero";

function Home() {
  return (
    <main>

      <Hero />

      <section className="home-info">

        <h2>Why Choose Us?</h2>

        <div className="info-grid">

          <div className="info-card">
            <h3>100% Pure Veg</h3>
            <p>
              Fresh, hygienic and delicious vegetarian food for every family.
            </p>
          </div>

          <div className="info-card">
            <h3>Party Booking</h3>
            <p>
              Birthday, Anniversary, Corporate Events and Family Functions.
            </p>
          </div>

          <div className="info-card">
            <h3>Highway Location</h3>
            <p>
              Located on NH27 near Jio Petrol Pump, Parichha with ample parking.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;