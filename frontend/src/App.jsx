import "./App.css";
import logo from "./assets/logo.jpg.jpg";
import restaurant from "./assets/restaurant.webp.webp";
// import menuPdf from "./assets/menu.pdf";
import { useState } from "react";

function App() {
  const [partyForm, setPartyForm] = useState({
    name: "",
    phone: "",
    event: "",
    date: "",
    guests: "",
  });

  const [tableForm, setTableForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  const [partyBookings, setPartyBookings] = useState([]);
  const [tableBookings, setTableBookings] = useState([]);

  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuMessage, setMenuMessage] = useState("");

  const downloadMenu = () => {
    setMenuMessage("✅ Menu downloaded successfully!");

    setTimeout(() => {
      setMenuMessage("");
    }, 3000);
  };

  const handlePartyBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partyForm),
      });

      const data = await response.json();

      if (data.success) {
        alert("Party booking saved successfully!");

        const message =
          `🎉 Party Booking Request\n\n` +
          `Name: ${partyForm.name}\n` +
          `Phone: ${partyForm.phone}\n` +
          `Event Type: ${partyForm.event}\n` +
          `Event Date: ${partyForm.date}\n` +
          `Guests: ${partyForm.guests}`;

        window.open(
          `https://wa.me/918960599978?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        setPartyForm({
          name: "",
          phone: "",
          event: "",
          date: "",
          guests: "",
        });
      } else {
        alert("Party booking was not saved.");
      }
    } catch (error) {
      alert("Backend server is not responding.");
      console.log(error);
    }
  };

  const handleTableBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/table-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableForm),
      });

      const data = await response.json();

      if (data.success) {
        alert("Table booking saved successfully!");

        const message =
          `🍽️ Table Booking Request\n\n` +
          `Name: ${tableForm.name}\n` +
          `Phone: ${tableForm.phone}\n` +
          `Date: ${tableForm.date}\n` +
          `Time: ${tableForm.time}\n` +
          `Guests: ${tableForm.guests}`;

        window.open(
          `https://wa.me/918960599978?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        setTableForm({
          name: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
        });
      } else {
        alert("Table booking was not saved.");
      }
    } catch (error) {
      alert("Backend server is not responding.");
      console.log(error);
    }
  };

  const getPartyBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();
      setPartyBookings(data);
    } catch (error) {
      alert("Party bookings are not loading.");
      console.log(error);
    }
  };

  const getTableBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/table-bookings");
      const data = await response.json();
      setTableBookings(data);
    } catch (error) {
      alert("Table bookings are not loading.");
      console.log(error);
    }
  };

  const refreshAllBookings = () => {
    getPartyBookings();
    getTableBookings();
  };

  const deletePartyBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this party booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Party booking deleted successfully!");
        getPartyBookings();
      } else {
        alert("Party booking was not deleted.");
      }
    } catch (error) {
      alert("Delete request failed.");
      console.log(error);
    }
  };

  const deleteTableBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this table booking?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/table-bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Table booking deleted successfully!");
        getTableBookings();
      } else {
        alert("Table booking was not deleted.");
      }
    } catch (error) {
      alert("Delete request failed.");
      console.log(error);
    }
  };

  const loginAdmin = () => {
    if (adminPassword === "highwayking123") {
      setIsAdmin(true);
      refreshAllBookings();
    } else {
      alert("Incorrect admin password.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="The Highway King" />
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#party-booking">Party</a></li>
          <li><a href="#table-booking">Table</a></li>
          <li><a href="#admin">Admin</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section
        id="home"
        className="hero"
        style={{ backgroundImage: `url(${restaurant})` }}
      >
        <div className="overlay">
          <h1>THE HIGHWAY KING</h1>

          <p className="tagline">
            Family Restaurant • Pure Veg • Party Booking
          </p>

          <p className="address">
            NH27 Jhansi–Kanpur Highway, Near Jio Petrol Pump, Parichha
          </p>

          <div className="buttons">
            <a href="https://wa.me/918960599978" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>

            <a href="tel:8960599978">Call Now</a>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>Welcome To The Highway King</h2>

        <p>
          Family-friendly Pure Veg Restaurant with Party Booking Facilities,
          Delicious Food and Comfortable Dining Experience.
        </p>
      </section>

      <section id="menu" className="menu-section">
        <h2>Our Restaurant Menu</h2>

        <p className="menu-text">
          Click below to download our complete food menu.
        </p>

        <a
          href="#menu"
          download
          className="menu-download-btn"
          onClick={downloadMenu}
        >
          Download Menu PDF
        </a>

        {menuMessage && <p className="menu-message">{menuMessage}</p>}
      </section>

      <section id="party-booking" className="booking-section">
        <h2>Party Booking</h2>

        <div className="booking-form">
          <input
            type="text"
            placeholder="Your Name"
            value={partyForm.name}
            onChange={(e) =>
              setPartyForm({ ...partyForm, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={partyForm.phone}
            onChange={(e) =>
              setPartyForm({ ...partyForm, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Event Type"
            value={partyForm.event}
            onChange={(e) =>
              setPartyForm({ ...partyForm, event: e.target.value })
            }
          />

          <input
            type="date"
            value={partyForm.date}
            onChange={(e) =>
              setPartyForm({ ...partyForm, date: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Number of Guests"
            value={partyForm.guests}
            onChange={(e) =>
              setPartyForm({ ...partyForm, guests: e.target.value })
            }
          />

          <button onClick={handlePartyBooking}>Book Party</button>
        </div>
      </section>

      <section id="table-booking" className="booking-section table-section">
        <h2>Table Booking</h2>

        <div className="booking-form">
          <input
            type="text"
            placeholder="Your Name"
            value={tableForm.name}
            onChange={(e) =>
              setTableForm({ ...tableForm, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={tableForm.phone}
            onChange={(e) =>
              setTableForm({ ...tableForm, phone: e.target.value })
            }
          />

          <input
            type="date"
            value={tableForm.date}
            onChange={(e) =>
              setTableForm({ ...tableForm, date: e.target.value })
            }
          />

          <input
            type="time"
            value={tableForm.time}
            onChange={(e) =>
              setTableForm({ ...tableForm, time: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Number of Guests"
            value={tableForm.guests}
            onChange={(e) =>
              setTableForm({ ...tableForm, guests: e.target.value })
            }
          />

          <button onClick={handleTableBooking}>Book Table</button>
        </div>
      </section>

      <section className="review-section">
        <h2>Why People Love Us ❤️</h2>

        <div className="review-grid">
          <div className="review-card">
            <h3>Delicious Food</h3>
            <p>Fresh Pure Veg Food with Amazing Taste.</p>
          </div>

          <div className="review-card">
            <h3>Family Atmosphere</h3>
            <p>Comfortable seating for families and parties.</p>
          </div>

          <div className="review-card">
            <h3>Party Booking</h3>
            <p>Birthday, Anniversary and Event Booking Available.</p>
          </div>
        </div>
      </section>

      <section className="map-section">
        <h2>Find Us On Map 📍</h2>

        <iframe
          src="https://www.google.com/maps?q=Parichha+Jhansi&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="map"
        ></iframe>
      </section>

      <section className="social-section">
        <h2>Follow Us On Instagram 📸</h2>

        <a
          href="https://instagram.com/highwayking0626"
          target="_blank"
          rel="noreferrer"
          className="insta-btn"
        >
          Follow @highwayking0626
        </a>
      </section>

      <section id="admin" className="admin-section">
        <h2>Admin Bookings</h2>

        {!isAdmin ? (
          <div className="admin-login">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />

            <button onClick={loginAdmin}>Login</button>
          </div>
        ) : (
          <>
            <button className="load-btn" onClick={refreshAllBookings}>
              Refresh Bookings
            </button>

            <button className="logout-btn" onClick={() => setIsAdmin(false)}>
              Logout
            </button>

            <h3 className="admin-subtitle">Party Bookings</h3>

            <div className="booking-list">
              {partyBookings.length === 0 ? (
                <p>No party bookings loaded yet.</p>
              ) : (
                partyBookings.map((booking) => (
                  <div className="booking-card" key={booking._id}>
                    <h3>{booking.name}</h3>
                    <p><strong>Phone:</strong> {booking.phone}</p>
                    <p><strong>Event:</strong> {booking.event}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>

                    <button
                      className="delete-btn"
                      onClick={() => deletePartyBooking(booking._id)}
                    >
                      Delete Party Booking
                    </button>
                  </div>
                ))
              )}
            </div>

            <h3 className="admin-subtitle">Table Bookings</h3>

            <div className="booking-list">
              {tableBookings.length === 0 ? (
                <p>No table bookings loaded yet.</p>
              ) : (
                tableBookings.map((booking) => (
                  <div className="booking-card" key={booking._id}>
                    <h3>{booking.name}</h3>
                    <p><strong>Phone:</strong> {booking.phone}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Time:</strong> {booking.time}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTableBooking(booking._id)}
                    >
                      Delete Table Booking
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>

        <p>📞 +91 8960599978</p>

        <p>
          NH27 Jhansi–Kanpur Highway, Near Jio Petrol Pump, Parichha
        </p>

        <p>🕒 Open Daily: 6 AM - 1 AM</p>
      </section>

      <footer className="footer">© 2026 The Highway King</footer>

      <a
        href="https://wa.me/918960599978"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>
    </div>
  );
}

export default App;