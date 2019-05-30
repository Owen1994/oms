import {
    RECEIVE_SUPPLIER_LIST,
} from '../constants';

const supplierData = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case RECEIVE_SUPPLIER_LIST:
        return action.data;
    default:
        return state;
    }
};

export default supplierData;
