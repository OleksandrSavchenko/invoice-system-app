import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registration } from '../actions/authorizationActions';

class Registration extends Component {
    render() {
        return (
            <div className="container-md">
                <h1>Registration</h1>
                <br/>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <label>Password Confirmation</label>
                    <input className="form-control" type="text"/>
                </div>
                <div className="form-group">
                    <div className="btn btn-primary">Sign Up</div>
                </div>
            </div>
        )
    }
}

export default connect(null, { registration })(Registration);