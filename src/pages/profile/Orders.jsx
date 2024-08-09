import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import OrderDetails from './OrderDetails';
import './Orders.less';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map(order => (
          <Link to={`${order._id}`} key={order._id} className="order-card">
            <div className="order-info">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            </div>
            <div className="order-items-preview">
              {order.items.slice(0, 3).map(item => (
                item.product && item.product.images && item.product.images[0] ? (
                  <img key={item.productId} src={`http://localhost:3001/${item.product.images[0]}`} alt={item.product.name} />
                ) : (
                  <p key={item.productId}>No Image Available</p>
                )
              ))}
            </div>
          </Link>
        ))}
      </div>
      <Routes>
        <Route path=":orderId" element={<OrderDetails />} />
      </Routes>
    </div>
  );
};

export default Orders;
