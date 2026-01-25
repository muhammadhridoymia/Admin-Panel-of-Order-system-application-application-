import React, { useEffect, useState } from "react";
import "../Styles/OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/completed/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch completed orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order history...</p>;

  return (
    <div className="history-container">
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No completed orders yet.</p>
      ) : (
        <div className="history-list">
          {orders.map((order) => (
            <div key={order._id} className="history-card">
              <div className="card-header">
                <div className="user-name">{order.name}</div>
                <div className="order-date">{new Date(order.orderedAt).toLocaleString()}</div>
                <span className="status completed">{order.status}</span>
              </div>

              <div className="card-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="card-item">
                    <div className="item-name">{item.foodId?.name}</div>
                    <div className="item-quantity">× {item.quantity}</div>
                    <div className="item-total">{item.foodId?.price * item.quantity}৳</div>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <div className="total">
                  Total:{" "}
                  {order.items.reduce(
                    (sum, item) => sum + item.foodId?.price * item.quantity,
                    0
                  )}{" "}
                  ৳
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
