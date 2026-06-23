import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const BACKEND_URL = "https://name-the-highway-king-backend.onrender.com";

function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter admin password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("highwayKingAdmin", "true");
        localStorage.setItem("highwayKingAdminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Wrong password. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Backend server is not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        <p>The Highway King Dashboard</p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          {error && <span className="admin-login-error">{error}</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;