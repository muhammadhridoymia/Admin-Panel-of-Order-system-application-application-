import React from "react";
import "../Styles/StatsBar.css"

const StatsBar = ({ stats }) => (
  <div className="dashboard-stats">
    <div className="stat-card">
      <div className="stat-label">Total Orders</div>
      <div className="stat-value">{stats.totalUsers}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Total Foods items</div>
      <div className="stat-value">{stats.totalCases}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Total Runing Orders</div>
      <div className="stat-value">{stats.totalCases}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Total Completed Orders</div>
      <div className="stat-value">{stats.totalCases}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Total Users</div>
      <div className="stat-value">{stats.totalCases}</div>
    </div>
  </div>
);

export default StatsBar;
