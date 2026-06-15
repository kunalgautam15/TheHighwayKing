const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");
const tableBookingRoutes = require("./routes/tableBookingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/table-bookings", tableBookingRoutes);

app.get("/", (req, res) => {
  res.send("The Highway King Backend Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("✅ Server Running On Port 5000");
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });