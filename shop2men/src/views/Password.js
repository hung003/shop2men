import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home"; // Đảm bảo bạn đã import Home component
import Login from './Login';
import Register from "./Register"; // Đảm bảo bạn đã import Register component
import ProductMenu from "../admin/ProductMenu";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/product-menu" element={<ProductMenu/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
