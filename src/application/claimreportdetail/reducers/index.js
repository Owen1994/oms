import {combineReducers} from 'redux'
import {
    baseInfo,PaginationmodelInfo,claimreportdetailInfo,claimeditmodalInfo,claimletterdeaileInfo,claimlettableeditInfo,claimlettablelcaimletterInfo
} from '../actions'
import {claimreportInfo} from "../../claimreport/actions";
import {copymodalInfo} from "../../../user/rolemanagement/actions";

function Infos(state = {
    params:{
        asin:"",
        sellerSku:"",
        fnsku:"",
        caseId:"",
        isReimOk:"100",
        processStatus:"100",
        reimType:"100"
    }
}, action) {
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
function claimreportdetailmodule(state = {
                                     data: [],
                                     count: 0,
                                     loading:false,
                                 }
    , action) {
    switch (action.type) {
        case claimreportdetailInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function claimlettableeditmodule(state = {
                                     data: [],
                                     count: 0,
                                     loading:false,
                                 }
    , action) {
    switch (action.type) {
        case claimlettableeditInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function claimlettablelcaimlettermodule(state = {
                                     data: [],
                                 }
    , action) {
    switch (action.type) {
        case claimlettablelcaimletterInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function Paginationmodel(state = {
                             current: 1,
                             total:0,
                             pageSize:20,
                         }
    , action) {
    switch (action.type) {
        case PaginationmodelInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

function claimeditmodal(state = {
                            title: "编辑", ModalText: '内容',
                            visible: false,
                        }
    , action) {
    switch (action.type) {
        case claimeditmodalInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function claimletterdeailemodal(state = {
                            title: "编辑", ModalText: '内容',
                            visible: false,
                        }
    , action) {
    switch (action.type) {
        case claimletterdeaileInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
const rootReducer = combineReducers({
 Infos,Paginationmodel,claimreportdetailmodule,claimeditmodal,claimletterdeailemodal,claimlettableeditmodule,claimlettablelcaimlettermodule
})

export default rootReducer
