import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authorizationActions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.email = '';
        this.password = '';
    }

    onSubmit() {
        const user = {
            email: this.email.value,
            password: this.password.value
        };
        this.props.login(user);
    }

    render() {
        return (
            <div className="container-md">
                <h1>Login</h1>
                <br/>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="text"
                        ref={(input) => this.email = input}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="text"
                        ref={(input) => this.password = input}
                    />
                </div>
                <div className="form-group">
                    <div className="btn btn-primary" onClick={::this.onSubmit}>Login</div>
                </div>
            </div>
        )
    }
}

export default connect(null, { login })(Login);