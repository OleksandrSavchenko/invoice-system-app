import { PRODUCTS_FETCHING } from '../constants/types';

let initialState = {
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_FETCHING:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}