import {data,search,add,remove,defualtData,clear} from "../actions/index"
import {deepCloneObj} from "../../../../../util/baseTool"
// 添加函数
var addFn =  (function(){
    var key = 0;
    var bindvendorParamsTemp = {
        currency:1,
        linkman:"",
        qq:"",
        linkOf1688:"",
        supplierName:"",
        price:"",
        phone:"",
        supplierAdress:"",
        supplierCode:"",
        dealTime: "",
        dealTimeUnit: "",
        minBooking: 0,
        minBookingUnit: "",
    }
    return ()=>{
        var d = deepCloneObj(bindvendorParamsTemp);
        d.key = key;
        key ++ ;
        return d
    }
}());
// 删除函数
var removeFn = (state,key)=>{
    var i =0,
        l = state.length;
    for(;i<l;i++){
        if(key ===state[i].key ){
            state.splice(i,1)
            return [...state]
        }
    }
}
// 填充查询到的供应商信息
var temp = ["supplierName","linkman","phone","qq","supplierAdress"]
var fill = (state,value)=>{
    var {data,i} = value;
    state[i] = {
        ...state[i],
        supplierName:data.vendorsName,
        linkman:data.contactName,
        phone:data.contactTel,
        qq:data.contactQQ,
        supplierAdress:data.address,
    }
    return [...state]
}

const bindvendorParamsData = (state=[
    addFn()
], action) => {
    var params = action.payload;
    switch(action.type) {
        case clear:
            return [addFn()]
        case defualtData:
            return params
        case search:
            return fill(state,params)
        case add:
            return [...state,addFn()]
        case remove:
            return removeFn(state,params)
        case data:
            state[params[1]][params[2]] = params[0]
            return [...state]
        default:
            return state
    }
};

export default {
    bindvendorParamsData
}