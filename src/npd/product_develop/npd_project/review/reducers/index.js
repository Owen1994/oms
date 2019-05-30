import {data,search,add,remove} from "../actions/index"
import {deepCloneObj} from "../../../../../util/baseTool"
// 添加函数
var addFn =  (function(){
    var key = 0;
    var bindvendorParamsTemp = {
        currency:1,
        linkman:"",
        QQ:"",
        linkOf1688:"",
        supplierName:"",
        price:"",
        phone:"",
        supplierAdress:"",
        supplierCode:"",
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
var temp = ["supplierName","linkman","phone","QQ","supplierAdress"]
var fill = (state,value)=>{
    var {data,i} = value;
    state[i] = {
        ...state[i],
        supplierName:data.vendorsName,
        linkman:data.contact && data.contact.name,
        phone:data.contact && data.contact.tel,
        QQ:data.contact && data.contact.qq,
        supplierAdress:data.address,
    }
    return [...state]
}

const bindvendorParamsData = (state=[
    addFn()
], action) => {
    var params = action.payload;
    switch(action.type) {
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