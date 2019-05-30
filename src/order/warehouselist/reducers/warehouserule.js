/**
*作者: 任贸华
*功能描述: 指定发货仓数据管理
*参数说明:
*时间: 2018/4/16 11:31
*/
import {
    warehouseruleInfo,
} from '../actions/warehouserule'


function warehouserule(state = {
                          title: "修改规则", ModalContent: '内容',
                          visible: false,type:'multiple',type:false
                      }
    , action) {
    switch (action.type) {
        case warehouseruleInfo:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


const rootReducer = {
    warehouserule
}

export default rootReducer
