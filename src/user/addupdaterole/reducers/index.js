import { combineReducers } from 'redux';

import {
    baseInfo, userList, basicInformationInfo, roleuseractionInfo,
} from '../actions';

function Infos(state = {}, action) {
    switch (action.type) {
    case baseInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

function userlistmodel(state = {
    data: [],
    count: 0,
},
action) {
    switch (action.type) {
    case userList:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

function roleusermodel(state = {
    datas: [],
    count: 0,
},
action) {
    switch (action.type) {
    case roleuseractionInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}

function basicInformationmodule(state = {
    data: { lstUserName: [], lstOwner: [], lstUser: [],lstOwnerInfo: [] },
    count: 0,
},
action) {
    switch (action.type) {
    case basicInformationInfo:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}


const rootReducer = combineReducers({
    Infos, userlistmodel, basicInformationmodule, roleusermodel,
});

export default rootReducer;
