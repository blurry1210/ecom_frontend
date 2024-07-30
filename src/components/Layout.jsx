import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import { useAuth } from "../pages/login/AuthContext";
import "./Layout.css";

const Layout = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const isProfileOrFavoritesPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites");

  const isCartPage = location.pathname.startsWith("/cart");
  const isProductPage =
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/add-product");

  const isDistributorProfilePage =
    auth.user?.role === "distributor" &&
    (location.pathname.startsWith("/distributor") ||
      location.pathname.startsWith("/profile"));

  const layoutStyles = isProfileOrFavoritesPage
    ? { paddingTop: "15vh", paddingLeft: "15vw", boxSizing: "border-box" }
    : isCartPage || isProductPage
    ? { paddingTop: "15vh" }
    : {};

  return (
    <div style={layoutStyles}>
      <Header /> {/* Using Header component */}
      {children}
    </div>
  );
};

export default Layout;
