
// Đảm bảo bạn đã import cả setDoc ở đây
import React from "react";
import { Link, } from "react-router-dom";
import '../views/css/home.css';


function Footer() {
  return (
    <div id="footer">
        <div className="container-footer">
          <div className="row">
            <div className="col-md-4">
              <div className="logo">
                <img src="assets/logo.png" alt="" />
              </div>
              <p>Cung cấp sản phẩm với chất lượng an toàn cho quý khách</p>
            </div>
            <div className="col-md-4">
              <h3>NỘI DUNG</h3>
              <ul className="quick-menu">
                <li className="item">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="item">
                  <Link to="/">Sản phẩm</Link>
                </li>
                <li className="item">
                  <Link to="/">Blog</Link>
                </li>
                <li className="item">
                  <Link to="/">Liên hệ</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>LIÊN HỆ</h3>
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ email"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Nhận tin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Footer;
