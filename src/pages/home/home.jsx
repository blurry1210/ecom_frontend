import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button";
import { useAuth } from "../login/AuthContext";
import DisplayProducts from "../DisplayProduct/DisplayProduct";
import FilterComponent from "../../components/filter/FilterComponent";
import ErrorBoundary from "../../components/ErrorBoundary";
import { useProducts } from "../../components/hooks/useProducts";

const Home = () => {
  const { products, setProducts } = useProducts();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth Object:", auth);
    if (auth.isLoggedIn) {
      console.log("User is logged in:", auth.user);
      if (auth.user) {
        console.log("User role:", auth.user.role);
      }
    }
  }, [auth]);

  const handleCategorySelect = async (category, subcategory) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/filter?category=${category}&subcategory=${subcategory}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const filteredProducts = await response.json();
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">TEHNOLOGIA LA ÎNDEMÂNĂ</h1>
          <p className="hero-subtitle">Găsește cele mai noi gadgeturi și echipamente tech, toate într-un singur loc!</p>
          <Button className="hero-button" onClick={() => navigate("/products")}>
            Vezi Produsele
          </Button>
        </div>
      </div>
      <div className="content-container">
        <div className="navigation-container">
          <Navbar />
          <FilterComponent setProducts={setProducts} />
        </div>
        <ErrorBoundary>
          <div className="display-products-container">
            <DisplayProducts products={products} setProducts={setProducts} />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Home;
