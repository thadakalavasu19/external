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
