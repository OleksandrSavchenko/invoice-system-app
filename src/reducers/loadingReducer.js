import { LOADING_START, LOADING_FINISH } from '../constants/types';

let initialState = {
    status: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_START:
            return { status: true };
        case LOADING_FINISH:
            return { status: false };
        default:
            return state;
    }
}