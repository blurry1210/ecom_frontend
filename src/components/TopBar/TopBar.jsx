import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../button/Button";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../pages/login/AuthContext";
import { useNotification } from "../notifications/NotificationContext";
import "./TopBar.css"; // Custom styles

const TopBar = ({ setProducts }) => {
  const { auth, setAuth } = useAuth();
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null, token: null });
    localStorage.removeItem("token");
    showNotification("Logged out successfully!", "info");
    navigate("/login");
  };

  const handleAddProductClick = () => {
    if (!auth.isLoggedIn) {
      navigate("/login");
    } else if (auth.user && auth.user.role === "distributor") {
      navigate("/add-product");
    }
  };

  return (
    <nav className="top-bar navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <SearchBar setProducts={setProducts} />
        <Link to="/products" className="navbar-brand">
          TechHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTopBar"
          aria-controls="navbarTopBar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTopBar">
          <ul className="navbar-nav ms-auto">
            {auth.isLoggedIn && auth.user ? (
              <li className="nav-item dropdown high-zindex-dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownAccount"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </a>
                <ul className="dropdown-menu high-zindex-dropdown-menu" aria-labelledby="navbarDropdownAccount">
                  <li>
                    <Link to={`/profile/${auth.user.id}`} className="dropdown-item">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  My Account
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </li>
            {auth.isLoggedIn && auth.user && auth.user.role === "distributor" && (
              <li className="nav-item">
                <Button className="btn btn-primary" onClick={handleAddProductClick}>
                  Add Product
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
