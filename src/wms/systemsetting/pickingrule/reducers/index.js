import { combineReducers } from 'redux';
import {
    parts,
    loadingPartState,
} from './part';
import * as TYPES from '../constants';

// 平台优先级
const platformmodaldata = (state = [], action) => {
    switch (action.type) {
    case TYPES.ADD_PLATFORM_ITEM: // 新增行
        state.splice(0, 0, {
            key: '',
            platformName: '',
            priority: '',
            operator: '',
            operationTime: '',
        });
        return [...state];
    case TYPES.DELETE_PLATFORM_ITEM: // 删除行
        state.splice(action.index, 1);
        return [...state];
    case TYPES.MODIFY_PLATFORM_ITEM: // 输入
        state[0][action.inputType] = action.value;
        // state[action.index].key = action.key;
        return [...state];
    case TYPES.INIT_PLATFORM_ITEM: // 初始化
        state = [];
        state = action.value;
        return [...state];
    case TYPES.CLEAR_PLATFORM_ITEM: // 清空
        return [];
    default:
        return state;
    }
};

// 渠道优先级
const channelmodaldata = (state = [], action) => {
    switch (action.type) {
    case TYPES.ADD_CHANNEL_ITEM: // 新增行
        state.splice(0, 0, {
            key: '',
            freight: '',
            channel: '',
            priority: '',
            operator: '',
            operationTime: '',
        });
        return [...state];
    case TYPES.DELETE_CHANNEL_ITEM: // 删除行
        state.splice(action.index, 1);
        return [...state];
    case TYPES.MODIFY_CHANNEL_ITEM: // 输入
        state[0][action.inputType] = action.value;
        // state[action.index].key = action.key;
        return [...state];
    case TYPES.INIT_CHANNEL_ITEM: // 初始化
        state = [];
        state = action.value;
        return [...state];
    case TYPES.CLEAR_CHANNEL_ITEM: // 清空
        return [];
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    parts,
    loadingPartState,
    platformmodaldata,
    channelmodaldata,
});

export default rootReducer;
