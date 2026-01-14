import React from "react";
import { orders } from "../data/demoData";

function Orders() {
  return (
    <div>
      <h2>All Orders</h2>

      <table className="food-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Table</th>
            <th>Items</th>
            <th>Total (৳)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.table}</td>
              <td>{order.items}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
