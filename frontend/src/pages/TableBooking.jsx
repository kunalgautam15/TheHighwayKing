import { useState } from "react";
import "./TableBooking.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function TableBooking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/api/table-bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert("Table booking saved successfully!");

        const whatsappMessage =
          `🍽️ Table Booking Request\n\n` +
          `Name: ${form.name}\n` +
          `Phone: ${form.phone}\n` +
          `Date: ${form.date}\n` +
          `Time: ${form.time}\n` +
          `Guests: ${form.guests}\n` +
          `Message: ${form.message}`;

        window.open(
          `https://wa.me/918960599978?text=${encodeURIComponent(
            whatsappMessage
          )}`,
          "_blank"
        );

        setForm({
          name: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
          message: "",
        });
      } else {
        alert("Table booking was not saved.");
      }
    } catch (error) {
      alert("Backend server is not responding.");
      console.log(error);
    }
  };

  return (
    <main className="table-page">
      <section className="table-hero">
        <h1>Reserve Your Table</h1>
        <p>Book your perfect dining experience at The Highway King.</p>
      </section>

      <section className="table-container">
        <div className="table-info">
          <h2>Dining Experience</h2>

          <div className="table-features">
            <div>🍽 Pure Veg Dining</div>
            <div>👨‍👩‍👧 Family Seating</div>
            <div>🚗 Parking Available</div>
            <div>🕒 Open 6 AM - 1 AM</div>
            <div>📍 NH27 Highway Location</div>
            <div>⭐ Premium Ambience</div>
          </div>
        </div>

        <form className="table-form" onSubmit={handleSubmit}>
          <h2>Book Table</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={form.guests}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Any special request?"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Save & Book via WhatsApp</button>
        </form>
      </section>
    </main>
  );
}

export default TableBooking;