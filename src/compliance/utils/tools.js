import { getCookie } from "./cookie.js";

/**
 * 获取登录用户session
 * @param <Number> 获取cookie类型， ticket, username, funcVersion
 */
export const session = (type) => {
    let session = '';
    if (type === 'ticket') {
        session = getCookie('ticket');
    } else if (type === 'username') {
        session = getCookie('username');
    } else if (type === 'funcVersion') {
        session = getCookie('funcVersion');
    } else {
        session = null;
    }
    return session
}

/**
 * 给响应的数据加上key
 * @param <Number> obj 响应的对象
 */
export const addKey = (obj) => {
    for (var key in obj) {
        obj[key].key = parseInt(key) + 1;
    }
    return obj
}

/**
 * 根据状态转换名称
 * @param <Number> state 状态
 * @param <Aarray<Object>> data 所有状态映射
 */
export const getStateName = (state, data) => {
    var result = '';
    for(var key in data){
        if(data[key].id === state){
            result = data[key].name;
        }
    }
    return result
}

/**
 * 去除数组中的空值
 * @param <Array> arr 数组参数
 */
export const notempty  = (arr) => {
    var result = [];
    for(var key in arr){
        if(arr[key] !== null){
            result.push(arr[key]);
        }
    }
    return result
}

/**
 *  取数组对象中的key值，重新组装一个数组
 * @param <Array> arr 数组参数
 */
export const getArrKey  = (arr) => {
    var result = [];
    for(var key in arr){
        result.push(arr[key].key)
    }
    return result
}

/**
 *  http图片转换https://xxx.youkeshu.com/angentImg/pic_url=原链接
 */
export const angentPicUrl = (url) => {
    var result = '';
    var index = url.indexOf('http://');
    if(index > -1){
        result = '/angentImg/?type=image&pic_url=' + url;
    }else {
        result = url;
    }
    return result
}

