import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createBrowserHistory } from 'history'; // Import thư viện history
import React, { Component } from "react";
import { database } from './FireBaseConfig';
import './Login.css';

// Tạo một đối tượng history để sử dụng navigate
const history = createBrowserHistory();

class Register extends Component {
    state = {
        email: "",
        password: "",
        registered: false
    }

    handleSignin = () => {
        const email = this.state.email;
        const password = this.state.password;

        createUserWithEmailAndPassword(database, email, password)
            .then(data => {
                console.log(data, 'authData');
                alert("Đăng ký thành công!");
                this.setState({ registered: true });
                history.push('/home'); // Sử dụng history để điều hướng đến trang '/home'
            })
            .catch(error => {
                console.error("Lỗi đăng ký:", error);
            });
    }

    render() {
        // Nếu đã đăng ký thành công, điều hướng đến trang '/home'
        if (this.state.registered) {
            return history.push('/home');
        }

        return (
            <div>
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-sm-8 col-lg-5">
                            <div className="card bg-primary">
                                <div className="card-header text-white">
                                    <h4 className="card-title mb-0"><i className="bi-grid-3x3-gap-fill"></i> Register</h4>
                                </div>
                                <div className="card-body bg-white rounded-bottom">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">User Email</label>
                                            <div className="col-sm">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputEmail3"
                                                    name="email"
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                                            <div className="col-sm">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputPassword3"
                                                    name="password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-3 col-auto">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => this.handleSignin()}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
