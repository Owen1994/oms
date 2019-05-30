import {classifyInfo1,classifyInfo2,classifyInfo3,imgInfo} from "../actions/index"
import {clearDetail} from "../../common/action/index"
const classify1 = function(state=[],action){
    switch(action.type){
        case classifyInfo1 :
            return action.payload
        default :
            return state
    }
}
const classify2 = function(state=[],action){
    switch(action.type){
        case classifyInfo2 :
            return action.payload
        default :
            return state
    }

}
const classify3 = function(state=[],action){
    switch(action.type){
        case classifyInfo3 :
            return action.payload
        default :
            return state
    }

}
const imgData = function(state={},action){
    switch(action.type){
        case imgInfo :
            return action.payload
        case clearDetail :
            return {}
        default :
            return state
    }

}
export default {
    classify1,
    classify2,
    classify3,
    imgData
}