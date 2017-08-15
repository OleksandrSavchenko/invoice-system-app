import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

export default ({ isAuthenticated, logout }) => {
    const menu = (
        <ul className="nav navbar-nav">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/">Invoices</Link></li>
        </ul>
    );

    const rightMenu = (
        <ul className="nav navbar-nav navbar-right">
            <li><a href="#" onClick={(e) => {
                e.preventDefault();
                logout();
                browserHistory.push('/login');
            }}>Logout</a></li>
        </ul>
    );

    const registrationMenu = (
        <ul className="nav navbar-nav navbar-right">
            <li><Link to="/registration">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Invoice App</Link>
                </div>
                <div className="collapse navbar-collapse">
                    { isAuthenticated ? menu : null}
                    { !isAuthenticated ? registrationMenu : null}
                    { isAuthenticated ? rightMenu : null }
                </div>
            </div>
        </nav>
    );
}