import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/FireBaseConfig"; // Thay đổi đường dẫn đến file cấu hình Firebase của bạn
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, "products");
        const snapshot = await getDocs(productRef);
        const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div id="wrapper">
      {/* Header */}
      <div id="header">
        <a href="/" className="logo">
          <img src="/" alt="" />
        </a>
        <div id="menu">
          <div className="item">
            <a href="/">Trang chủ</a>
          </div>
          <div className="item">
            <a href="/">Sản phẩm</a>
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
            <img src="/" alt="" />
          </div>
          <div className="item">
            <img src="/" alt="" />
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../assets/images/img-1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="../assets/images/img-3.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="../assets/images/img-4.jpg" className="d-block w-100" alt="..." />
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

      {/* Products */}
      <div id="wp-products">
        <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
        {/* Product List */}
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price} ₫</p>
                  <button className="btn btn-primary">MUA</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End of product list */}
        
        {/* Pagination */}
        <div className="list-page">
          <div className="item">
            <a href="/">1</a>
          </div>
          <div className="item">
            <a href="/">2</a>
          </div>
          <div className="item">
            <a href="/">3</a>
          </div>
          <div className="item">
            <a href="/">4</a>
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
            <a href="/">
              <img src="/" alt="" />
            </a>
          </div>
          <ul id="list-comment">
            {/* Comment 1 */}
            <li className="item">
              <div className="avatar">
                <img src="/" alt="" />
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
            <a href="/">
              <img src="/" alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer">
        <div className="box">
          <div className="logo">
            <img src="/" alt="" />
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

export default Home;
