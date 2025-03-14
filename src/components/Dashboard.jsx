// src/components/Dashboard.jsx
import React, { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { products } = useContext(InventoryContext);

  // Calculate summary values
  const totalStock = products.reduce((acc, product) => acc + Number(product.weight), 0);
  const lowStockAlerts = products.filter(product => product.weight < 5).length;
  const today = new Date();
  const expirationWarnings = products.filter(product => {
    const expiryDate = new Date(product.expiry);
    const diffTime = expiryDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  }).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
      </header>
      <div className="cards-container">
        <div className="card">
          <h3>Total Stock (kg)</h3>
          <p>{totalStock}</p>
        </div>
        <div className="card">
          <h3>Low Stock Alerts</h3>
          <p>{lowStockAlerts} items</p>
        </div>
        <div className="card">
          <h3>Expiration Warnings</h3>
          <p>{expirationWarnings} items</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
