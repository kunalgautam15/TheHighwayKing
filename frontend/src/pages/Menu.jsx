import { useState } from "react";
import "./Menu.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function Menu() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const foodItems = [
    { id: 1, name: "Paneer Butter Masala", price: 250, category: "Main Course" },
    { id: 2, name: "Kadhai Paneer", price: 220, category: "Main Course" },
    { id: 3, name: "Veg Biryani", price: 180, category: "Rice" },
    { id: 4, name: "Burger", price: 120, category: "Snacks" },
    { id: 5, name: "Pizza", price: 300, category: "Snacks" },
    { id: 6, name: "Cold Coffee", price: 90, category: "Beverages" },
  ];

  const categories = ["All", "Main Course", "Rice", "Snacks", "Beverages"];

  const filteredItems =
    activeCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem.id === item.id);

    if (exists) {
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
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <main className="menu-page">
      <section className="menu-hero">
        <span>PURE VEG MENU</span>
        <h1>Order Your Favourite Food</h1>
        <p>Fresh taste, premium ambience and highway vibes.</p>
      </section>

      <section className="menu-content">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-layout">
          <div className="menu-items">
            {filteredItems.map((item) => (
              <div className="menu-card" key={item.id}>
                <div>
                  <span className="veg-badge">● Pure Veg</span>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <strong>₹{item.price}</strong>
                </div>

                <button onClick={() => addToCart(item)}>Add</button>
              </div>
            ))}
          </div>

          <div className="cart-panel">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>

                  <div>
                    <strong>₹{item.price * item.quantity}</strong>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            <h3>Total: ₹{cartTotal}</h3>

            <div className="checkout-form">
              <input
                type="text"
                placeholder="Your Name"
                value={orderForm.customerName}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    customerName: e.target.value,
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
                    phone: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Delivery Address"
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    address: e.target.value,
                  })
                }
              ></textarea>

              <button onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Menu;