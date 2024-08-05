import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useCart } from "../Cart/CartContext";
import { useFavorites } from "../Favorite/FavoritesContext";
import TopBar from "../../components/TopBar/TopBar";
import ProfileMenu from "../../components/profilemenu/ProfileMenu"; // Import the ProfileMenu
import "./Favorite.css";

function FavoritesPage({ products = [] }) {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/favorites") ||
    location.pathname.startsWith("/cart");

  const pageStyles = isSpecialPage ? { boxSizing: "border-box" } : {};

  useEffect(() => {
    console.log("Favorites:", favorites);
    console.log("Products:", products);
  }, [favorites, products]);

  const favoriteProducts = products.filter((product) => {
    const isFavorite = favorites.includes(product._id);
    console.log(`Product ${product._id} is favorite:`, isFavorite);
    return isFavorite;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Produs adăugat în coș!");
  };

  const handleContinueShopping = () => {
    navigate(-1);
  };

  if (favoriteProducts.length === 0) {
    return (
      <div>
        <TopBar />
        <div className="favorites-page-container" style={pageStyles}>
          <ProfileMenu /> {/* Place ProfileMenu here */}
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
        <ProfileMenu /> {/* Place ProfileMenu here */}
        <div className="container-favorite">
          <h2 className="text-favorite">Favoritele tale</h2>
          <div className="grid-produse">
            {favoriteProducts.map((product) => (
              <div key={product._id} className="card-produs">
                <img
                  src={`http://localhost:5000/${product.images[0]}`}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <p className="pret">${product.price}</p>
                <div className="buttons-container">
                  <button onClick={() => handleAddToCart(product)}>Adaugă în coș</button>
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

FavoritesPage.propTypes = {
  products: PropTypes.array.isRequired,
};

export default FavoritesPage;
