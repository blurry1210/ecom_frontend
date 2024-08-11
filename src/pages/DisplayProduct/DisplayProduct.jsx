import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorite/FavoritesContext";
import "./DisplayProduct.css";
import { useNotification } from "../../components/notifications/NotificationContext";

function DisplayProducts({ products, setProducts }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 20;
  const showNotification = useNotification();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / PRODUCTS_PER_PAGE));
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleAddToCart = (product) => {
    if (product.quantity === 0) {
      showNotification("This product is out of stock!", "error");
      return;
    }
    addToCart(product);
    showNotification("Item added to cart!", "success");
  };

  const handleToggleFavorite = (product) => {
    toggleFavorite(product._id);
    const isFavorite = favorites.includes(product._id);
    showNotification(
      isFavorite ? "Item removed from favorites!" : "Item added to favorites!",
      "info"
    );
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    window.scrollTo(0, 0); 
  };

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p>No products found. Please adjust your filters or try again later.</p>
    );
  }

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="products-container">
        {currentProducts.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/product/${product._id}`}>
              <img
                src={`http://localhost:3001/${product.images[0]}`}
                alt={product.name}
              />
              <h2>{product.name}</h2>
            </Link>
            <p className="category"> {product.category}</p>
            <p className="price">${product.price}</p>
            <div className="buttons">
              <button 
                onClick={product.quantity > 0 ? () => handleAddToCart(product) : null}
                disabled={product.quantity === 0} 
                style={{
                  backgroundColor: product.quantity === 0 ? '#ccc' : '#007bff', 
                  cursor: product.quantity === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <span
                onClick={() => handleToggleFavorite(product)}
                className={`favorite-icon fa fa-heart ${favorites.includes(product._id) ? 'active' : ''}`}
              ></span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-buttons">
        <button
          className="pagePrevButton"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pageNextButton"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default DisplayProducts;
