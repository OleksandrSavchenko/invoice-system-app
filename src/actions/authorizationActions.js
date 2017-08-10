import * as types from '../constants/types';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import { API_URL } from '../constants/config';

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
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwt.decode(token)));
                browserHistory.push('/');
            })
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
                dispatch(setCurrentUser(jwt.decode(token)));
                browserHistory.push('/');
            })
            .then(() => dispatch({type: types.LOADING_FINISH}));

    }
}

export function logout() {
    return dispatch => {
        dispatch({type: types.LOADING_START});
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
        browserHistory.push('/login');
        dispatch({type: types.LOADING_FINISH});
    }
}