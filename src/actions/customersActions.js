import axios from 'axios';

import {
    CUSTOMERS_FETCHING,
    LOADING_START,
    LOADING_FINISH
} from '../constants/types';
import { API_URL } from '../constants/config';

export function customersFetching() {
    return dispatch => {
        return axios.get(`${API_URL}/customers`).then((res) => {
            dispatch({
                type: CUSTOMERS_FETCHING,
                payload: res.data
            });
        }).catch((err) => {
            console.log(`Customers fetching is failed: ${err}`)
        })
    }
}

export function customerCreate(data) {
    return dispatch => {
        return axios.post(`${API_URL}/customers`, data).then((res) => {
        }).catch((err) => {
            console.log(`Customer creation is failed: ${err}`)
        })
    }
}

export function customerEdit(data) {
    return dispatch => {
        return axios.put(`${API_URL}/customers/${data.id}`, data).then(() => {
        }).catch((err) => {
            console.log(`Customer creation is failed: ${err}`)
        })
    }
}

export function customerDelete(id) {
    return dispatch => {
        return axios.delete(`${API_URL}/customers/${id}`).then(() => {
        }).catch((err) => {
            console.log(`Customer creation is failed: ${err}`)
        })
    }
}