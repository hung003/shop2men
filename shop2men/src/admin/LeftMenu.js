import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftMenu.css";
function LeftMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`left-menu ${menuOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {menuOpen ? "Đóng Menu" : "Mở Menu"}
      </button>
      <div className="menu-content">
      <h2>Admin Menu</h2>
      <ul>
        <li>
          <Link to="/product-menu">Dashboard</Link>
        </li>
        <li>
          <Link to="/product-menu">Quản lý Sản phẩm</Link>
        </li>
        <li>
          <Link to="/product-menu">Quản lý Đơn hàng</Link>
        </li>
        <li>
          <Link to="/product-menu">Quản lý Người dùng</Link>
        </li>
      </ul>
    </div>
      {menuOpen && (
        <div className="open-button-container">
          <button className="open-button" onClick={toggleMenu}>
            Mở Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default LeftMenu;
