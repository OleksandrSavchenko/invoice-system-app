import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    const menu = (
        <div className="navbar-left">
            <ul className="nav navbar-nav">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/customers">Customers</Link></li>
                <li><Link to="/">Invoices</Link></li>
            </ul>
        </div>
    );

    const registrationMenu = (
        <div className="navbar-right">
            <ul className="nav navbar-nav">
                <li><Link to="/registration">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    );

    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/">Invoice App</Link>
            </div>
            { props.isAuthenticated ? menu : null}
            { !props.isAuthenticated ? registrationMenu : null}
        </nav>
    );
}