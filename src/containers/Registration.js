import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registration } from '../actions/authorizationActions';

class Registration extends Component {
    constructor(props) {
        super(props);

        this.name = '';
        this.email = '';
        this.password = '';
        this.passwordConfirmation = '';
    }

    onSubmit() {
        const user = {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value
        };
        this.props.registration(user);
    }

    render() {
        return (
            <div className="container-md">
                <h1>Registration</h1>
                <br/>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        ref={(input) => this.name = input}
                    />
                </div>
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
                    <label>Password Confirmation</label>
                    <input
                        className="form-control"
                        type="text"
                        ref={(input) => this.passwordConfirmation = input}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={::this.onSubmit}>Sign Up</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { registration })(Registration);