import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/FireBaseConfig";
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
           <h1>Shop2men</h1>
          </a>
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
                <a className="nav-link" href="/">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Sản phẩm
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div id="actions" className="float-end">
            <div className="item">
             <button>user</button>
            </div>
            <div className="item">
             <button>cart</button>
            </div>
          </div>
        </div>
      </nav>

      <div id="banner" className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <h2>
              <span>THỨC ĂN</span>
              <br />
              <span>THƯỢNG HẠNG</span>
            </h2>
            <p>
              Chuyên cung cấp các món ăn đảm bảo dinh dưỡng hợp vệ sinh đến
              người dùng, phục vụ người dùng 1 cách hoàn hảo nhất
            </p>
            <button className="btn btn-primary">Mua ngay</button>
          </div>
          <div className="col-lg-6">
            <img src="./assets/img_1.png" alt="" className="img-fluid" />
            <img src="./assets/img_2.png" alt="" className="img-fluid" />
            <img src="./assets/img_3.png" alt="" className="img-fluid" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <a href="#wp-products">
              <img src="assets/to_bottom.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div id="wp-products">
          <h2>SẢN PHẨM CỦA CHÚNG TÔI</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3 mb-4" key={product.id}>
                <div className="card">
                  <Link to={`/detail/${product.id}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price} ₫</p>
                    <button className="btn btn-primary">MUA</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      <div id="saleoff" className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>
              <span>GIẢM GIÁ LÊN ĐẾN</span>
              <span>45%</span>
            </h1>
          </div>
          <div className="col-lg-6">
            {/* Để trống hoặc thêm nội dung bạn muốn */}
          </div>
        </div>
      </div>

      <div id="comment" className="container">
        <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
        <div id="comment-body">
          <div className="prev">
            <a href="/">
              <img src="assets/prev.png" alt="" />
            </a>
          </div>
          <ul id="list-comment">
            <li className="item">
              <div className="avatar">
                <img src="assets/avatar_1.png" alt="" />
              </div>
              <div className="stars">
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
                <span>
                  <img src="assets/star.png" alt="" />
                </span>
              </div>
              <div className="name">Nguyễn Đình Vũ</div>
              <div className="text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            {/* Thêm các bình luận khác ở đây */}
          </ul>
          <div className="next">
            <a href="/">
              <img src="assets/next.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div id="footer">
        <div className="container">
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
                  <a href="/">Trang chủ</a>
                </li>
                <li className="item">
                  <a href="/">Sản phẩm</a>
                </li>
                <li className="item">
                  <a href="/">Blog</a>
                </li>
                <li className="item">
                  <a href="/">Liên hệ</a>
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
    </div>
  );
}

export default Home;
