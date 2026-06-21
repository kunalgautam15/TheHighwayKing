import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Visit The Highway King or connect with us directly.</p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <h2>The Highway King</h2>

          <p>📍 NH27 Jhansi–Kanpur Highway, Near Jio Petrol Pump, Parichha</p>
          <p>📞 +91 8960599978</p>
          <p>🕒 Open Daily: 6 AM - 1 AM</p>
          <p>🌿 Pure Veg Family Restaurant</p>

          <div className="contact-buttons">
            <a href="tel:8960599978">Call Now</a>

            <a
              href="https://wa.me/918960599978"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <a
              href="https://www.google.com/maps/place/the+highway+king/@25.5283894,78.7661171,17z/data=!3m1!4b1!4m6!3m5!1s0x397799cab1659d53:0x6516106ab80ebf14!8m2!3d25.5283895!4d78.770988!16s%2Fg%2F11z1vrsq5w"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="contact-card">
          <h2>Quick Enquiry</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              const name = e.target.name.value;
              const phone = e.target.phone.value;
              const message = e.target.message.value;

              const whatsappMessage =
                `📩 Website Enquiry\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Message: ${message}`;

              window.open(
                `https://wa.me/918960599978?text=${encodeURIComponent(
                  whatsappMessage
                )}`,
                "_blank"
              );
            }}
          >
            <input name="name" type="text" placeholder="Your Name" required />
            <input name="phone" type="tel" placeholder="Phone Number" required />
            <textarea
              name="message"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">Send On WhatsApp</button>
          </form>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          src="https://www.google.com/maps?q=25.5283895,78.770988&z=17&output=embed"
          width="100%"
          height="430"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="The Highway King Location"
        ></iframe>
      </section>
    </main>
  );
}

export default Contact;