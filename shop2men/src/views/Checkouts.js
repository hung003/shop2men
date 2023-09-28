import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './css/checkout.css'
import { db } from "../firebase/FireBaseConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    address: "",
    paymentMethod: "",
  });

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
          updateTotalAmount(userCart);
        }
      }
    };

    fetchCartData();
  }, [auth]);

  const updateTotalAmount = (cart) => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  // Hàm định dạng số với dấu phân cách hàng nghìn
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Xử lý khi người dùng nhấn nút Thanh toán
  const handleCheckout = () => {
    // Thực hiện xử lý thanh toán ở đây
    // userData.email, userData.name, userData.address và userData.paymentMethod
    // chứa thông tin mà người dùng đã nhập
  };

  if (!auth.currentUser) {
    return (
      <div id="checkout">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Thanh toán
        </h2>
        <p>Vui lòng đăng nhập để tiến hành thanh toán.</p>
      </div>
    );
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div id="checkout">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Thanh toán
        </h2>
        <p>Giỏ hàng của bạn trống.</p>
      </div>
    );
  }

  return (
    <div id="checkout">
      <h2>
        <FontAwesomeIcon icon={faShoppingCart} /> Thanh toán
      </h2>
      <div className="checkout-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cách thanh toán:</label>
          <select
            name="paymentMethod"
            value={userData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn cách thanh toán</option>
            <option value="credit_card">Thẻ tín dụng</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <p>Tổng cộng: {formatNumberWithCommas(totalAmount)} ₫</p>
        <button className="btn btn-primary" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default Checkout;
