import { GET_ORDER_DETAILS_LOG } from '../constants';

const orderDetailsLogState = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case GET_ORDER_DETAILS_LOG:
        return action.data;
    default:
        return state;
    }
};

export default orderDetailsLogState;
