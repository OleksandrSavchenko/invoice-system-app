import {
    INVOICES_FETCHING_START,
    INVOICES_FETCHING,
    INVOICES_FETCHING_FINISH
} from '../constants/types';

let initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case INVOICES_FETCHING:
            return action.payload;
        default:
            return state;
    }
}