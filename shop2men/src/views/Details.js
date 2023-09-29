import "bootstrap/dist/css/bootstrap.min.css";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy thông tin id sản phẩm từ URL
import { db } from "../firebase/FireBaseConfig";
import Menu from './../components/Menu';
import Footer from './../components/footer';
import "./css/Details.css";

function Details() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

 

  if (!product) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div id="wrapper">
      <Menu/>

      <div className="container">
        <div className="single-product">
          <div className="row">
            <div className="col-6">
              <div className="product-image">
                <div className="product-image-main">
                  <img src={product.image} alt={product.name} />
                </div>
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
                  <p>Mô tả: {product.productDescription}</p>
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
                <div className="product-quantity">
                  <label htmlFor="quantity">Số lượng:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
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
<Footer/>
    </div>
  );
}

export default Details;
