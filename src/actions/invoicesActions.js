import axios from 'axios';
import * as types from '../constants/types';
import { API_URL } from '../constants/config';

export function invoicesFetching() {
    return dispatch => {
        dispatch({ type: types.LOADING_START });
        axios.get(`${API_URL}/invoices`)
            .then((res) => {
                dispatch({
                    type: types.INVOICES_FETCHING,
                    payload: res.data
                });
            })
            .then(() => { dispatch({type: types.LOADING_FINISH}); })
            .catch((err) => {
            console.log(`Invoices loading is failed: ${err}`);
        }) ;
    }
}