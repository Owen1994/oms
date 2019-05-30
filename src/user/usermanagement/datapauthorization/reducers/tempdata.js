import * as types from '../constants';

const tempdata = (state = { index: 0 }, action) => {
    switch (action.type) {
    case types.SET_TEMP_DATA:
        return {
            ...state,
            ...action.data,
        };
    case types.RESET_DATA:
        return { index: 0 };
    default:
        return state;
    }
};

export default tempdata;
