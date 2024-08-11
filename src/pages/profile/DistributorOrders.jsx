import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../login/AuthContext";
import "./DistributorOrders.less";

const DistributorOrders = ({ userId }) => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/orders/distributor/${auth.user.id}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching distributor orders:", error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth.user.id, auth.token]);

  const handleStatusUpdate = async (orderId, itemId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3002/api/orders/${orderId}/items/${itemId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, status: newStatus } : item
                ),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating item status:", error);
      setError("Failed to update item status");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="distributor-orders-container">
      <h2 className="order-text">Orders for Your Products</h2>
      {paginatedOrders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        paginatedOrders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Buyer:</strong> {order.address.firstName} {order.address.lastName}</p>
            <p><strong>Email:</strong> {order.address.email}</p>
            <p><strong>Phone:</strong> {order.address.phoneNumber}</p>
            <p><strong>Shipping Address:</strong> {order.address.addressLine}, {order.address.city}, {order.address.postalCode}, {order.address.country}</p>
            {order.items.map((item) => (
              <div key={item._id} className="order-item">
                <p className="order-item-label">Product:</p>
                <p>{item.product.name}</p>
                <p className="order-item-label">Quantity:</p>
                <p>{item.quantity}</p>
                <p className="order-item-label">Status:</p>
                <select
                  value={item.status}
                  onChange={(e) =>
                    handleStatusUpdate(order._id, item._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            ))}
          </div>
        ))
      )}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages).keys()].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DistributorOrders;
