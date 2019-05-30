import {
    RECEIVE_IMPORT_LIST,
} from '../constants/ActionTypes';

const supplierData = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_IMPORT_LIST:
        return action.data;
    default:
        return state;
    }
};

export default supplierData;
