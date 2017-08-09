import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Registration from './containers/Registration';
import Login from './containers/Login';
import Invoices from './containers/invoices/Invoices';
import Customers from './containers/Customers';
import Products from './containers/Products';
import CreateInvoice from './containers/invoices/CreateInvoice';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Invoices} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/customers" component={Customers} />
        {/*<Route path="/products" component={Products} />*/}
        <Route path="/create-invoice" component={CreateInvoice}/>
    </Route>
);