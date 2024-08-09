import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/button/Button";
import TopBar from "../../components/TopBar/TopBar"; // Import TopBar
import { useAuth } from "./AuthContext";
import { useNotification } from "../../components/notifications/NotificationContext";
import "./login.css";  // Ensure this points to your CSS file

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const showNotification = useNotification();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      console.log("Login successful:", response.data);

      const userId = response.data.user.id;
      console.log("Fetched userId:", userId);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", userId);
      console.log("Stored userId:", localStorage.getItem("userId"));

      setAuth({
        isLoggedIn: true,
        user: response.data.user,
        token: response.data.token,
      });

      showNotification("Login successful!", "success");

      if (response.data.user.role === "distributor") {
        navigate(`/products`);
      } else {
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login, please check your credentials and try again.");

      showNotification(
        "Failed to login, please check your credentials and try again.",
        "error"
      );
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Login To Your Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form autoComplete="off" onSubmit={login}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="btn btn-primary btn-block">Login</Button>
            </form>
            <div className="text-center mt-3">
              <Link to="/login/forgot_password">Forgot Your Password?</Link>
            </div>
            <div className="text-center mt-3">
              <span>You don't have an account?</span>
              <Link to="/account/register">Create One</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
