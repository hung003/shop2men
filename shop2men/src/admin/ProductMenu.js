import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore";
import React, { Component } from "react";
import { db } from "../firebase/FireBaseConfig";
import "./ProductMenu.css";

class ProductMenu extends Component {
  state = {
    products: [],
    newProduct: {
      id: "",
      name: "",
      price: 0,
    },
    isModalOpen: false,
    isEditModalOpen: false,
    editProductId: "",
  };

  async componentDidMount() {
    await this.fetchProducts();
  }

  fetchProducts = async () => {
    const productRef = collection(db, "products");
    const snapshot = await getDocs(productRef);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    this.setState({ products });
  };

  handleDelete = async (productId) => {
    if (productId) {
      try {
        const productDoc = doc(db, "products", productId);
        await deleteDoc(productDoc);
        await this.fetchProducts();
      } catch (error) {
        console.error("Lỗi xoá sản phẩm:", error);
      }
    }
  };

  handleAddProduct = async () => {
    try {
      const { id, name, price } = this.state.newProduct;

      // Tạo một tài liệu với ID tùy chỉnh
      const productDoc = doc(db, "products", id);

      // Thêm dữ liệu vào tài liệu đã tạo
      await setDoc(productDoc, {
        name,
        price,
      });

      // Cập nhật danh sách sản phẩm sau khi thêm
      this.setState({
        newProduct: {
          id: "",
          name: "",
          price: 0,
        },
        isModalOpen: false,
      });

      await this.fetchProducts();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  };

  handleEditModalOpen = async (productId) => {
    const productToEdit = this.state.products.find(
      (product) => product.id === productId
    );
    if (productToEdit) {
      this.setState({
        isEditModalOpen: true,
        editProductId: productId,
        newProduct: {
          id: productToEdit.id, // Giữ nguyên ID của sản phẩm
          name: productToEdit.name,
          price: productToEdit.price,
        },
      });
    }
  };

  handleEditModalClose = () => {
    this.setState({
      isEditModalOpen: false,
      editProductId: "",
      newProduct: {
        id: "",
        name: "",
        price: 0,
      },
    });
  };

  handleSaveEditedProduct = async () => {
    try {
      const { name, price } = this.state.newProduct;

      const productToEditIndex = this.state.products.findIndex(
        (product) => product.id === this.state.editProductId
      );

      const updatedProducts = [...this.state.products];

      updatedProducts[productToEditIndex] = {
        id: this.state.editProductId, // Giữ nguyên ID của sản phẩm
        name,
        price,
      };

      const productDoc = doc(db, "products", this.state.editProductId);
      await setDoc(productDoc, {
        name,
        price,
      });

      this.setState({
        products: updatedProducts,
        isEditModalOpen: false,
        editProductId: "",
        newProduct: {
          id: "",
          name: "",
          price: 0,
        },
      });
    } catch (error) {
      console.error("Lỗi chỉnh sửa sản phẩm:", error);
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
                <td>{product.price}vnd</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() =>
                      this.handleEditModalOpen(product.id)
                    }
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

        <button
          className="btn btn-success"
          onClick={() => this.setState({ isModalOpen: true })}
        >
          Thêm Sản Phẩm
        </button>

        {this.state.isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Thêm Sản Phẩm Mới</h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Id sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.id}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        id: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.name}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        name: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Giá sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.price}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        price: parseFloat(e.target.value),
                      },
                    })
                  }
                />
                <button
                  className="btn btn-success"
                  onClick={() => this.handleAddProduct()}
                >
                  Thêm
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.setState({ isModalOpen: false })}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {this.state.isEditModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Chỉnh Sửa Sản Phẩm</h2>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Id sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.id}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        id: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.name}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        name: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Giá sản phẩm"
                  className="form-control"
                  value={this.state.newProduct.price}
                  onChange={(e) =>
                    this.setState({
                      newProduct: {
                        ...this.state.newProduct,
                        price: parseFloat(e.target.value),
                      },
                    })
                  }
                />
                <button
                  className="btn btn-success"
                  onClick={() => this.handleSaveEditedProduct()}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleEditModalClose()}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductMenu;
