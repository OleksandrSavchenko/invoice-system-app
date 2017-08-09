import { combineReducers } from 'redux';

import authorization from './authorizationReducer';
import invoices from './invoicesReducer';
import customers from './customersReducer';
import products from './productsReducer';
import loading from './loadingReducer';

export default combineReducers({
    authorization,
    invoices,
    customers,
    products,
    loading
});