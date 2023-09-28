import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductMenu from "../admin/ProductMenu";
import Cart from "./Carts";
import User from "./Users";
import Home from "./Home"; // Đảm bảo bạn đã import Home component
import Login from "./Login";
import Register from "./Register"; // Đảm bảo bạn đã import Register component
import Details from "./Details";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/product-menu" element={<ProductMenu />} />
          <Route path="/detail/:productId" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
