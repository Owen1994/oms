import { combineReducers } from 'redux';
import {
    DIPUTE_LIST, DIPUTE_LOADING, COMMENT_LIST, COMMENT_LOADING, COMMENT_COUNT
} from '../constants';

// 纠纷列表
const disputelist = (state = { data: [], total: 0 }, action) => {
    switch (action.type) {
    case DIPUTE_LIST:
        return action.payload;
    default:
        return state;
    }
};

// 纠纷列表loading
const disputeLoading = (state = false, action) => {
    switch (action.type) {
    case DIPUTE_LOADING:
        return action.payload;
    default:
        return state;
    }
};

// 评论列表
const commentlist = (state = { data: [] }, action) => {
    switch (action.type) {
    case COMMENT_LIST:
        return action.payload;
    default:
        return state;
    }
};

// 评论状态统计
const commentCount = (state = {}, action) => {
    switch (action.type) {
    case COMMENT_COUNT:
        return action.payload;
    default:
        return state;
    }
};

// 评论列表loading
const commentLoading = (state = false, action) => {
    switch (action.type) {
    case COMMENT_LOADING:
        return action.payload;
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    disputelist,
    disputeLoading,
    commentlist,
    commentCount,
    commentLoading,
});

export default rootReducer;
