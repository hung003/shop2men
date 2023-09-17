import React from 'react';

import './style.css'; // Import your CSS file here
import './plugins/bootstrap/css/bootstrap.min.css'; // Import your Bootstrap CSS file here
import './plugins/bootstrap-icons/font/bootstrap-icons.css';
import './plugins/fontawesome-free/css/all.min.css';

const totalPages = 4; // Replace with the total number of pages in your application
const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
const ProductItem = ({ imageSrc, name, price }) => {
  return (
    <div id="wrapper">
      <div id="header">
        <a href="" className="logo">
          <img src="assets/logo.png" alt="" />
        </a>
        <div id="menu">
          <div className="item">
            <a href="">Trang chủ</a>
          </div>
          <div className="item">
            <a href="">Sản phẩm</a>
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

      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/banner.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/BANNER-SALE-OFF.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/banner3.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div id="wp-products">
      <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
      <ul id="list-products">
        <div className="item">
          <img src="images/Quần SANDROxWRANGLER.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần SANDROxWRANGLER</div>
          <div className="price">7.970.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>

        <div className="item">
          <img src="images/Quần ống rộng.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần ống rộng</div>
          <div className="price">8.290.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>

        <div className="item">
          <img src="images/Quần suit len.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần suit len</div>
          <div className="price">7.970.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>
      </ul>

      <ul id="list-products">
        <div className="item">
          <img src="images/Quần tây.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần tây</div>
          <div className="price">8.290.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>

        <div className="item">
          <img src="images/Quần ống đứng co giãn.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần ống đứng co giãn</div>
          <div className="price">7.350.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>

        <div className="item">
          <img src="images/Quần jogging.webp" width="256px" height="174px" alt="" />
          <div className="name">Quần jogging</div>
          <div className="price">7.040.000 ₫</div>
          <button className="add-to-cart">MUA</button>
        </div>
      </ul>
    </div>
    <div id="wp-products">
      <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Quần SANDROxWRANGLER.webp"
          name="Quần SANDROxWRANGLER"
          price="7.970.000 ₫"
        />

        <ProductItem
          imageSrc="images/Quần ống rộng.webp"
          name="Quần ống rộng"
          price="8.290.000 ₫"
        />

        <ProductItem
          imageSrc="images/Quần suit len.webp"
          name="Quần suit len"
          price="7.970.000 ₫"
        />
      </ul>

      <ul id="list-products">
        <ProductItem
          imageSrc="images/Quần tây.webp"
          name="Quần tây"
          price="8.290.000 ₫"
        />

        <ProductItem
          imageSrc="images/Quần ống đứng co giãn.webp"
          name="Quần ống đứng co giãn"
          price="7.350.000 ₫"
        />
      </ul>
    </div>
    <div id="wp-products">
      <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>

      {/* First ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Quần SANDROxWRANGLER.webp"
          name="Quần SANDROxWRANGLER"
          price="7.970.000 ₫"
        />

        <ProductItem
          imageSrc="images/Quần ống rộng.webp"
          name="Quần ống rộng"
          price="8.290.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>

      {/* Second ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Quần tây.webp"
          name="Quần tây"
          price="8.290.000 ₫"
        />

        <ProductItem
          imageSrc="images/Quần ống đứng co giãn.webp"
          name="Quần ống đứng co giãn"
          price="7.350.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>

      {/* Third ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Quần jogging.webp"
          name="Quần jogging"
          price="7.040.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>

      {/* Fourth ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Đầm maxi thun gân.webp"
          name="Đầm maxi thun gân"
          price="9.230.000 ₫"
        />

        <ProductItem
          imageSrc="images/Áo dệt kim đính đá.webp"
          name="Áo dệt kim đính đá"
          price="3.910.000 ₫"
        />

        <ProductItem
          imageSrc="images/Đầm midi hai tông màu.webp"
          name="Đầm midi hai tông màu"
          price="7.670.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>

      {/* Fifth ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Áo sơ mi lụa dáng crop.webp"
          name="Áo sơ mi lụa dáng crop"
          price="7.670.000 ₫"
        />

        <ProductItem
          imageSrc="images/Đầm ngắn chấm bi.webp"
          name="Đầm ngắn chấm bi"
          price="9.230.000 ₫"
        />

        <ProductItem
          imageSrc="images/Đầm ngắn satin.webp"
          name="Đầm ngắn satin"
          price="8.600.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>

      {/* Sixth ul */}
      <ul id="list-products">
        <ProductItem
          imageSrc="images/Áo len dệt kim polo.webp"
          name="Áo len dệt kim polo"
          price="5.480.000 ₫"
        />

        <ProductItem
          imageSrc="images/Áo khoác denim dáng crop.webp"
          name="Áo khoác denim dáng crop"
          price="9.230.000 ₫"
        />

        <ProductItem
          imageSrc="images/Áo khoác denim phối dệt kim.webp"
          name="Áo khoác denim phối dệt kim"
          price="10.790.000 ₫"
        />

        {/* Add more ProductItem components here */}
      </ul>
    </div>
    <div className="list-page">
      {pages.map((page) => (
        <div key={page} className="item">
          <a href="#">{page}</a>
        </div>
      ))}
    </div>
    <div id="saleoff">
      <div className="box-left">
        <h1>
          <span>GIẢM GIÁ LÊN ĐẾN</span>
          <span>45%</span>
        </h1>
      </div>
      <div className="box-right"></div>
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
            <a href="/products">Sản phẩm</a>
          </div>
          <div className="item1">
            <a href="/blog">Blog</a>
          </div>
          <div className="item1">
            <a href="/contact">Liên hệ</a>
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

export default ProductItem;
