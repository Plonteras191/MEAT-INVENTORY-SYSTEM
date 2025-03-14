import React, { useContext, useState } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/PointOfSales.css";

const PointOfSales = () => {
  const { products, updateProduct, addSale } = useContext(InventoryContext);
  const [cart, setCart] = useState([]); 

  const handleAddToCart = (product) => {
    const qtyStr = prompt(`Enter quantity (kg) to sell for ${product.type}:`, "1");
    const qty = parseFloat(qtyStr);
    if (!isNaN(qty) && qty > 0) {
      if (qty > product.weight) {
        alert(`Not enough stock for ${product.type}. Available: ${product.weight} kg`);
        return;
      }
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        ));
      } else {
        setCart([...cart, { id: product.id, type: product.type, quantity: qty, price: product.price }]);
      }
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const completeSale = () => {
    if (cart.length === 0) {
      alert("No sold products!");
      return;
    }
    
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const newWeight = product.weight - item.quantity;
        if (newWeight < 0) {
          alert(`Error: Negative stock for ${product.type}`);
        } else {
          updateProduct(item.id, {
            type: product.type,
            weight: newWeight,
            price: product.price,
            expiry: product.expiry,
          });
        }
      }
    });
  
    addSale({ total: totalAmount, date: new Date() });
    alert(`Sale completed! Total amount: ₱${totalAmount.toFixed(2)}`);
    setCart([]);
  };

  return (
    <div className="pos-container container">
      <h2>Point of Sales</h2>
      <div className="pos-content">
        <div className="pos-products">
          <h3>Products</h3>
          <table className="pos-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Available (kg)</th>
                <th>Price (₱/kg)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.type}</td>
                  <td>{product.weight}</td>
                  <td>{product.price}</td>
                  <td>
                    <button onClick={() => handleAddToCart(product)}>Sold</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sold-products">
          <h3>Sold Products</h3>
          {cart.length === 0 ? (
            <p>No products sold yet.</p>
          ) : (
            <table className="pos-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Quantity (kg)</th>
                  <th>Price (₱/kg)</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{(item.quantity * item.price).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                    Total:
                  </td>
                  <td colSpan="2" style={{ fontWeight: "bold" }}>
                    ₱{totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <button className="complete-sale" onClick={completeSale}>
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default PointOfSales;
