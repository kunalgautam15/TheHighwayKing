import { useState } from "react";
import "./TrackOrder.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function TrackOrder() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);

  const trackOrder = async () => {
    if (!phone) {
      alert("Please enter phone number.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/track/${phone}`);
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        alert("No order found.");
      }
    } catch (error) {
      alert("Unable to track order.");
      console.log(error);
    }
  };

  return (
    <main className="track-page">
      <section className="track-hero">
        <h1>Track Your Order</h1>
        <p>Enter your phone number to check your order status.</p>
      </section>

      <section className="track-container">
        <div className="track-box">
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={trackOrder}>Track Order</button>
        </div>

        <div className="track-results">
          {orders.length === 0 ? (
            <p className="no-order">No orders loaded yet.</p>
          ) : (
            orders.map((order) => (
              <div className="track-card" key={order._id}>
                <h3>{order.customerName}</h3>

                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="order-status">
                    {order.orderStatus || "New Order"}
                  </span>
                </p>

                <div className="track-items">
                  {order.items?.map((item, index) => (
                    <p key={index}>
                      {item.name} x {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default TrackOrder;