import React from 'react';
import { Link } from 'react-router';

export default (props) => {
    return (
        <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/">Invoice App</Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/customers">Customers</Link></li>
                        <li><Link to="/">Invoices</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}