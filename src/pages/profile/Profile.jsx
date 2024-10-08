import React from "react";
import { Link, Routes, Route, useLocation, useParams } from "react-router-dom";
import Orders from "./Orders";
import CartPage from "../Cart/Cart";
import FavoritesPage from "../Favorite/Favorite";
import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/navbar/Navbar";
import "./Profile.css";

const Profile = ({ user }) => {
  const location = useLocation();
  const { userId } = useParams();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="profile-container">
        <div className="menu">
          <ol>
            <li
              className={
                location.pathname === `/profile/${userId}/orders` ? "active" : ""
              }
            >
              <Link to={`/profile/${userId}/orders`}>Orders</Link>
            </li>
            <li className={location.pathname === `/cart` ? "active" : ""}>
              <Link to={`/cart`}>Cart</Link>
            </li>
            <li className={location.pathname === `/favorites` ? "active" : ""}>
              <Link to={`/favorites`}>Favorites</Link>
            </li>
          </ol>
        </div>
        <div className="profile-content">
          <div className="profile-details">
            <h1>My Account</h1>
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
          </div>
          <Routes>
            <Route path="orders/*" element={<Orders userId={user.id} />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Profile;
