import React, { useEffect, useState } from "react";
import "../Styles/DailySales.css";

function DailySales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailySales();
  }, []);

  const fetchDailySales = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/daily/sales");
      const data = await res.json();
      if (data.success) {
        setSales(data.sales);
      }
    } catch (error) {
      console.error("Failed to fetch daily sales", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading daily sales...</p>;

  return (
    <div className="daily-sales-container">
      <h2>Daily Sales History</h2>

      <table className="daily-sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Orders</th>
            <th>Total Sales (৳)</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((day) => (
            <tr key={day._id}>
              <td>{day.date}</td>
              <td>{day.totalOrders}</td>
              <td>{day.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailySales;
