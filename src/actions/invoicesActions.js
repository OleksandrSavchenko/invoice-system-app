import axios from 'axios';

import {
    INVOICES_FETCHING,
    LOADING_START,
    LOADING_FINISH
} from '../constants/types';
import { API_URL } from '../constants/config';

export function invoicesFetching() {
    return dispatch => {
        dispatch({ type: LOADING_START });
        axios.get(`http://localhost:5000/invoices`)
            .then((res) => {
                console.log(res.data);
                // return dispatch({
                //     type: INVOICES_FETCHING,
                //     payload: res.data
                // });
            })
            .then(() => {
                dispatch({ type: LOADING_FINISH });
            })
            .catch((err) => {
            console.log(`Invoices loading is failed: ${err}`);
        }) ;
    }
}