import {combineReducers} from 'redux';
import {
    RECEIVE_LIST,
    LOADING_LIST,
    RECEIVE_PLATFORM_LIST,
    ADD_ITEM,
    DELETE_ITEM,
    MODIFY_ITEM,
    EDIT_ITEM,
    SAVE_ITEM,
    INIT_ITEM,
    CLEAR_ITEM,
} from "../actions";

const skuReplacementListData = (state = {data: []}, action) => {
    switch (action.type){
        case RECEIVE_LIST:
            return action.data;
        default:
            return state;
    }
}

const loadingState = (state = false, action) => {
    switch (action.type) {
    case LOADING_LIST:
        return action.state;
    default:
        return state;
    }
};

const platformList = (state = [], action) => {
    switch (action.type){
        case RECEIVE_PLATFORM_LIST:
            return action.data;
        default:
            return state;
    }
}

// 执行动作数据
const actiondata = (state = [], action) => {
    switch (action.type) {
    case ADD_ITEM: // 新增行
        state.splice(0, 0, {
            srcSku: '',
            desSku: '',
            desPrefixSuffix: '',
            ifEditing: true,
        });
        return [...state];
    case DELETE_ITEM: // 删除行
        state.splice(action.index, 1);
        return [...state];
    case MODIFY_ITEM: // input输入
        state[action.index][action.inputType] = action.value;
        return [...state];
    case SAVE_ITEM: // 保存
        state[action.index].ifEditing = false;
        return [...state];
    case EDIT_ITEM: // 点击编辑
        state[action.index].ifEditing = true;
        return [...state];
    case INIT_ITEM: // 初始化
        return [...action.data];
    case CLEAR_ITEM: // 清空
        return [];
    default:
        return state;
    }
};

const RooterReducer = combineReducers({
    skuReplacementListData,
    loadingState,
    platformList,
    actiondata,
});

export default RooterReducer;