import {
    RECEIVE_PROCUREMENT_LIST,
} from '../constants';

const procurementData = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_PROCUREMENT_LIST:
        return action.data;
    default:
        return state;
    }
};

export default procurementData;
