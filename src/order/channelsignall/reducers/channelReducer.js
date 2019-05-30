import {combineReducers} from 'redux';
import {
    CHANNEL_INFO_TYPE,
    HANDLE_CHANGE_DATA,
    ADD_ITEM_DATA,
    MOVE_ITEM_DATA,
    CHANGE_SIGN_DATA,
    ADD_SIGN_DATA,
    MOVE_SIGN_DATA,
    CHANGE_THIRD_DATA,
    ADD_THIRD_DATA,
    MOVE_THIRD_DATA,
    CHANGE_TRUCKING_DATA,
    ADD_TRUCKING_DATA,
    MOVE_TRUCKING_DATA,
} from '../constants/actionTypes';
import { datasaddkey } from "util/baseTool";

const channelInfoData = ( state = {}, action) => {
    switch (action.type){
        case CHANNEL_INFO_TYPE:
            state = action.data.channel;
            return {...state};
        default:
            return state;
    }
};

const signInfoData = ( state = {
    data: [],
    oldLength: 0,
    }, action) => {
    switch (action.type){
        case CHANNEL_INFO_TYPE:
            state.data = action.data.sign;
            state.oldLength = state.data.length;
            datasaddkey(state.data);
            return {...state};
        case CHANGE_SIGN_DATA:
            let fileds = action.filed;
            let values = action.value;
            let data = state.data;
            if(action.filed.length > 0){
                fileds.forEach((filed, index) => {
                    data[action.index][filed] = values[index]
                })
            }
            // state.data[action.index][action.filed] = action.value;
            return {...state};
        case ADD_SIGN_DATA:
            state.data.push({key: Date.now(),'isAvailable': '0', 'signType': 0, 'isNeedChannelCodeTrackNo': '1'});
            return {...state};
        case MOVE_SIGN_DATA:
            state.data.splice(action.index, 1);
            return {...state};
        default:
            return state;
    }
};

const warehouseInfoData = ( state = {
      data: [],
      oldLength: 0,
    }, action) => {
    switch (action.type){
        case CHANNEL_INFO_TYPE:
            state.data = action.data.wareHouse;
            state.oldLength = state.data.length;
            datasaddkey(state.data);
            return {...state};
        case HANDLE_CHANGE_DATA:
            let fileds = action.filed;
            let values = action.value;
            let data = state.data;
            if(action.filed.length > 0){
                fileds.forEach((filed, index) => {
                    data[action.index][filed] = values[index]
                })
            }
            // state.data[action.index][action.filed] = action.value;
            return {...state};
        case ADD_ITEM_DATA:
            state.data.push({key: Date.now(),'isAvailable': '0'});
            return {...state};
        case MOVE_ITEM_DATA:
            state.data.splice(action.index, 1);
            return {...state};
        default:
            return state;
    }
};

const thirdInfoData = ( state = {
    data: [],
    oldLength: 0,
}, action) => {
    switch (action.type){
        case CHANNEL_INFO_TYPE:
            state.data = action.data.mapping;
            state.oldLength = state.data.length;
            datasaddkey(state.data);
            return {...state};
        case CHANGE_THIRD_DATA:
            let fileds = action.filed;
            let values = action.value;
            let data = state.data;
            if(action.filed.length > 0){
                fileds.forEach((filed, index) => {
                    data[action.index][filed] = values[index]
                })
            }
            // state.data[action.index][action.filed] = action.value;
            return {...state};
        case ADD_THIRD_DATA:
            state.data.push({key: Date.now(),'isAvailable': '0'});
            return {...state};
        case MOVE_THIRD_DATA:
            state.data.splice(action.index, 1);
            return {...state};
        default:
            return state;
    }
};

const truckingInfoData = ( state = {
    data: [],
    oldLength: 0,
}, action) => {
    switch (action.type){
        case CHANNEL_INFO_TYPE:
            state.data = action.data.trucking;
            state.oldLength = state.data.length;
            datasaddkey(state.data);
            return {...state};
        case CHANGE_TRUCKING_DATA:
            let fileds = action.filed;
            let values = action.value;
            let data = state.data;
            if(action.filed.length > 0){
                fileds.forEach((filed, index) => {
                    data[action.index][filed] = values[index]
                })
            }
            return {...state};
        case ADD_TRUCKING_DATA:
            state.data.push({key: Date.now(),'isAvailable': '0', truckingNumber: -1});
            return {...state};
        case MOVE_TRUCKING_DATA:
            state.data.splice(action.index, 1);
            return {...state};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    channelInfoData,
    signInfoData,
    warehouseInfoData,
    thirdInfoData,
    truckingInfoData,
});
export default rootReducer