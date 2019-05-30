import {
    IS_LOADING, MY_RECEIVE_LIST, MY_SEND_LIST, Updata_Send_Data, Updata_Review_Data
} from '../constants';


export const getMyReceiveList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case MY_RECEIVE_LIST:
        return action.data;// 接收发送过来的action,key要一致
    case Updata_Review_Data:
        action.data.list[action.data.index].viewState = 1;
        return action.data;
    default:
        return state;
    }
};
export const getMySendList = (state = { list: [], total: 0 }, action) => {
    switch (action.type) {
    case MY_SEND_LIST:
        return action.data;// 接收发送过来的action,key要一致
    case Updata_Send_Data:
        action.data.list[action.data.index].viewState = 1;
        return action.data;
    default:
        return state;
    }
};
export const receiveLoadState = (state = false, action) => {
    switch (action.type) {
    case IS_LOADING:
        return action.state;
    default:
        return state;
    }
};

// export const updataSendList = (state = {index: 0, data:[]}, action) => {
//     switch (action.type) {
//         case Updata_Send_Data:
//             data[index].viewState = 1;
//             return action.state;
//         default:
//             return state;
//     }
// };
