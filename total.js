//server.js//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/",async(req,res)=>{const all = await Product.find();
res.json(all);});
app.post("/register", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(200).send("Product saved");
  } catch (err) {
    res.status(500).send("Failed to save product");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
///
//
//header.js//
import React from "react";

const Header = () => (
  <header className="bg-primary text-white p-3 text-center">
    <h1>My E-Commerce Store</h1>
  </header>
);

export default Header;
///
//
//navbar.js//
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">E-Shop</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Product Registration</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
//
//
//project registration//
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
//
  //
  //
  //APp.js//
  import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Navbar from "./components/navbar";
import ProductRegistration from "./components/productregistration";
const Home = () => <div className="container mt-4"><h2>Welcome to Our Store</h2></div>;
const About = () => <div className="container mt-4"><h2>About Us</h2><p>This is a simple e-commerce platform.</p></div>;

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<ProductRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
