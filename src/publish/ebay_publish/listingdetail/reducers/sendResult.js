import {SAVE_SENDFORM_DATA,SKU_ISEXIST} from '../constants/reducerTypes'

export const sendResult = (state = {}
    , action) => {
    switch (action.type){
        case SAVE_SENDFORM_DATA:
            return action.data;
        case SKU_ISEXIST:
            return action.data
        default:
            return state
    }
};
