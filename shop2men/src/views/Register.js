import React, { Component } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";

class Register extends Component {
  state = {
    email: "",
    password: "",
    registered: false,
    error: null, // Thêm một trạng thái để theo dõi lỗi đăng ký
  };

  handleRegister = () => {
    const email = this.state.email;
    const password = this.state.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data, "authData");
        alert("Đăng ký thành công!");
        this.setState({ registered: true });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi đăng ký:", error);
        this.setState({ error: error.message }); // Lưu trữ thông báo lỗi
      });
  };

  render() {
    // Nếu đã đăng ký thành công, điều hướng đến trang '/home'
    if (this.state.registered) {
      return null;
    }

    return (
      <div className="container h-100 mt-5">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-sm-8 col-lg-5 border border-black border-3">
            <div className="card-body">
              <div className="card-title text-center">
                <h4 className="card-title mb-0"> Register</h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-3">
                      Email:
                    </label>
                    <div className="col-sm">
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail3"
                        name="email"
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-3 col-form-label"
                    >
                      Password:
                    </label>
                    <div className="col-sm">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                        name="password"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="offset-sm-3 col-auto text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.handleRegister()}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                  {this.state.error && (
                    <div className="row mt-3">
                      <div className="offset-sm-3 col-sm-9">
                        <p className="text-danger">{this.state.error}</p>
                      </div>
                    </div>
                  )}
                  <p className="mt-3 text-center">
                    Nếu đã có tài khoản, hãy <Link to="/">đăng nhập</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
