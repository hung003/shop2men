import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from '../components/Menu';
import Footer from '../components/footer';
import { db } from "../firebase/FireBaseConfig";
function Product() {
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const formatNumberWithCommas = (number) => {
    if (number !== undefined && number !== null) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // Nếu giá trị không tồn tại hoặc không xác định, bạn có thể xử lý một cách thích hợp ở đây.
    return "N/A"; // Ví dụ: Trả về chuỗi "N/A" cho các sản phẩm không có giá.
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, "product-clothes"); // Thay đổi thành "product-clothes"
        const snapshot = await getDocs(productRef);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

        const existingProductIndex = userCart.findIndex(
          (item) => item.id === product.id
        );

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
    const auth = getAuth();
    const user = auth.currentUser;
    if (userEmail) {
      // Chuyển đến trang /user/:userId nếu có userId
      navigate(`/user/${user.uid}`);
    } else {
      // Xử lý khi người dùng chưa đăng nhập, ví dụ: chuyển đến trang đăng nhập
      navigate("/login");
    }
  };

  return (
    <div id="wrapper">
      <Menu
        userEmail={userEmail}
        handleUserClick={handleUserClick}
        cartItemCount={cartItemCount}
      />

      {/* Thêm mã HTML và JSX để hiển thị danh sách sản phẩm tại đây */}
      <div id="wp-products">
        <h2>SẢN PHẨM Quần</h2>
        <div className="row row-img">
          {products.map((product) => (
            <div className="col-md-3 " key={product.id}>
              <div className="card">
                <div className="card-body">
                  <Link to={`/detail/${product.id}`}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                    />
                  </Link>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {formatNumberWithCommas(product.price)} ₫
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    MUA
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
<Footer/>
      {/* (Thêm phần còn lại của mã JSX và HTML của trang Home) */}
    </div>
  );
}

export default Product;
