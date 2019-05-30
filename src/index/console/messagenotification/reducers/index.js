import { combineReducers } from 'redux';
import { getMyReceiveList, getMySendList, receiveLoadState } from './TableList';

const rootReducer = combineReducers({
    getMyReceiveList,
    getMySendList,
    receiveLoadState,
});

export default rootReducer;
