import { useState } from "react";
import "./PartyBooking.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function PartyBooking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    event: "",
    guests: "",
    date: "",
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
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert("Party booking saved successfully!");

        const whatsappMessage =
          `🎉 Party Booking Request\n\n` +
          `Name: ${form.name}\n` +
          `Phone: ${form.phone}\n` +
          `Event: ${form.event}\n` +
          `Guests: ${form.guests}\n` +
          `Date: ${form.date}\n` +
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
          event: "",
          guests: "",
          date: "",
          message: "",
        });
      } else {
        alert("Party booking was not saved.");
      }
    } catch (error) {
      alert("Backend server is not responding.");
      console.log(error);
    }
  };

  return (
    <main className="party-page">
      <section className="party-hero">
        <h1>Celebrate Your Special Moments</h1>
        <p>
          Birthday • Anniversary • Engagement • Family Function • Corporate Event
        </p>
      </section>

      <section className="party-container">
        <div className="party-info">
          <h2>Why Book With Us?</h2>

          <div className="party-features">
            <div>🎉 Spacious Party Area</div>
            <div>🍽 Pure Veg Catering</div>
            <div>🚗 Large Parking</div>
            <div>👨‍👩‍👧 Family Friendly</div>
            <div>🎂 Birthday Decoration Support</div>
            <div>📍 Prime Highway Location</div>
          </div>
        </div>

        <form className="party-form" onSubmit={handleSubmit}>
          <h2>Book Your Event</h2>

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

          <select
            name="event"
            value={form.event}
            onChange={handleChange}
            required
          >
            <option value="">Select Event</option>
            <option>Birthday Party</option>
            <option>Anniversary</option>
            <option>Kitty Party</option>
            <option>Corporate Meeting</option>
            <option>Family Function</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={form.guests}
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

          <textarea
            name="message"
            placeholder="Additional Requirements"
            value={form.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Save & Book via WhatsApp</button>
        </form>
      </section>
    </main>
  );
}

export default PartyBooking;