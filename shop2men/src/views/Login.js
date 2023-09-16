// Login.js
import { signInWithEmailAndPassword } from 'firebase/auth'; // Sử dụng phương thức đăng nhập từ Firebase
import { createBrowserHistory } from 'history';
import React, { Component } from "react";
import { database } from './FireBaseConfig';
import './Login.css';

const history = createBrowserHistory();
class Login extends Component {
    state = {
        email: "",
        password: "",
        loginError: null
    }

    handleLogin = () => {
        const email = this.state.email;
        const password = this.state.password;

        signInWithEmailAndPassword(database, email, password)
            .then(data => {
                console.log(data, 'authData');
                alert("Đăng nhập thành công!");
                // Không chuyển hướng sau khi đăng nhập thành công
                history.push('/home');
                window.location.reload();
            })
            .catch(error => {
                console.error("Lỗi đăng nhập:", error);
                this.setState({ loginError: "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập." });
            });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>
                {this.state.loginError && <div className="error">{this.state.loginError}</div>}
                <button onClick={() => this.handleLogin()}>Login</button>
            </div>
        );
    }
}

export default Login;
