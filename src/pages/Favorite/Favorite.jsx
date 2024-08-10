import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorite/FavoritesContext";
import ProfileMenu from "../../components/profilemenu/ProfileMenu"; 
import "./Favorite.css";

function FavoritesPage() {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSpecialPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites") ||
    location.pathname.startsWith("/cart");

  const pageStyles = isSpecialPage ? { boxSizing: "border-box" } : {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = products.filter((product) => {
    return favorites.includes(product._id);
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Produs adăugat în coș!");
  };

  const handleContinueShopping = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (favoriteProducts.length === 0) {
    return (
      <div>
        <div className="favorites-page-container" style={pageStyles}>
          <ProfileMenu />
          <div className="container-favorite">
            <p className="mesaj-niciun-favorit">Nu ați adăugat niciun favorit.</p>
            <button
              onClick={handleContinueShopping}
              className="buton-continua-cumparaturile"
            >
              Înapoi la cumpărături
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="favorites-page-container" style={pageStyles}>
        <ProfileMenu />
        <div className="container-favorite">
          <h2 className="text-favorite">Favoritele tale</h2>
          <div className="grid-produse">
            {favoriteProducts.map((product) => (
              <div key={product._id} className="card-produs">
                <img
                  src={`http://localhost:3001/${product.images[0]}`}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <p className="pret">${product.price}</p>
                <div className="buttons-container">
                  <button onClick={() => handleAddToCart(product)}>
                    Adaugă în coș
                  </button>
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="buton-elimina-favorit"
                  >
                    Elimină din favorite
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleContinueShopping}
            className="buton-continua-cumparaturile"
          >
            Înapoi la cumpărături
          </button>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
