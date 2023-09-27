import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Cart({ cartItems }) {
  // Kiểm tra nếu cartItems không phải là mảng hoặc là mảng trống
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div id="cart">
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng (0 sản phẩm)
        </h2>
        <p>Giỏ hàng của bạn trống.</p>
      </div>
    );
  }

  // Tính tổng số tiền trong giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div id="cart">
      <h2>
        <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng ({cartItems.length} sản phẩm)
      </h2>
      <ul>
        {cartItems.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} ₫
          </li>
        ))}
      </ul>
      <p>Tổng cộng: {totalAmount} ₫</p>
      <button className="btn btn-primary">Thanh toán</button>
    </div>
  );
}

export default Cart;
