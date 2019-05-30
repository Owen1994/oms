/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2018/4/17 10:55
 */
import { combineReducers } from 'redux'
export const CustomsCase = (state = {}, action) => {
    switch(action.type){
        case 'CUSTOMS_CLEARANCE_SINGLE_GRASS':
            return action.type;
        default:
            return state
    }
}
const rootReducer = combineReducers({
    CustomsCase
});

export default rootReducer
