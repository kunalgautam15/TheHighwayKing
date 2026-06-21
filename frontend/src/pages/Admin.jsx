import { useState } from "react";
import "./Admin.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function Admin() {
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [orders, setOrders] = useState([]);
  const [partyBookings, setPartyBookings] = useState([]);
  const [tableBookings, setTableBookings] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [menuForm, setMenuForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const totalRevenue = orders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  const loginAdmin = () => {
    if (adminPassword === "highwayking123") {
      setIsAdmin(true);
      refreshData();
    } else {
      alert("Incorrect admin password.");
    }
  };

  const refreshData = () => {
    getOrders();
    getPartyBookings();
    getTableBookings();
    getMenuItems();
  };

  const getOrders = async () => {
    const response = await fetch(`${BACKEND_URL}/api/orders`);
    const data = await response.json();
    setOrders(data);
  };

  const getPartyBookings = async () => {
    const response = await fetch(`${BACKEND_URL}/api/bookings`);
    const data = await response.json();
    setPartyBookings(data);
  };

  const getTableBookings = async () => {
    const response = await fetch(`${BACKEND_URL}/api/table-bookings`);
    const data = await response.json();
    setTableBookings(data);
  };

  const getMenuItems = async () => {
    const response = await fetch(`${BACKEND_URL}/api/menu`);
    const data = await response.json();

    if (data.success) {
      setMenuItems(data.items);
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BACKEND_URL}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...menuForm,
        price: Number(menuForm.price),
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Menu item added successfully!");

      setMenuForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });

      getMenuItems();
    } else {
      alert("Menu item was not added.");
    }
  };

  const deleteMenuItem = async (id) => {
    const confirmDelete = window.confirm("Delete this menu item?");
    if (!confirmDelete) return;

    const response = await fetch(`${BACKEND_URL}/api/menu/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Menu item deleted!");
      getMenuItems();
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
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
      alert("Order status updated!");
      getOrders();
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;

    const response = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Order deleted!");
      getOrders();
    }
  };

  const deletePartyBooking = async (id) => {
    const confirmDelete = window.confirm("Delete this party booking?");
    if (!confirmDelete) return;

    const response = await fetch(`${BACKEND_URL}/api/bookings/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Party booking deleted!");
      getPartyBookings();
    }
  };

  const deleteTableBooking = async (id) => {
    const confirmDelete = window.confirm("Delete this table booking?");
    if (!confirmDelete) return;

    const response = await fetch(`${BACKEND_URL}/api/table-bookings/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      alert("Table booking deleted!");
      getTableBookings();
    }
  };

  if (!isAdmin) {
    return (
      <main className="admin-page">
        <section className="admin-login-box">
          <h1>Admin Login</h1>
          <p>Only restaurant owner or staff can access this panel.</p>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />

          <button onClick={loginAdmin}>Login</button>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <span>THE HIGHWAY KING</span>
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-actions">
          <button onClick={refreshData}>Refresh Data</button>
          <button onClick={() => setIsAdmin(false)}>Logout</button>
        </div>
      </section>

      <section className="admin-stats">
        <div>
          <h2>{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div>
          <h2>₹{totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div>
          <h2>{partyBookings.length}</h2>
          <p>Party Bookings</p>
        </div>

        <div>
          <h2>{tableBookings.length}</h2>
          <p>Table Bookings</p>
        </div>
      </section>

      <section className="admin-section">
        <h2>Add Menu Item</h2>

        <form className="admin-menu-form" onSubmit={addMenuItem}>
          <input
            type="text"
            placeholder="Dish Name"
            value={menuForm.name}
            onChange={(e) =>
              setMenuForm({
                ...menuForm,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={menuForm.price}
            onChange={(e) =>
              setMenuForm({
                ...menuForm,
                price: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={menuForm.category}
            onChange={(e) =>
              setMenuForm({
                ...menuForm,
                category: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Image URL optional"
            value={menuForm.image}
            onChange={(e) =>
              setMenuForm({
                ...menuForm,
                image: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description optional"
            value={menuForm.description}
            onChange={(e) =>
              setMenuForm({
                ...menuForm,
                description: e.target.value,
              })
            }
          ></textarea>

          <button type="submit">Add Dish</button>
        </form>
      </section>

      <section className="admin-section">
        <h2>Menu Items</h2>

        <div className="admin-grid">
          {menuItems.length === 0 ? (
            <p className="empty-admin">No menu items added yet.</p>
          ) : (
            menuItems.map((item) => (
              <div className="admin-card" key={item._id}>
                <h3>{item.name}</h3>
                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>{item.description}</p>

                <button
                  className="danger-btn"
                  onClick={() => deleteMenuItem(item._id)}
                >
                  Delete Dish
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="admin-section">
        <h2>Online Orders</h2>

        <div className="admin-grid">
          {orders.length === 0 ? (
            <p className="empty-admin">No orders loaded.</p>
          ) : (
            orders.map((order) => (
              <div className="admin-card" key={order._id}>
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
                  <strong>Status:</strong> {order.orderStatus || "New Order"}
                </p>

                <select
                  value={order.orderStatus || "New Order"}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option>New Order</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

                <div className="admin-items">
                  {order.items?.map((item, index) => (
                    <p key={index}>
                      {item.name} x {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                  ))}
                </div>

                <button
                  className="danger-btn"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete Order
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="admin-section">
        <h2>Party Bookings</h2>

        <div className="admin-grid">
          {partyBookings.length === 0 ? (
            <p className="empty-admin">No party bookings loaded.</p>
          ) : (
            partyBookings.map((booking) => (
              <div className="admin-card" key={booking._id}>
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

                <button
                  className="danger-btn"
                  onClick={() => deletePartyBooking(booking._id)}
                >
                  Delete Booking
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="admin-section">
        <h2>Table Bookings</h2>

        <div className="admin-grid">
          {tableBookings.length === 0 ? (
            <p className="empty-admin">No table bookings loaded.</p>
          ) : (
            tableBookings.map((booking) => (
              <div className="admin-card" key={booking._id}>
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

                <button
                  className="danger-btn"
                  onClick={() => deleteTableBooking(booking._id)}
                >
                  Delete Booking
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Admin;