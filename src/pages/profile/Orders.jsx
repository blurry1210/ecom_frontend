import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Orders.less';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('User ID is missing');
    }
  }, [userId]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {currentOrders.map(order => (
          <div
            key={order._id}
            className="order-card"
            onClick={() => navigate(`/orders/${order._id}`)} 
          >
            <div className="order-info">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            </div>
            <div className="order-items-preview">
              {order.items.slice(0, 3).map(item => (
                item.product && item.product.images && item.product.images[0] ? (
                  <img key={item.productId} src={`http://localhost:3001/${item.product.images[0]}`} alt={item.product.name} />
                ) : null
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`page-number ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;
