import { CUSTOMERS_FETCHING} from '../constants/types';

let initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMERS_FETCHING:
            return action.payload;
        default:
            return state;
    }
}