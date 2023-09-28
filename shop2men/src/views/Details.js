import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy thông tin id sản phẩm từ URL
import { db } from "../firebase/FireBaseConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Details.css";

function Details() {
  const { productId } = useParams(); // Lấy id sản phẩm từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data());
        } else {
          console.error("Sản phẩm không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu sản phẩm:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    // Xử lý trường hợp sản phẩm không tồn tại hoặc đang được tải
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
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
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="product-image-main-mini">
                  <img src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="col-6">
              <div className="product">
                <div className="product-title">
                  <h2>{product.name}</h2>
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
                  <span className="offer-price">
                    <p>Giá: {product.price} ₫</p>
                  </span>
                </div>

                <div className="product-details">
                  <h3>Thông tin</h3>
                  <p>Mô tả: {product.description}</p>
                </div>
                <div className="product-size">
                  <h4>Size</h4>
                  <div className="size-layout mb-4">
                    <button className="btn btn-secondary size-button">S</button>
                    <button className="btn btn-secondary size-button">M</button>
                    <button className="btn btn-secondary size-button">L</button>
                    <button className="btn btn-secondary size-button">
                      XL
                    </button>
                    <button className="btn btn-secondary size-button">
                      XXL
                    </button>
                  </div>
                </div>

                <span className="divider"></span>


                <div className="product-btn-group">
                  <button className="btn btn-primary">
                    <i className="bx bxs-zap"></i>Mua Ngay
                  </button>
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
              <a href="/">Liên hệ</a>
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

export default Details;
