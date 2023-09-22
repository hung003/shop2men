import React from "react";

function Home() {
  return (
    <div id="wrapper">
      {/* Header */}
      <div id="header">
        <a href="index.html" className="logo">
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

      {/* Carousel */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/banner.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img
              src="images/BANNER-SALE-OFF.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img src="images/banner3.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Products */}
      <div id="wp-products">
        <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
        {/* Product List */}
        <ul id="list-products">
          {/* Product 1 */}
          <li className="item">
            <img
              src="images/Quần SANDROxWRANGLER.webp"
              width="256px"
              height="174px"
              alt=""
            />
            <div className="name">Quần SANDROxWRANGLER</div>
            <div className="price">7.970.000 ₫</div>
            <button className="add-to-cart">MUA</button>
          </li>
          {/* Repeat the above structure for other products */}
        </ul>
        {/* End of product list */}

        {/* Pagination */}
        <div className="list-page">
          <div className="item">
            <a href="index.html">1</a>
          </div>
          <div className="item">
            <a href="trang2.html">2</a>
          </div>
          <div className="item">
            <a href="">3</a>
          </div>
          <div className="item">
            <a href="">4</a>
          </div>
        </div>
      </div>

      {/* Sale Off */}
      <div id="saleoff">
        <div className="box-left">
          <h1>
            <span>GIẢM GIÁ LÊN ĐẾN</span>
            <span>45%</span>
          </h1>
          <a style={{ textDecoration: "none" }} href="trang2.html">
            Xem Ngay
          </a>
        </div>
        <div className="box-right"></div>
      </div>

      {/* Comments */}
      <div id="comment">
        <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
        <div id="comment-body">
          <div className="prev">
            <a href="#">
              <img src="assets/prev.png" alt="" />
            </a>
          </div>
          <ul id="list-comment">
            {/* Comment 1 */}
            <li className="item">
              <div className="avatar">
                <img src="assets/avatar_1.png" alt="" />
              </div>
              <div className="stars">
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
                {/* Repeat the star image for the rating */}
              </div>
              <div className="name">Nguyễn Đình Vũ</div>
              <div className="text">
                <p>
                  Không biết mọi người sao chứ mình thấy những sản phẩm được bày
                  bán ở shop này vô cùng chất lượng và giá cả lại hợp lý lắm
                  luôn á.
                </p>
              </div>
            </li>
            {/* Repeat the above structure for other comments */}
          </ul>
          {/* End of comment list */}
          <div className="next">
            <a href="#">
              <img src="assets/next.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
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
              <a href="index.html">Trang chủ</a>
            </div>
            <div className="item1">
              <a href="trang2.html">Sản phẩm</a>
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

export default Home;
