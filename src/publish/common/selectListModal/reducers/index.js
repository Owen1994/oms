import {
    searchValuesInfo
} from '../actions'

function searchValues(state = {
    title: "选择销售平台", ModalContent: '内容',
    visible: false, type: 'multiple', data: [], searchabled: true,tags:[],current: 1, pageSize: 10
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
    searchValues
};

export default rootReducer
