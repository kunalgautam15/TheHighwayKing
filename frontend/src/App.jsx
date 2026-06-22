import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedAdmin from "./components/ProtectedAdmin";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import PartyBooking from "./pages/PartyBooking";
import TableBooking from "./pages/TableBooking";
import TrackOrder from "./pages/TrackOrder";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/party-booking" element={<PartyBooking />} />

        <Route path="/table-booking" element={<TableBooking />} />

        <Route path="/track-order" element={<TrackOrder />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;