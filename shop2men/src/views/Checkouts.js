import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Menu from '../components/Menu';
import { db } from "../firebase/FireBaseConfig";
import './css/checkout.css';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    address: "",
    paymentMethod: "",
  });

  const auth = getAuth();

  useEffect(() => {
    const fetchCartData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const userDocRef = doc(db, "users", userId);
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

  const handleCheckout = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("Người dùng chưa đăng nhập.");
        return;
      }

      const orderData = {
        email: userData.email,
        name: userData.name,
        address: userData.address,
        paymentMethod: userData.paymentMethod,
        totalAmount: totalAmount,
      };

      const ordersCollectionRef = collection(db, "orders");
      await addDoc(ordersCollectionRef, orderData);

      const userId = currentUser.uid;
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
       

        await updateDoc(userDocRef, {
          cart: [],
        });

        // Simulate a successful payment (replace this with your actual payment logic)
        console.log("Thanh toán thành công!");
      } else {
        console.error("Người dùng không tồn tại.");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
    }
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
      <Menu/>
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
            <option value="credit_card">Atm</option>
            <option value="momo">momo</option>
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
