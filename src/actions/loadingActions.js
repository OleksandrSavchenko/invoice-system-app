import { LOADING_START, LOADING_FINISH } from '../constants/types';

export function loadingStart() {
    return dispatch => {
        dispatch({ type: LOADING_START });
    };
}

export function loadingFinish() {
    return dispatch => {
        dispatch({ type: LOADING_FINISH });
    }
}