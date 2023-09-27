import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"; // Đảm bảo bạn đã import cả setDoc ở đây
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/FireBaseConfig";
import "./home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

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

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addToCart = async (product) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      try {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId); // Thay đổi đường dẫn
        const userCartData = await getDoc(userDocRef);
  
        let userCart = [];
  
        if (userCartData.exists()) {
          userCart = userCartData.data().cart || []; // Đảm bảo bạn truy cập vào cart
        }
  
        const existingProductIndex = userCart.findIndex((item) => item.id === product.id);
  
        if (existingProductIndex !== -1) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
          userCart[existingProductIndex].quantity += 1;
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng
          product.quantity = 1;
          userCart.push(product);
        }
  
        console.log("Updated cart:", userCart);
  
        // Cập nhật giỏ hàng của người dùng trong Firestore
        await setDoc(userDocRef, { cart: userCart }); // Sử dụng setDoc để ghi đè dữ liệu
  
        // Tính tổng số lượng sản phẩm trong giỏ hàng
        let itemCount = 0;
        userCart.forEach((item) => {
          itemCount += item.quantity;
        });
  
        setCartItemCount(itemCount);
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    } else {
      // Xử lý khi người dùng chưa đăng nhập
      // Ví dụ: hiển thị form đăng nhập hoặc yêu cầu đăng nhập
      console.log("Người dùng chưa đăng nhập");
    }
  };

  const handleUserClick = () => {
    if (userEmail) {
      navigate("/user");
    } else {
      // Xử lý khi người dùng chưa đăng nhập
      // Ví dụ: hiển thị form đăng nhập hoặc yêu cầu đăng nhập
      console.log("Người dùng chưa đăng nhập");
    }
  };

  return (
    <div id="wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <h1>Shop2men</h1>
          </Link>
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
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div id="actions" className="float-end">
            <div className="item" onClick={handleUserClick}>
              {userEmail ? (
                // Nếu có địa chỉ email, hiển thị biểu tượng người dùng
                <FontAwesomeIcon icon={faUser} />
              ) : (
                // Nếu không có địa chỉ email, hiển thị nút "User"
                <span>User</span>
              )}
            </div>
            <div className="item">
              <Link to="/cart">
                <button>
                  <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng ({cartItemCount} sản phẩm)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>MUA</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
