import React, { Component } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { createBrowserHistory } from 'history';
import { auth } from '../firebase/FireBaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createBrowserHistory();

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: null,
  };

  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        console.log(data, "authData");
        alert("Đăng nhập thành công!");

        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));

        history.push("/home");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error);
        this.setState({
          loginError:
            "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập.",
        });
      });
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Login</h1>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    name="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                {this.state.loginError && (
                  <div className="alert alert-danger">
                    {this.state.loginError}
                  </div>
                )}
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleLogin()}
                  >
                    Login
                  </button>
                </div>
                <p className="mt-3 text-center">
                  Nếu bạn chưa có tài khoản, hãy{" "}
                  <Link to="/Register">đăng ký</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
