const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const tableBookingRoutes = require("./routes/tableBookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://the-highway-king-iota.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/table-bookings", tableBookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
  res.send("The Highway King Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`✅ Server Running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });