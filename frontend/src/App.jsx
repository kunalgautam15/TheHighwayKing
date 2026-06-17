import "./App.css";
import logo from "./assets/logo.jpg.jpg";
import restaurant from "./assets/restaurant.webp.webp";
import { useState } from "react";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

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

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const [partyBookings, setPartyBookings] = useState([]);
  const [tableBookings, setTableBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuMessage, setMenuMessage] = useState("");
  const [cart, setCart] = useState([]);

  const foodItems = [
    { id: 1, name: "Paneer Butter Masala", price: 250 },
    { id: 2, name: "Kadhai Paneer", price: 220 },
    { id: 3, name: "Veg Biryani", price: 180 },
    { id: 4, name: "Burger", price: 120 },
    { id: 5, name: "Pizza", price: 300 },
    { id: 6, name: "Cold Coffee", price: 90 },
  ];

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalRevenue = orders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  const downloadMenu = () => {
    setMenuMessage("Menu will be available soon.");
    setTimeout(() => setMenuMessage(""), 3000);
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handlePartyBooking = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const response = await fetch(`${BACKEND_URL}/api/table-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!orderForm.customerName || !orderForm.phone || !orderForm.address) {
      alert("Please fill all order details.");
      return;
    }

    try {
      const orderData = {
        customerName: orderForm.customerName,
        phone: orderForm.phone,
        address: orderForm.address,
        items: cart,
        totalAmount: cartTotal,
      };

      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully!");

        const message =
          `🛒 New Food Order\n\n` +
          `Name: ${orderForm.customerName}\n` +
          `Phone: ${orderForm.phone}\n` +
          `Address: ${orderForm.address}\n\n` +
          `Items:\n` +
          cart
            .map(
              (item) =>
                `${item.name} x ${item.quantity} = ₹${
                  item.price * item.quantity
                }`
            )
            .join("\n") +
          `\n\nTotal: ₹${cartTotal}`;

        window.open(
          `https://wa.me/918960599978?text=${encodeURIComponent(message)}`,
          "_blank"
        );

        setCart([]);
        setOrderForm({
          customerName: "",
          phone: "",
          address: "",
        });
      } else {
        alert("Order was not placed.");
      }
    } catch (error) {
      alert("Backend server is not responding.");
      console.log(error);
    }
  };

  const getPartyBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings`);
      const data = await response.json();
      setPartyBookings(data);
    } catch (error) {
      alert("Party bookings are not loading.");
      console.log(error);
    }
  };

  const getTableBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/table-bookings`);
      const data = await response.json();
      setTableBookings(data);
    } catch (error) {
      alert("Table bookings are not loading.");
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      alert("Orders are not loading.");
      console.log(error);
    }
  };

  const refreshAllBookings = () => {
    getPartyBookings();
    getTableBookings();
    getOrders();
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order status updated successfully!");
        getOrders();
      } else {
        alert("Order status was not updated.");
      }
    } catch (error) {
      alert("Status update request failed.");
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this order?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Order deleted successfully!");
        getOrders();
      } else {
        alert("Order was not deleted.");
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
          <li><a href="#order">Order</a></li>
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
            <a
              href="https://wa.me/918960599978"
              target="_blank"
              rel="noreferrer"
            >
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

        <a href="#menu" className="menu-download-btn" onClick={downloadMenu}>
          Download Menu PDF
        </a>

        {menuMessage && <p className="menu-message">{menuMessage}</p>}
      </section>

      <section id="order" className="order-section">
        <h2>Online Food Ordering</h2>

        <div className="food-grid">
          {foodItems.map((item) => (
            <div className="food-card" key={item.id}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="cart-box">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))
          )}

          <h3>Total: ₹{cartTotal}</h3>

          <div className="order-form">
            <input
              type="text"
              placeholder="Your Name"
              value={orderForm.customerName}
              onChange={(e) =>
                setOrderForm({ ...orderForm, customerName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={orderForm.phone}
              onChange={(e) =>
                setOrderForm({ ...orderForm, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Delivery Address"
              value={orderForm.address}
              onChange={(e) =>
                setOrderForm({ ...orderForm, address: e.target.value })
              }
            ></textarea>

            <button onClick={placeOrder}>Place Order</button>
          </div>
        </div>
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

      <section className="map-section">
        <h2>Find Us On Map 📍</h2>

        <iframe
          src="https://www.google.com/maps?q=25.5283895,78.770988&z=17&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="The Highway King Location"
        ></iframe>

        <br />
        <br />

        <a
          href="https://www.google.com/maps/place/the+highway+king/@25.5283894,78.7661171,17z/data=!3m1!4b1!4m6!3m5!1s0x397799cab1659d53:0x6516106ab80ebf14!8m2!3d25.5283895!4d78.770988!16s%2Fg%2F11z1vrsq5w"
          target="_blank"
          rel="noreferrer"
          className="map-btn"
        >
          Open in Google Maps
        </a>
      </section>

      <section className="google-review-section">
        <h2>Love Our Food? ⭐</h2>

        <p>
          Your review helps us grow and serve you better. Share your experience
          on Google.
        </p>

        <a
          href="https://g.page/r/CRS_DrhqEBZlEBM/review"
          target="_blank"
          rel="noreferrer"
          className="review-btn"
        >
          ⭐ Rate Us On Google
        </a>
      </section>

      <section id="admin" className="admin-section">
        <h2>Admin Panel</h2>

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
              Refresh Data
            </button>

            <button className="logout-btn" onClick={() => setIsAdmin(false)}>
              Logout
            </button>

            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>

              <div className="stat-card">
                <h3>{partyBookings.length}</h3>
                <p>Party Bookings</p>
              </div>

              <div className="stat-card">
                <h3>{tableBookings.length}</h3>
                <p>Table Bookings</p>
              </div>

              <div className="stat-card">
                <h3>₹{totalRevenue}</h3>
                <p>Total Revenue</p>
              </div>
            </div>

            <h3 className="admin-subtitle">Online Orders</h3>

            <div className="booking-list">
              {orders.length === 0 ? (
                <p>No orders loaded yet.</p>
              ) : (
                orders.map((order) => (
                  <div className="booking-card" key={order._id}>
                    <h3>{order.customerName}</h3>

                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>

                    <p>
                      <strong>Address:</strong> {order.address}
                    </p>

                    <p>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {order.orderStatus || "New Order"}
                    </p>

                    <select
                      value={order.orderStatus || "New Order"}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="New Order">New Order</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {order.items.map((item, index) => (
                      <p key={index}>
                        {item.name} x {item.quantity} = ₹
                        {item.price * item.quantity}
                      </p>
                    ))}

                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete Order
                    </button>
                  </div>
                ))
              )}
            </div>

            <h3 className="admin-subtitle">Party Bookings</h3>

            <div className="booking-list">
              {partyBookings.length === 0 ? (
                <p>No party bookings loaded yet.</p>
              ) : (
                partyBookings.map((booking) => (
                  <div className="booking-card" key={booking._id}>
                    <h3>{booking.name}</h3>
                    <p>
                      <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p>
                      <strong>Event:</strong> {booking.event}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Guests:</strong> {booking.guests}
                    </p>
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
                    <p>
                      <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p>
                      <strong>Guests:</strong> {booking.guests}
                    </p>
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