import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.less';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token, authorization denied');
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`http://localhost:3002/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrder(response.data);
      } catch (error) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleBackToOrders = () => {
    navigate(-1);  
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="orders-container">
      <h2>Order Details</h2>
      <div className="order-info">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Status:</strong> {order.items[0].status}</p>
        <p><strong>Address:</strong> {order.address.addressLine}, {order.address.city}, {order.address.postalCode}, {order.address.country}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      </div>
      <div className="order-items-list">
        {order.items.map(item => (
          <div key={item.product._id} className="order-item">
            {item.product && item.product.images && item.product.images[0] ? (
              <img src={`http://localhost:3001/${item.product.images[0]}`} alt={item.product.name} />
            ) : (
              <p>No Image Available</p>
            )}
            <div className="order-item-info">
              <h3>{item.product.name}</h3>
              <p><strong>Price:</strong> ${item.product.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Status:</strong> {item.status}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="back-to-orders-button" onClick={handleBackToOrders}>
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
