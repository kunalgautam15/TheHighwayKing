import "./App.css";
import logo from "./assets/logo.jpg.jpg";
import restaurant from "./assets/restaurant.webp.webp";
import { useState } from "react";

const BACKEND_URL =
  "https://name-the-highway-king-backend.onrender.com";

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
    {
      id: 1,
      name: "Paneer Butter Masala",
      price: 250,
    },

    {
      id: 2,
      name: "Kadhai Paneer",
      price: 220,
    },

    {
      id: 3,
      name: "Veg Biryani",
      price: 180,
    },

    {
      id: 4,
      name: "Burger",
      price: 120,
    },

    {
      id: 5,
      name: "Pizza",
      price: 300,
    },

    {
      id: 6,
      name: "Cold Coffee",
      price: 90,
    },
  ];

  const downloadMenu = () => {
    setMenuMessage("Menu will be available soon.");

    setTimeout(() => {
      setMenuMessage("");
    }, 3000);
  };

  const addToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
  };

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handlePartyBooking = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(partyForm),
        }
      );

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
          `https://wa.me/918960599978?text=${encodeURIComponent(
            message
          )}`,
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
      const response = await fetch(
        `${BACKEND_URL}/api/table-bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(tableForm),
        }
      );

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
          `https://wa.me/918960599978?text=${encodeURIComponent(
            message
          )}`,
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

    try {
      const orderData = {
        customerName: orderForm.customerName,
        phone: orderForm.phone,
        address: orderForm.address,
        items: cart,
        totalAmount: cartTotal,
      };

      const response = await fetch(
        `${BACKEND_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

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
          `https://wa.me/918960599978?text=${encodeURIComponent(
            message
          )}`,
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
    const response = await fetch(
      `${BACKEND_URL}/api/bookings`
    );

    const data = await response.json();

    setPartyBookings(data);
  };

  const getTableBookings = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/table-bookings`
    );

    const data = await response.json();

    setTableBookings(data);
  };

  const getOrders = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/orders`
    );

    const data = await response.json();

    setOrders(data);
  };

  const refreshAllBookings = () => {
    getPartyBookings();

    getTableBookings();

    getOrders();
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this order?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `${BACKEND_URL}/api/orders/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Order deleted successfully!");

      getOrders();
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
          <img
            src={logo}
            alt="The Highway King"
          />
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>

          <li>
            <a href="#menu">Menu</a>
          </li>

          <li>
            <a href="#order">Order</a>
          </li>

          <li>
            <a href="#party-booking">Party</a>
          </li>

          <li>
            <a href="#table-booking">Table</a>
          </li>

          <li>
            <a href="#admin">Admin</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <section
        id="home"
        className="hero"
        style={{
          backgroundImage: `url(${restaurant})`,
        }}
      >
        <div className="overlay">
          <h1>THE HIGHWAY KING</h1>

          <p className="tagline">
            Family Restaurant • Pure Veg • Party
            Booking
          </p>

          <p className="address">
            NH27 Jhansi–Kanpur Highway, Near
            Jio Petrol Pump, Parichha
          </p>

          <div className="buttons">
            <a
              href="https://wa.me/918960599978"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>

            <a href="tel:8960599978">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>
          Welcome To The Highway King
        </h2>

        <p>
          Family-friendly Pure Veg Restaurant
          with Party Booking Facilities,
          Delicious Food and Comfortable
          Dining Experience.
        </p>
      </section>

      <section
        id="menu"
        className="menu-section"
      >
        <h2>Our Restaurant Menu</h2>

        <p className="menu-text">
          Click below to download our
          complete food menu.
        </p>

        <a
          href="#menu"
          className="menu-download-btn"
          onClick={downloadMenu}
        >
          Download Menu PDF
        </a>

        {menuMessage && (
          <p className="menu-message">
            {menuMessage}
          </p>
        )}
      </section>

      <section
        id="order"
        className="order-section"
      >
        <h2>Online Food Ordering</h2>

        <div className="food-grid">
          {foodItems.map((item) => (
            <div
              className="food-card"
              key={item.id}
            >
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                onClick={() =>
                  addToCart(item)
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart-box">
          <h3>Your Cart</h3>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <span>
                  {item.name} x{" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>

                <button
                  onClick={() =>
                    removeFromCart(
                      item.id
                    )
                  }
                >
                  Remove
                </button>
              </div>
            ))
          )}

          <h3>Total: ₹{cartTotal}</h3>

          <div className="order-form">
            <input
              type="text"
              placeholder="Your Name"
              value={
                orderForm.customerName
              }
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  customerName:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={orderForm.phone}
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  phone:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Delivery Address"
              value={orderForm.address}
              onChange={(e) =>
                setOrderForm({
                  ...orderForm,
                  address:
                    e.target.value,
                })
              }
            ></textarea>

            <button
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;