import * as types from '../constants/types';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';

const API_URL = 'http://127.0.0.1:5000';

export function setCurrentUser(user) {
    return {
        type: types.SET_CURRENT_USER,
        user
    }
}

export function registration(data) {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.post(`${API_URL}/user`, data)
            .then(res => console.log(res.data))
            .then(() => dispatch({type: types.LOADING_FINISH}))
    }
}

export function login(data) {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        return axios.post(`${API_URL}/login`, data)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch({
                    type: types.SET_CURRENT_USER,
                    user: jwt.decode(token)
                })
            })
            .then(() => dispatch({type: types.LOADING_FINISH}));

    }
}