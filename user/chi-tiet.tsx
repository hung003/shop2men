import React from 'react';
import './ProductDetail.css';
const ProductDetail = () => {
  return (
    <div>
      <div id="wrapper">
        <div id="header">
          <a href="/" className="logo">
            <img src="assets/logo.png" alt="" />
          </a>
          <div id="menu">
            <div className="item">
              <a href="/">Trang chủ</a>
            </div>
            <div className="item">
              <a href="/products">Sản phẩm</a>
            </div>
            <div className="item">
              <a href="/blog">Blog</a>
            </div>
            <div className="item">
              <a href="/contact">Liên hệ</a>
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
                    <img src="images/Đầm ngắn chấm bi.webp" alt="" id="product-main-image" />
                  </div>
                  <div className="product-image-slider">
                    <img src="images/1.jpg" alt="" className="image-list" />
                    <img src="images/2.jpg" alt="" className="image-list" />
                    <img src="images/3.jpg" alt="" className="image-list" />
                    <img src="images/4.jpg" alt="" className="image-list" />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="breadcrumb">
                  <span><a href="/">Home</a></span>
                  <span><a href="/products">Product</a></span>
                  <span className="active">T-shirt</span>
                </div>

                <div className="product">
                  <div className="product-title">
                    <h2>Half Sleve T-shirt for Men</h2>
                  </div>
                  <div className="product-rating">
                    <span><i className="bx bxs-star"></i></span>
                    <span><i className="bx bxs-star"></i></span>
                    <span><i className="bx bxs-star"></i></span>
                    <span><i className="bx bxs-star"></i></span>
                    <span><i className="bx bxs-star"></i></span>
                    <span className="review">(47 Review)</span>
                  </div>
                  <div className="product-price">
                    <span className="offer-price">$99.00</span>
                    <span className="sale-price">$129.00</span>
                  </div>

                  <div className="product-details">
                    <h3>Description</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est magnam quibusdam maiores sit perferendis minima cupiditate iusto earum repudiandae maxime vitae nostrum, ea cumque iste ipsa hic commodi tempore.</p>
                  </div>
                  <div className="product-size">
                    <h4>Size</h4>
                    <div className="size-layout">
                      <input type="radio" name="size" value="S" id="1" className="size-input" />
                      <label htmlFor="1" className="size">S</label>

                      <input type="radio" name="size" value="M" id="2" className="size-input" />
                      <label htmlFor="2" className="size">M</label>

                      <input type="radio" name="size" value="L" id="3" className="size-input" />
                      <label htmlFor="3" className="size">L</label>

                      <input type="radio" name="size" value="XL" id="4" className="size-input" />
                      <label htmlFor="4" className="size">XL</label>

                      <input type="radio" name="size" value="XXL" id="5" className="size-input" />
                      <label htmlFor="5" className="size">XXL</label>
                    </div>
                  </div>
                  <div className="product-color">
                    <h4>Color</h4>
                    <div className="color-layout">
                      <input type="radio" name="color" value="black" className="color-input" />
                      <label htmlFor="black" className="black"></label>
                      <input type="radio" name="color" value="red" className="color-input" />
                      <label htmlFor="red" className="red"></label>

                      <input type="radio" name="color" value="blue" className="color-input" />
                      <label htmlFor="blue" className="blue"></label>
                    </div>
                  </div>
                  <span className="divider"></span>

                  <div className="product-btn-group">
                    <div className="button buy-now"><i className='bx bxs-zap'></i> Buy Now</div>
                    <div className="button add-cart"><i className='bx bxs-cart'></i> Add to Cart</div>
                    <div className="button heart"><i className='bx bxs-heart'></i> Add to Wishlist</div>
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
    </div>
  );
};

export default ProductDetail;
