import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductMenu from "../admin/ProductMenu";
import Cart from "../views/Carts";
import Checkout from "../views/Checkouts";
import Details from "../views/Details";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import User from "../views/Users";
import Product from '../views/product-clothes';
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
          <Route path="/checkout" element={<  Checkout />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
