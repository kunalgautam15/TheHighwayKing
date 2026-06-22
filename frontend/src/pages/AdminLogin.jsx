import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "highwayking@123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("highwayKingAdmin", "true");
      navigate("/admin");
    } else {
      setError("Wrong password. Please try again.");
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

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;