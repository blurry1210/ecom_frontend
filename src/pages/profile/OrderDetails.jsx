import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderDetails.less';

const OrderDetails = () => {
  const { orderId } = useParams();
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
        
        // Logging to ensure correct token and URL
        console.log('Fetching order with ID:', orderId);
        console.log('Using token:', token);

        const response = await axios.get(`http://localhost:3002/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Order response data:', response.data);
        
        const orderData = response.data;

        // Check if the order has items and products
        const itemsWithProduct = orderData.items.filter(item => {
          if (!item.product || !item.product._id) {
            console.error('Product ID is missing for item:', item);
            return false;
          }
          return true;
        });

        if (itemsWithProduct.length !== orderData.items.length) {
          setError('Some items in the order are missing product IDs');
          console.error('Some items in the order are missing product IDs:', orderData.items);
          setLoading(false);
          return;
        }

        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div className="order-info">
        <p>Order ID: {order._id}</p>
        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
        <p>Status: {order.items[0].status}</p>
        <p>Address: {order.address.addressLine}, {order.address.city}, {order.address.postalCode}, {order.address.country}</p>
        <p>Payment Method: {order.paymentMethod}</p>
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
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Status: {item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
