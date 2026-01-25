import React, { useEffect, useState } from "react";
import "../Styles/ShowOrders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateloading, setupdateloading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/all/orders");
      const data = await res.json();
      setOrders(data.orders || data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    setupdateloading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/update/order/status/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();
      if (data.success) fetchOrders();
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setupdateloading(false);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-container">
      <h2>All Orders</h2>

      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Items</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Message</th>
            <th>Voice</th>
            <th>Bill</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>

              <td>
                {order.items.map((item, idx) => (
                  <div key={idx} className={`item-row ${!item.received ? "new-item" : ""}`}>
                    {item.foodId?.name} × {item.quantity}
                    {!item.received && <span className="badge-new">New</span>}
                  </div>
                ))}
              </td>

              <td>
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-price">
                    {item.foodId?.price} × {item.quantity} = {item.foodId?.price * item.quantity}৳
                  </div>
                ))}
              </td>

              <td>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </td>

              <td className="actions">
                <button onClick={() => updateStatus(order._id, "ACCEPTED")} className="accept">Accept</button>
                <button onClick={() => updateStatus(order._id, "COMPLETED")} className="completed">Complete</button>
                <button onClick={() => updateStatus(order._id, "CANCELLED")} className="cancel" disabled={updateloading}>Cancel</button>
              </td>

              <td><button className="message">Message</button></td>
              <td><button className="voice">Voice</button></td>
              <td><button className="bill">Bill</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
