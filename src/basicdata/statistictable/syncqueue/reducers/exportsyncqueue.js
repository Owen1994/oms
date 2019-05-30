import {
    RECEIVE_EXPORT_LIST,
} from '../constants/ActionTypes';

const procurementData = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_EXPORT_LIST:
        return action.data;
    default:
        return state;
    }
};

export default procurementData;
