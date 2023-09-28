
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"; // Đảm bảo bạn đã import cả setDoc ở đây
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from '../components/Menu';
import { db } from "../firebase/FireBaseConfig";
import Footer from './../components/footer';
import './css/home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, "products");
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

      <div id="banner" className="container-fluid">
        <div className="row">
          <div className="item-banner col-lg-6">
            <h2>
              <span>Summer Collection</span>
              <br />
              <span>Fall - Winter Collections 2030</span>
            </h2>
            <p>
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality.
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
  <div className="row row-img">
    {products.map((product) => (
      <div className="col-md-3 mb-4" key={product.id}>
        <div className="card">
          <Link to={`/detail/${product.id}`}>
            <img
              src={product.image}
              className="card-img-top"
              alt={product.name}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{formatNumberWithCommas(product.price)} ₫</p>
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
      <div id="comment" className="container">
        <h2>NHẬN XÉT CỦA KHÁCH HÀNG</h2>
        <div id="comment-body">
          <div className="prev"></div>
          <ul id="list-comment">
            <li className="item">
              <div className="name">Nguyễn Châu Trường Giang</div>
              <div className="text">
                <p>
                Mình mua đúng đợt giảm giá, sản phẩm được mình bỏ vào giỏ hàng bấy lâu nay giờ cũng cầm được trên tay rồi.
                </p>
              </div>
              <div className="name">Phùng Nguyễn Minh Hùng</div>
              <div className="text">
                <p>
                Không biết mọi người sao chứ mình thấy những sản phẩm được bày bán ở shop này vô cùng chất lượng và giá cả lại hợp lý lắm luôn á.
                </p>
              </div>
              <div className="name">uesr0381990</div>
              <div className="text">
                <p>
                Sản phẩm tốt thế này mà tới bây giờ tôi mới phát hiện được nó thì thật là uổng quá đi mà
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

     <Footer/>
    </div>
  );
}

export default Home;
