import axios from 'axios';

import { PRODUCTS_FETCHING } from '../constants/types';
import { API_URL } from '../constants/config';

export function productsFetching() {
    return dispatch => {
        return axios.get(`${API_URL}/products`).then((res) => {
            dispatch({
                type: PRODUCTS_FETCHING,
                payload: res.data
            });
        }).catch((err) => {
            console.log(`Products fetching is failed: ${err}`);
        })
    }
}