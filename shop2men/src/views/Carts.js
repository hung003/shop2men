import { faMinus, faPlus, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/FireBaseConfig";
import Menu from './../components/Menu';
import Footer from './../components/footer';
import './css/carts.css';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // Lấy thông tin đăng nhập từ Firebase Auth nếu bạn sử dụng Firebase Auth
  const auth = getAuth(); // Thay 'firebase' bằng object Firebase của bạn

  const updateTotalAmount = (cart) => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const currentUser = auth.currentUser; // Lấy người dùng hiện tại

      if (currentUser) {
        const userId = currentUser.uid; // Sử dụng UID của người dùng hiện tại
        const userDocRef = doc(db, "users", userId); // Truy cập tài liệu người dùng
        const userCartData = await getDoc(userDocRef);

        if (userCartData.exists()) {
          const userCart = userCartData.data().cart || [];
          setCartItems(userCart);
          updateTotalAmount(userCart);
        }
      }
    };

    fetchCartData();
  }, [auth]);

  const removeFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, { cart: updatedCart });
      updateTotalAmount(updatedCart);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      setDoc(userDocRef, { cart: updatedCart }, { merge: true });
      updateTotalAmount(updatedCart);
    }
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      setDoc(userDocRef, { cart: updatedCart }, { merge: true });
      updateTotalAmount(updatedCart);
    }
  };

  if (!auth.currentUser) {
    return (
      <div id="cart">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng (0 sản phẩm)
        </h2>
        <p>Vui lòng đăng nhập để xem giỏ hàng của bạn.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div id="cart">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng (0 sản phẩm)
        </h2>
        <p>Giỏ hàng của bạn trống.</p>
      </div>
    );
  }

  return (
    <>
      <Menu />

      <div id="cart text-center">
        <h2 className="text-center">
          <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng ({cartItems.length}{" "}
          sản phẩm)
        </h2>
        <div className="row">
          {cartItems.map((product) => (
            <div className="col-md-6" key={product.id}>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Giá: {product.price} ₫</p>
                      <div className="quantity">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          className="btn btn-secondary"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="quantity-text text-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(product.id)}
                          className="btn btn-secondary"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="btn btn-danger remove-button"
                      >
                        <FontAwesomeIcon icon={faTrash} /> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-center">
            Tổng cộng: {formatNumberWithCommas(totalAmount)} ₫
          </p>
          <Link to="/checkout" className="text-center">
            <button className="btn btn-primary mb-5 text text-center">
              Thanh toán
            </button>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cart;
