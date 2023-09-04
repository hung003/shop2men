import "bootstrap-icons/font/bootstrap-icons.css"; // Import CSS từ Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS từ Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass:""
        };
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleChangePass = (event) => {
        this.setState({
            pass: event.target.value
        });
    }

    handleSignin=(event)=>{
        event.preventDefault()
        alert(this.state)
    }
    render() {
        return (
            <div>
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-sm-8 col-lg-5">
                            <div className="card bg-primary">
                                <div className="card-header text-white">
                                    <h4 className="card-title mb-0"><i className="bi-grid-3x3-gap-fill"></i> Login</h4>
                                </div>
                                <div className="card-body bg-white rounded-bottom">
                                    <form>
                                        <div className="row mb-3">
                                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">User name</label>
                                            <div className="col-sm">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputEmail3"
                                                    onChange={(event) => this.handleChangeEmail(event)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Password</label>
                                            <div className="col-sm">
                                                <input type="password" className="form-control" id="inputEmail3" 
                                                 onChange={(event) => this.handleChangePass(event)}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-sm-3 col-auto">
                                                <button type="button" className="btn btn-primary"
                                                onClick={(event)=>this.handleSignin(event)}
                                                >Sign in</button>
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

export default Login;
