import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage";
import React, { Component } from "react";
// import "../admin/ProductMenu.css";
import { db } from "../firebase/FireBaseConfig";


class ProductMenu extends Component {
  state = {
    products: [],
    newProduct: {
      id: "",
      name: "",
      price: "",
      image: "",
      size: "",
      productDescription: "",
      color: "", // Thêm trường color
    },
    isOpen: false,
    isModalOpen: false,
    isEditModalOpen: false,
    editProductId: "",
    selectedImage: null, // Ảnh được chọn cho sản phẩm đang chỉnh sửa
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

  handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kiểu MIME của tệp tin
      if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif") {
        const reader = new FileReader();
        reader.onload = async (event) => {
          // Tạo một blob mới với kiểu MIME image/jpeg
          const blob = new Blob([event.target.result], { type: "image/jpeg" });

          this.setState({
            selectedImage: blob, // Lưu ảnh được chọn vào trạng thái
            newProduct: {
              ...this.state.newProduct,
              image: event.target.result, // Hiển thị ảnh được chọn
            },
          });
        };
        reader.readAsArrayBuffer(file);
      } else {
        // Thông báo lỗi khi kiểu MIME không hợp lệ
        console.error("Kiểu MIME không hợp lệ. Chỉ hỗ trợ image/jpeg, image/png và image/gif.");
      }
    }
  };

  uploadImageToFirebaseStorage = async (file) => {
    const storage = getStorage();
    const fileName = `${file.name}_${Date.now()}`; // Thêm timestamp vào tên tệp
    const storageRef = ref(storage, `product_images/${fileName}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  handleAddProduct = async () => {
    try {
      const { id, name, price, size, productDescription, color } = this.state.newProduct;

      const productDoc = doc(db, "products", id);

      let imageUrl = this.state.selectedImage;

      if (this.state.selectedImage) {
        imageUrl = await this.uploadImageToFirebaseStorage(this.state.selectedImage);
      }

      await setDoc(productDoc, {
        name,
        price,
        image: imageUrl,
        size,
        productDescription,
        color,
      });

      this.setState({
        newProduct: {
          id: "",
          name: "",
          price: 0,
          image: "",
          size: "",
          productDescription: "",
          color: "",
        },
        selectedImage: null,
        isModalOpen: false,
      });

      await this.fetchProducts();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  };


  handleEditModalOpen = (productId) => {
    const productToEdit = this.state.products.find((product) => product.id === productId);
    if (productToEdit) {
      this.setState({
        isEditModalOpen: true,
        editProductId: productId,
        newProduct: { ...productToEdit },
        selectedImage: null, // Đặt selectedImage thành null để không ảnh hóa tất cả sản phẩm
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
        image: "",
        size: "",
        productDescription: "",
        color: "",
      },
      selectedImage: null, // Đặt lại selectedImage sau khi đã đóng modal
    });
  };

  handleSaveEditedProduct = async () => {
    try {
      const { id, name, price, size, productDescription, color } = this.state.newProduct;

      const productDoc = doc(db, "products", id);

      let imageUrl = this.state.newProduct.image;

      if (this.state.selectedImage) {
        imageUrl = await this.uploadImageToFirebaseStorage(this.state.selectedImage);
      }

      await setDoc(productDoc, {
        name,
        price,
        image: imageUrl,
        size,
        productDescription,
        color,
      });

      this.setState({
        newProduct: {
          id: "",
          name: "",
          price: 0,
          image: "",
          size: "",
          productDescription: "",
          color: "",
        },
        selectedImage: null, // Đặt lại selectedImage sau khi đã lưu sản phẩm
        isEditModalOpen: false,
        editProductId: "",
      });

      await this.fetchProducts();
    } catch (error) {
      console.error("Lỗi chỉnh sửa sản phẩm:", error);
    }
  };
  toggleLeftMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };
  
  render() {
    return (
     
<div>

  <h1>Menu Sản Phẩm</h1>
  <button
          className="btn btn-success"
          onClick={() => this.setState({ isModalOpen: true, isEditModalOpen: false })}
        >
          Thêm Sản Phẩm
        </button>
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Tên Sản Phẩm</th>
        <th>Giá</th>
        <th>Ảnh</th>
        <th>Size</th>
        <th>Mô tả sản phẩm</th>
        <th>Màu sắc</th>
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
            <img
              src={product.image}
              alt="Product"
              style={{ maxWidth: "80px" }}
            />
          </td>
          <td>{product.size}</td>
          <td>{product.productDescription}</td>
          <td>{product.color}</td> 
          <td>
            <button
              className="btn btn-primary mr-2"
              onClick={() => this.handleEditModalOpen(product.id)}
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
          <input
            type="text"
            placeholder="Đường dẫn ảnh"
            className="form-control"
            value={this.state.newProduct.image}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  image: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Kích thước sản phẩm"
            className="form-control"
            value={this.state.newProduct.size}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  size: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Mô tả sản phẩm"
            className="form-control"
            value={this.state.newProduct.productDescription}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  productDescription: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Màu sắc sản phẩm" // Thêm trường màu sắc
            className="form-control"
            value={this.state.newProduct.color}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  color: e.target.value,
                },
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={this.handleImageChange}
          />

          {this.state.selectedImage && (
            <div className="selected-image">
              <img
                src={this.state.selectedImage}
                alt="Selected"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
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
          <input
            type="text"
            placeholder="Đường dẫn ảnh"
            className="form-control"
            value={this.state.newProduct.image}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  image: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Kích thước sản phẩm"
            className="form-control"
            value={this.state.newProduct.size}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  size: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Mô tả sản phẩm"
            className="form-control"
            value={this.state.newProduct.productDescription}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  productDescription: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            placeholder="Màu sắc sản phẩm" // Thêm trường màu sắc
            className="form-control"
            value={this.state.newProduct.color}
            onChange={(e) =>
              this.setState({
                newProduct: {
                  ...this.state.newProduct,
                  color: e.target.value,
                },
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={this.handleImageChange}
          />

          {this.state.selectedImage && (
            <div className="selected-image">
              <img
                src={this.state.selectedImage}
                alt="Selected"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
         <button
                className="btn btn-success"
                onClick={() => this.handleSaveEditedProduct()}
              >
                Lưu
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.setState({ isEditModalOpen: false })}
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
