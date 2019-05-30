/**
 *作者: 任贸华
 *功能描述: 弹窗数据
 *参数说明:
 *时间: 2018/4/16 11:02
 */
import {
    searchValuesInfo, searchValuesPaginationInfo, serchVluesListInfo
} from '../actions'

function serchValuesList(state = {}, action) {
    switch (action.type) {
        case serchVluesListInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function searchValuesPagination(state = {
                                    current: 1,
                                    total: 0,
                                    pageSize: 10,
                                }
    , action) {
    switch (action.type) {
        case searchValuesPaginationInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


function searchValues(state = {
                          title: "选择销售平台", ModalContent: '内容',
                          visible: false, type: 'multiple', data: [], searchabled: true, tags: [], num: 'infinity',
                      }
    , action) {
    switch (action.type) {
        case searchValuesInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
    serchValuesList, searchValuesPagination, searchValues
}

export default rootReducer
