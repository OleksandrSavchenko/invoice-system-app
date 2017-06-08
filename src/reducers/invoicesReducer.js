import {
    INVOICES_FETCHING_START,
    INVOICES_FETCHING,
    INVOICES_FETCHING_FINISH
} from '../constants/types';

let initialState = {
    data: []
};

export default (state = [], action) => {
    switch (action.type) {
        case INVOICES_FETCHING:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}