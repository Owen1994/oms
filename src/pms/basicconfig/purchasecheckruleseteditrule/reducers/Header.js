import {
    FORM_DATA,
} from '../constants/ActionTypes';

const headerData = (state = {}, action) => {
    switch (action.type) {
    case FORM_DATA:
        return {
            ...state,
            ...action.data,
        };
    default:
        return state;
    }
};


export default headerData;
