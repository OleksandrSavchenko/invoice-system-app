import axios from 'axios';
import * as types from '../constants/types';
import { API_URL } from '../constants/config';

export function customersFetching() {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.get(`${API_URL}/customers`)
            .then((res) => {
                dispatch({
                    type: types.CUSTOMERS_FETCHING,
                    payload: res.data
                });
            })
            .then(() => { dispatch({type: types.LOADING_FINISH}); })
            .catch((err) => {
                console.log(`Customers fetching is failed: ${err}`);
            });
    }
}

export function customerCreate(data) {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.post(`${API_URL}/customers`, data)
            .then(() => dispatch({type: types.LOADING_FINISH}))
            .catch((err) => {
                console.log(`Customer creation is failed: ${err}`);
            });
    }
}

export function customerEdit(data) {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.put(`${API_URL}/customers/${data.public_id}`, data)
            .then(() => dispatch({type: types.LOADING_FINISH}))
            .catch((err) => {
                console.log(`Customer creation is failed: ${err}`)
            });
    }
}

export function customerDelete(id) {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.delete(`${API_URL}/customers/${id}`)
            .then(() => dispatch({type: types.LOADING_FINISH}))
            .catch((err) => {
                console.log(`Customer creation is failed: ${err}`)
            });
    }
}