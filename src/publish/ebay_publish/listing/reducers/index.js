/**
 *作者: pzt
 *功能描述:  listing reducers
 *参数说明:
 *时间: 2018/7/27 15:48
 */
import { combineReducers } from 'redux'
import ActionType from '../constants'
import {TABS} from '../constants/TabsTitle'
import { draftData } from './draft'
import { alerdayDownData } from './alerdaydown'
import { publishFailData } from './publishfail'
import { publishingData } from './publishing'
import { sellingData } from './selling'
import { alerdayDeleteData } from './alerdaydelete'

/**
 * 页面加载状态
 * @param {*} state 
 * @param {*} action 
 */
const loadingObj = (state={
    loadingDraftState: false,
    loadingPublishingState: false,
    loadingPublishfailState: false,
    loadingSellingState: false,
    loadingAlerdaydownState: false,
    loadingAlerdaydeleteState: false
}, action) => {
    switch(action.type){
        case ActionType.RECEIVE_LOADING_STATE:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

function tablemodel(state = {
    lst : [],
    key:'0',
    total: 0,
    params: {
        pageData: 20,
        pageNumber: 1
    },
    loading: false
}
    , action) {
    switch (action.type) {
        case ActionType.tablemodelInfo:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
}

const listingStateData = (state=TABS, action) => {
    switch(action.type){
        case ActionType.RECEIVE_LISTING_STATE:
            return action.data
        default:
            return state
    }
}
const rootReducer = combineReducers({
    loadingObj,
    draftData,
    alerdayDownData,
    publishFailData,
    publishingData,
    sellingData,
    alerdayDeleteData,
    listingStateData,
    tablemodel
});

export default rootReducer
