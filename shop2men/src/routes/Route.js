import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import ProductMenu from "../admin/ProductMenu";
import Details from "../views/Details";
import Cart from "../views/Carts";
import User from "../views/Users";

function AppRoutes() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-menu" element={<ProductMenu />} />
          <Route path="/detail/:productId" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
