import { combineReducers } from 'redux';

import invoices from './invoicesReducer';
import customers from './customersReducer';
import products from './productsReducer';
import loading from './loadingReducer';

export default combineReducers({
    invoices,
    customers,
    products,
    loading
});