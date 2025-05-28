import React, { useState } from "react";
import axios from "axios";

const ProductRegistration = () => {
  const [formData, setFormData] = useState({ name: "", price: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.price || isNaN(formData.price)) {
      setError("Please enter valid product name and numeric price.");
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:5000/register", formData);
        alert("Product Registered Successfully!");
        setFormData({ name: "", price: "", description: "" });
        setError("");
      } catch (err) {
        setError("Failed to register product.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Product</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default ProductRegistration;
