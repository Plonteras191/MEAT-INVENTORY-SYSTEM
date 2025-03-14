import React, { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/SalesLogging.css";

const SalesLogging = () => {
  const { salesHistory } = useContext(InventoryContext);
  
  
  const totalSales = salesHistory.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="sales-logging container">
      <header className="sales-header">
        <h2>Total Sales</h2>
      </header>
      <div className="sales-summary-card">
        <h3>Total Sales (PHP)</h3>
        <p>₱{totalSales.toFixed(2)}</p>
      </div>
      {salesHistory.length > 0 && (
        <div className="sales-history">
          <h3>Sales History</h3>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sale Amount (PHP)</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map((sale) => (
                <tr key={sale.id}>
                  <td>{new Date(sale.date).toLocaleString()}</td>
                  <td>₱{sale.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesLogging;
