import { combineReducers } from 'redux';
import {
    listdata,
    loadingTableState,
} from './listdata';
import {
    RECEIVE_MYMALL_TAB_STATE,
} from '../constants';


//mymall订单页签数据reducer
const mymallOrderTabState = (state={data: []}, action) => {
    switch(action.type){
        case RECEIVE_MYMALL_TAB_STATE:
            return action.data
        default:
            return state    
    }
}

const rootReducer = combineReducers({
    listdata,
    loadingTableState,
    mymallOrderTabState,
});

export default rootReducer;
