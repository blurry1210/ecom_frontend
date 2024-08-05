import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const location = useLocation();
  const { userId } = useParams();

  return (
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
  );
};

export default ProfileMenu;
