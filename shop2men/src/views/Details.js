import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy thông tin id sản phẩm từ URL
import { db } from "../firebase/FireBaseConfig";


function Details() {
    const { productId } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const productRef = doc(db, "products", productId);
          const productSnapshot = await getDoc(productRef);
          if (productSnapshot.exists()) {
            setProduct(productSnapshot.data());
          } else {
            console.error("Sản phẩm không tồn tại");
          }
        } catch (error) {
          console.error("Lỗi lấy dữ liệu sản phẩm:", error);
        }
      };
      fetchProduct();
    }, [productId]);
  
    if (!product) {
      // Xử lý trường hợp sản phẩm không tồn tại hoặc đang được tải
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  
    return (
      <div>
        <div className="product-detail">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>Giá: {product.price} ₫</p>
            <p>Mô tả: {product.description}</p>
            {/* Thêm các thông tin chi tiết khác của sản phẩm nếu cần */}
            <button className="btn btn-primary">MUA</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Details;
  