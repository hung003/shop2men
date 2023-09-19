import React, { Component } from "react";
import { db } from "../firebase/FireBaseConfig"; // Import Firebase database và auth
import { collection, getDocs, deleteDoc } from "firebase/firestore";

class ProductMenu extends Component {
  state = {
    products: [], // Danh sách sản phẩm
  };

  async componentDidMount() {
    // Lấy danh sách sản phẩm từ Firebase
    const productRef = collection(db, "products"); // Sử dụng db thay vì database
    const snapshot = await getDocs(productRef);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    this.setState({ products });
  }

  handleDelete = async (productId) => {
    if (productId) { // Kiểm tra productId có tồn tại
      try {
        // Xoá sản phẩm từ Firebase
        const productDoc = collection(db, "products", productId);
        await deleteDoc(productDoc); // Sử dụng db thay vì auth

        // Cập nhật danh sách sản phẩm sau khi xoá
        const updatedProducts = this.state.products.filter((product) => product.id !== productId);
        this.setState({ products: updatedProducts });
      } catch (error) {
        console.error("Lỗi xoá sản phẩm:", error);
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Menu Sản Phẩm</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    // Đưa ra hành động chỉnh sửa ở đây
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(product.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success">Thêm Sản Phẩm</button>
      </div>
    );
  }
}

export default ProductMenu;
