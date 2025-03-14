import React, { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/ExpirationAlerts.css";

const ExpirationAlerts = () => {
  const { products } = useContext(InventoryContext);
  const today = new Date();

  const alerts = products.filter(product => {
    const expiryDate = new Date(product.expiry);
    const diffTime = expiryDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return (
    <div className="expiration-alerts container">
      <h2>Expiration Alerts</h2>
      {alerts.length === 0 ? (
        <p>No products nearing expiration.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              {alert.type} expires on {alert.expiry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpirationAlerts;
