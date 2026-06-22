import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function Admin() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [partyBookings, setPartyBookings] = useState([]);
  const [tableBookings, setTableBookings] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  const [menuForm, setMenuForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "",
    image: "",
  });

  const totalRevenue = orders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0
  );

  useEffect(() => {
    refreshData();
  }, []);

  const logoutAdmin = () => {
    localStorage.removeItem("highwayKingAdmin");
    navigate("/admin-login");
  };

  const refreshData = async () => {
    setLoading(true);

    await Promise.all([
      getOrders(),
      getPartyBookings(),
      getTableBookings(),
      getMenuItems(),
      getGalleryImages(),
    ]);

    setLoading(false);
  };

  const getOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Orders loading failed:", error);
      setOrders([]);
    }
  };

  const getPartyBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings`);
      const data = await response.json();
      setPartyBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Party bookings loading failed:", error);
      setPartyBookings([]);
    }
  };

  const getTableBookings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/table-bookings`);
      const data = await response.json();
      setTableBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Table bookings loading failed:", error);
      setTableBookings([]);
    }
  };

  const getMenuItems = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/menu`);
      const data = await response.json();

      if (data.success) {
        setMenuItems(data.items || []);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.log("Menu loading failed:", error);
      setMenuItems([]);
    }
  };

  const getGalleryImages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery`);
      const data = await response.json();

      if (data.success) {
        setGalleryImages(data.images || []);
      } else {
        setGalleryImages([]);
      }
    } catch (error) {
      console.log("Gallery loading failed:", error);
      setGalleryImages([]);
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();

    if (!menuForm.name || !menuForm.price || !menuForm.category) {
      alert("Dish name, price and category are required.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: menuForm.name.trim(),
          price: Number(menuForm.price),
          category: menuForm.category.trim(),
          description: menuForm.description.trim(),
          image: menuForm.image.trim(),
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
        alert(data.message || "Menu item was not added.");
      }
    } catch (error) {
      alert("Unable to add menu item.");
      console.log(error);
    }
  };

  const deleteMenuItem = async (id) => {
    const confirmDelete = window.confirm("Delete this menu item?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/menu/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Menu item deleted!");
        getMenuItems();
      } else {
        alert(data.message || "Menu item was not deleted.");
      }
    } catch (error) {
      alert("Unable to delete menu item.");
      console.log(error);
    }
  };

  const addGalleryImage = async (e) => {
    e.preventDefault();

    if (!galleryForm.title || !galleryForm.image) {
      alert("Gallery title and image URL are required.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: galleryForm.title.trim(),
          category: galleryForm.category.trim() || "Restaurant",
          image: galleryForm.image.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Gallery image added successfully!");

        setGalleryForm({
          title: "",
          category: "",
          image: "",
        });

        getGalleryImages();
      } else {
        alert(data.message || "Gallery image was not added.");
      }
    } catch (error) {
      alert("Unable to add gallery image.");
      console.log(error);
    }
  };

  const deleteGalleryImage = async (id) => {
    const confirmDelete = window.confirm("Delete this gallery image?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Gallery image deleted!");
        getGalleryImages();
      } else {
        alert(data.message || "Gallery image was not deleted.");
      }
    } catch (error) {
      alert("Unable to delete gallery image.");
      console.log(error);
    }
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
        getOrders();
      } else {
        alert(data.message || "Order status was not updated.");
      }
    } catch (error) {
      alert("Unable to update order status.");
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Delete this order?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Order deleted!");
        getOrders();
      } else {
        alert(data.message || "Order was not deleted.");
      }
    } catch (error) {
      alert("Unable to delete order.");
      console.log(error);
    }
  };

  const deletePartyBooking = async (id) => {
    const confirmDelete = window.confirm("Delete this party booking?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Party booking deleted!");
        getPartyBookings();
      } else {
        alert(data.message || "Party booking was not deleted.");
      }
    } catch (error) {
      alert("Unable to delete party booking.");
      console.log(error);
    }
  };

  const deleteTableBooking = async (id) => {
    const confirmDelete = window.confirm("Delete this table booking?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/table-bookings/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        alert("Table booking deleted!");
        getTableBookings();
      } else {
        alert(data.message || "Table booking was not deleted.");
      }
    } catch (error) {
      alert("Unable to delete table booking.");
      console.log(error);
    }
  };

  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <span>THE HIGHWAY KING</span>
          <h1>Admin Dashboard</h1>
          <p>Manage orders, bookings, menu and gallery from one place.</p>
        </div>

        <div className="admin-actions">
          <button onClick={refreshData}>
            {loading ? "Loading..." : "Refresh Data"}
          </button>

          <button onClick={logoutAdmin}>Logout</button>
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

        <div>
          <h2>{menuItems.length}</h2>
          <p>Menu Items</p>
        </div>

        <div>
          <h2>{galleryImages.length}</h2>
          <p>Gallery Images</p>
        </div>
      </section>

      <section className="admin-tabs">
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Online Orders
        </button>

        <button
          className={activeTab === "party" ? "active" : ""}
          onClick={() => setActiveTab("party")}
        >
          Party Bookings
        </button>

        <button
          className={activeTab === "table" ? "active" : ""}
          onClick={() => setActiveTab("table")}
        >
          Table Bookings
        </button>

        <button
          className={activeTab === "menu" ? "active" : ""}
          onClick={() => setActiveTab("menu")}
        >
          Menu Management
        </button>

        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Gallery Management
        </button>
      </section>

      {activeTab === "orders" && (
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
                    <strong>Status:</strong>{" "}
                    <span className="status-pill">
                      {order.orderStatus || "New Order"}
                    </span>
                  </p>

                  <select
                    value={order.orderStatus || "New Order"}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
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
      )}

      {activeTab === "party" && (
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

                  {booking.message && (
                    <p>
                      <strong>Message:</strong> {booking.message}
                    </p>
                  )}

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
      )}

      {activeTab === "table" && (
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

                  {booking.message && (
                    <p>
                      <strong>Message:</strong> {booking.message}
                    </p>
                  )}

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
      )}

      {activeTab === "menu" && (
        <>
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
                    {item.image && <img src={item.image} alt={item.name} />}

                    <h3>{item.name}</h3>

                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>

                    <p>
                      <strong>Category:</strong> {item.category}
                    </p>

                    {item.description && <p>{item.description}</p>}

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
        </>
      )}

      {activeTab === "gallery" && (
        <>
          <section className="admin-section">
            <h2>Add Gallery Image</h2>

            <form className="admin-menu-form" onSubmit={addGalleryImage}>
              <input
                type="text"
                placeholder="Image Title"
                value={galleryForm.title}
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    title: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Category e.g. Food, Ambience"
                value={galleryForm.category}
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    category: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Image URL"
                value={galleryForm.image}
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    image: e.target.value,
                  })
                }
                required
              />

              <button type="submit">Add Image</button>
            </form>
          </section>

          <section className="admin-section">
            <h2>Gallery Images</h2>

            <div className="admin-grid">
              {galleryImages.length === 0 ? (
                <p className="empty-admin">
                  No gallery images added from admin yet.
                </p>
              ) : (
                galleryImages.map((item) => (
                  <div className="admin-card" key={item._id}>
                    <img src={item.image} alt={item.title} />

                    <h3>{item.title}</h3>

                    <p>
                      <strong>Category:</strong>{" "}
                      {item.category || "Restaurant"}
                    </p>

                    <button
                      className="danger-btn"
                      onClick={() => deleteGalleryImage(item._id)}
                    >
                      Delete Image
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Admin;