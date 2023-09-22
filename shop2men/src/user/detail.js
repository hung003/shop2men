import React from "react";
import "./chi-tiet.css"; // Import stylesheet

function detail() {
  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chi-tiet</title>
        <link rel="stylesheet" href="chi-tiet.css" />
      </head>
      <body>
        <div id="wrapper">
          <div id="header">
            <a href="/" className="logo">
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
                <a href="/">Blog</a>
              </div>
              <div className="item">
                <a href="/">Liên hệ</a>
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

          <div className="container">
            <div className="single-product">
              <div className="row">
                <div className="col-6">
                  <div className="product-image">
                    <div className="product-image-main">
                      <img
                        src="images/Đầm ngắn chấm bi.webp"
                        alt=""
                        id="product-main-image"
                      />
                    </div>
                    <div className="product-image-slider">
                      <img
                        src="images/Đầm maxi thun gân.webp"
                        alt=""
                        className="image-list"
                      />
                      <img
                        src="images/Đầm ngắn satin.webp"
                        alt=""
                        className="image-list"
                      />
                      <img
                        src="images/Đầm midi hai tông màu.webp"
                        alt=""
                        className="image-list"
                      />
                      <img
                        src="images/Quần ống đứng co giãn.webp"
                        alt=""
                        className="image-list"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="breadcrumb">
                    <span>
                      <a href="/">Trang chủ</a>
                    </span>
                    <span>
                      <a href="/">Sản phẩm</a>
                    </span>
                    <span className="active">Chi tiết</span>
                  </div>

                  <div className="product">
                    <div className="product-title">
                      <h2>Đầm ngắn chấm bi</h2>
                    </div>
                    <div className="product-rating">
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span>
                        <i className="bx bxs-star"></i>
                      </span>
                      <span className="review">(47 Review)</span>
                    </div>
                    <div className="product-price">
                      <span className="offer-price">8.999.000 ₫</span>
                      <span className="sale-price">9.230.000 ₫</span>
                    </div>

                    <div className="product-details">
                      <h3>Thông tin</h3>
                      <p>
                        Đầm ngắn bằng vải voan được tô điểm bằng vải jacquard
                        chấm bi, có đường viền cổ chữ V với các chi tiết áo
                        khoác, một túi cài cúc được buộc chặt bằng các nút đóng
                        dấu, tay áo dài rộng có cổ tay áo xếp nếp và váy xếp
                        nếp.
                      </p>
                    </div>
                    <div className="product-size">
                      <h4>Size</h4>
                      <div className="size-layout">
                        <input
                          type="radio"
                          name="size"
                          value="S"
                          id="1"
                          className="size-input"
                        />
                        <label htmlFor="1" className="size">
                          S
                        </label>

                        <input
                          type="radio"
                          name="size"
                          value="M"
                          id="2"
                          className="size-input"
                        />
                        <label htmlFor="2" className="size">
                          M
                        </label>

                        <input
                          type="radio"
                          name="size"
                          value="L"
                          id="3"
                          className="size-input"
                        />
                        <label htmlFor="3" className="size">
                          L
                        </label>

                        <input
                          type="radio"
                          name="size"
                          value="XL"
                          id="4"
                          className="size-input"
                        />
                        <label htmlFor="4" className="size">
                          XL
                        </label>

                        <input
                          type="radio"
                          name="size"
                          value="XXL"
                          id="5"
                          className="size-input"
                        />
                        <label htmlFor="5" className="size">
                          XXL
                        </label>
                      </div>
                    </div>
                    <div className="product-color">
                      <h4>Color</h4>
                      <div className="color-layout">
                        <input
                          type="radio"
                          name="color"
                          value="black"
                          className="color-input"
                        />
                        <label htmlFor="black" className="black"></label>
                        <input
                          type="radio"
                          name="color"
                          value="red"
                          className="color-input"
                        />
                        <label htmlFor="red" className="red"></label>

                        <input
                          type="radio"
                          name="color"
                          value="blue"
                          className="color-input"
                        />
                        <label htmlFor="blue" className="blue"></label>
                      </div>
                    </div>
                    <span className="divider"></span>

                    <div className="product-btn-group">
                      <div className="button buy-now">
                        <i className="bx bxs-zap"></i>Mua Ngay
                      </div>
                      <div className="button add-cart">
                        <i className="bx bxs-cart"></i>Thêm vào giỏ hàng
                      </div>
                      <div className="button heart">
                        <i className="bx bxs-heart"></i>Thêm vào yêu thích
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="footer">
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
                  <a href="/">Trang chủ</a>
                </div>
                <div className="item1">
                  <a href="/">Sản phẩm</a>
                </div>
                <div className="item1">
                  <a href="/">Blog</a>
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
      </body>
    </div>
  );
}

export default detail;
