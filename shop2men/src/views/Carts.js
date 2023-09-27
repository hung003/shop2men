import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/FireBaseConfig";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Lấy thông tin đăng nhập từ Firebase Auth nếu bạn sử dụng Firebase Auth
  const auth = getAuth(); // Thay 'firebase' bằng object Firebase của bạn

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

          // Tính tổng số tiền
          const total = userCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotalAmount(total);
        }
      }
    };

    fetchCartData();
  }, [auth]);

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
    <div id="cart">
      <h2>
        <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng ({cartItems.length} sản phẩm)
      </h2>
      <ul>
        {cartItems.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price} ₫ - Số lượng: {product.quantity}
          </li>
        ))}
      </ul>
      <p>Tổng cộng: {totalAmount} ₫</p>
      <button className="btn btn-primary">Thanh toán</button>
    </div>
  );
}

export default Cart;
