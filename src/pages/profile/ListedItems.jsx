import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListedItems.less";

const ListedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(
          `http://localhost:3001/api/products/distributor-products`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError("Error fetching items");
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, []);
  

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/products/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listed-items-container">
      <div className="products-container">
        {items.map((item) => (
          <div key={item._id} className="product-card">
            <Link to={`/edit-item/${item._id}`}>
              <img
                src={`http://localhost:3001/${item.images[0]}`}
                alt={item.name}
              />
              <h2>{item.name}</h2>
            </Link>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="item-controls">
              <Link to={`/edit-item/${item._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListedItems;
