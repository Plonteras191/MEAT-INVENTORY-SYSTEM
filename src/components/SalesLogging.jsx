import React, { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/SalesLogging.css";

const SalesLogging = () => {
  const { salesHistory } = useContext(InventoryContext);
  
  const totalSales = salesHistory.reduce((sum, sale) => sum + sale.total, 0);
  
  return (
    <div className="sales-logging container">
      <h2>Total Sales</h2>
      <p style={{ fontSize: "1.5rem", textAlign: "center" }}>₱{totalSales.toFixed(2)}</p>
      {salesHistory.length > 0 && (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sale Amount (PHP)</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map(sale => (
              <tr key={sale.id}>
                <td>{new Date(sale.date).toLocaleString()}</td>
                <td>₱{sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesLogging;
