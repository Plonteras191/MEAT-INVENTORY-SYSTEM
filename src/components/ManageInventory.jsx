import React, { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/ManageInventory.css";

const ManageInventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(InventoryContext);

  const [formData, setFormData] = useState({ type: "", weight: "", price: "", expiry: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, {
        ...formData,
        weight: Number(formData.weight),
        price: Number(formData.price),
      });
      setEditingId(null);
    } else {
      addProduct({
        ...formData,
        weight: Number(formData.weight),
        price: Number(formData.price),
      });
    }
    setFormData({ type: "", weight: "", price: "", expiry: "" });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      type: product.type,
      weight: product.weight,
      price: product.price,
      expiry: product.expiry,
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="manage-inventory container">
      <h2>Manage Inventory</h2>
      <form onSubmit={handleSubmit} className="inventory-form">
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (PHP)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiry"
          placeholder="Expiry Date"
          value={formData.expiry}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Weight (kg)</th>
            <th>Price (PHP)</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.type}</td>
              <td>{p.weight}</td>
              <td>{p.price}</td>
              <td>{p.expiry}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventory;
