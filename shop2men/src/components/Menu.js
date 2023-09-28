import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';
function Menu({ userEmail, handleUserClick, cartItemCount }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1>Shop2men</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div id="actions" className="float-end">
            <div className="item user" onClick={handleUserClick}>
              {userEmail ? (
                <FontAwesomeIcon icon={faUser} />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>
            <div className="item">
              <Link to="/cart">
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng {cartItemCount}
                 
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
