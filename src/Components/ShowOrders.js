import React, { useEffect, useState, useRef } from "react";
import Ring from "../Audio/ring.mp3";
import { socket,sendUpdate } from "./Socket";
import "../Styles/ShowOrders.css";


function Orders() {
  const [newAdded, setNewAdded] = useState(false);
  const [startAuido, setStartAudio] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateloading, setupdateloading] = useState(false);
  const audioRef = useRef(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/all/orders");
      const data = await res.json();
      setOrders(data.orders || data);

      const ordersData = data.orders || [];
      setOrders(ordersData);
      console.log(ordersData)

      const shouldRing = ordersData.some(
        (order) =>
          order.status !== "ACCEPTED" ||
          order.items.some((item) => item.received === false),
      );

      setNewAdded(shouldRing);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //Socket
useEffect(() => {
  socket.on("orderSubmited", fetchOrders);

  return () => {
    socket.off("orderSubmited", fetchOrders);
  };
}, []);



  useEffect(() => {
    if (!audioRef.current) return;

    if (newAdded && startAuido) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [newAdded, startAuido]);

  const Refresh = () => {
    setStartAudio(true);
    fetchOrders();
  };

  const updateStatus = async (orderId, status,userId) => {
    setupdateloading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/update/order/status/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      const data = await res.json();
      if (data.success){ 
        fetchOrders()
        //socket
        sendUpdate(userId)
        console.log("userId:",userId)
      };
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setupdateloading(false);
    }
  };

  const updateNewAdded = async (orderId,userId) => {
    setupdateloading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/update/order/new/added/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await res.json();
      if (data.success) {
        fetchOrders()
        sendUpdate(userId)
      };
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
      <button onClick={Refresh}>Refresh</button>
      <audio ref={audioRef} src={Ring} loop />

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
                  <div
                    key={idx}
                    className={`item-row ${!item.received ? "new-item" : ""}`}
                  >
                    {item.foodId?.name} × {item.quantity}
                    {!item.received && <span className="badge-new">New</span>}
                  </div>
                ))}
              </td>

              <td>
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-price">
                    {item.foodId?.price} × {item.quantity} ={" "}
                    {item.foodId?.price * item.quantity}৳
                  </div>
                ))}
              </td>

              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>

              <td className="actions">
                <button
                  onClick={() => updateStatus(order._id, "ACCEPTED",order.userId)}
                  className="accept"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(order._id, "COMPLETED",order.userId)}
                  className="completed"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(order._id, "CANCELLED",order.userId)}
                  className="cancel"
                  disabled={updateloading}
                >
                  Cancel
                </button>
                {newAdded ? (
                  <button onClick={()=> updateNewAdded(order._id,order.userId)} className="cancel">New Items Added</button>
                ) : (
                  ""
                )}
              </td>

              <td>
                <button className="message">Message</button>
              </td>
              <td>
                <button className="voice">Voice</button>
              </td>
              <td>
                <button className="bill">Bill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
