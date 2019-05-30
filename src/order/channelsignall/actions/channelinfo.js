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
} from '../constants/actionTypes'

export const receiveChannelInfoData = (data, type) => ({
    type: CHANNEL_INFO_TYPE,
    data
});

export const receiveHandleChangeData = (index, filed, value, type) => ({
    type,
    index,
    filed,
    value,
});

export const receiveAddItemData = (type) => ({
    type
});

export const receiveMoveItemData = (index, type) => ({
    type,
    index
});

// 获取渠道信息
export const getNewChannelInfoAction = data => dispatch => {
    return dispatch(receiveChannelInfoData({...data}))
};

// 修改
export const getHandleChangeAction = (index, filed, value, type) => dispatch => {
    if(type === 1){
        type = HANDLE_CHANGE_DATA
    }else if(type === 2){
        type = CHANGE_SIGN_DATA
    }else if(type === 3){
        type = CHANGE_THIRD_DATA
    }else if(type === 4){
        type = CHANGE_TRUCKING_DATA
    }
    return dispatch(receiveHandleChangeData(
        index,
        filed,
        value,
        type,
    ))
};

// 新增
export const getAddItemAction = (type) => dispatch => {
    if(type === 1){
        type = ADD_ITEM_DATA
    }else if(type === 2){
        type = ADD_SIGN_DATA
    }else if(type === 3){
        type = ADD_THIRD_DATA
    }else if(type === 4){
        type = ADD_TRUCKING_DATA
    }
    return dispatch(receiveAddItemData(type))
};

// 删除
export const getMoveItemAction = (index, type) => dispatch => {
    if(type === 1){
        type = MOVE_ITEM_DATA
    }else if(type === 2){
        type = MOVE_SIGN_DATA
    }else if(type === 3){
        type = MOVE_THIRD_DATA
    }else if(type === 4){
        type = MOVE_TRUCKING_DATA
    }
    return dispatch(receiveMoveItemData(index, type))
};