import React from "react";
import "./home.css";

function Cart() {
  return (
      <div id="wrapper">
        <div id="header">
          <a href="" className="logo">
            <img src="assets/logo.png" alt="" />
          </a>
          <div id="menu">
            <div className="item">
              <a href="index.html">Trang chủ</a>
            </div>
            <div className="item">
              <a href="trang2.html">Sản phẩm</a>
            </div>
            <div className="item">
              <a href="">Blog</a>
            </div>
            <div className="item">
              <a href="">Liên hệ</a>
            </div>
          </div>
          <div id="actions">
            <div className="item">
              <img src="assets/user.png" alt="" />
            </div>
            <div className="item">
              <img src="assets/cart.png" alt="" />
            </div>
          </div>
        </div>

        <main role="main">
          <div className="container mt-4">
            <div id="thongbao" className="alert alert-danger d-none face" role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <h1 className="text-center">Giỏ hàng</h1>
            <div className="row">
              <div className="col col-md-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ảnh đại diện</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody id="datarow">
                    <tr>
                      <td>1</td>
                      <td>
                        <img src="images/Đầm ngắn satin.webp" className="hinhdaidien" />
                      </td>
                      <td>Apple Ipad 4 Wifi 16GB</td>
                      <td className="text-right">2</td>
                      <td className="text-right">11,800,000.00</td>
                      <td className="text-right">23,600,000</td>
                      <td>
                        {/* Nút xóa, bấm vào sẽ xóa thông tin dựa vào khóa chính `sp_ma` */}
                        <a id="delete_1" data-sp-ma="2" className="btn btn-danger btn-delete-sanpham">
                          <i className="fa fa-trash" aria-hidden="true"></i> Xóa
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <img src="images/Đầm ngắn chấm bi.webp" className="hinhdaidien" />
                      </td>
                      <td>Nokia Asha 311</td>
                      <td className="text-right">4</td>
                      <td className="text-right">2,699,000.00</td>
                      <td className="text-right">1,0796,000</td>
                      <td>
                        {/* Nút xóa, bấm vào sẽ xóa thông tin dựa vào khóa chính `sp_ma` */}
                        <a id="delete_2" data-sp-ma="6" className="btn btn-danger btn-delete-sanpham">
                          <i className="fa fa-trash" aria-hidden="true"></i> Xóa
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>
                        <img src="images/Đầm midi hai tông màu.webp" className="hinhdaidien" />
                      </td>
                      <td>Apple iPhone 5 16GB White</td>
                      <td className="text-right">8</td>
                      <td className="text-right">1,4990,000.00</td>
                      <td className="text-right">119,920,000</td>
                      <td>
                        {/* Nút xóa, bấm vào sẽ xóa thông tin dựa vào khóa chính `sp_ma` */}
                        <a id="delete_3" data-sp-ma="4" className="btn btn-danger btn-delete-sanpham">
                          <i className="fa fa-trash" aria-hidden="true"></i> Xóa
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <a href="" className="btn btn-warning btn-md"><i className="fa fa-arrow-left"
                    aria-hidden="true"></i>&nbsp;Quay
                    về trang chủ</a>
                <a href="" className="btn btn-primary btn-md"><i
                    className="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;Thanh toán</a>
              </div>
            </div>
          </div>
        </main>

        <div id="footer" className="mt-5">
          <div className="box">
            <div className="logo">
              <img src="assets/logo.png" alt="" />
            </div>
            <p>Cung cấp sản phẩm với chất lượng an toàn cho quý khách</p>
          </div>
          <div className="box">
            <h3>NỘI DUNG</h3>
            <ul className="quick-menu">
              <div className="item1">
                <a href="index.html">Trang chủ</a>
              </div>
              <div className="item1">
                <a href="">Sản phẩm</a>
              </div>
              <div className="item1">
                <a href="">Blog</a>
              </div>
              <div className="item1">
                <a href="">Liên hệ</a>
              </div>
            </ul>
          </div>
          <div className="box">
            <h3>LIÊN HỆ</h3>
            <form action="">
              <input type="text" placeholder="Địa chỉ email" />
              <button>Nhận tin</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Cart;
