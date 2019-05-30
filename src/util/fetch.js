
import { message } from 'antd'
import {getLoginmsg, setCookie, getCookie, getDeviceName} from './baseTool'
import { version } from '@/constants/config';
import { toLoginNormal, funcVersionChange, toLoginContradiction } from './AuthUtil';

const BUILD_ARGVS = process.env.BUILD_ARGVS

let ticket = '', operator = '', personName = '';
const repeatMap = new Map();
const headerss = {
    'paramType': 1,         //获取登录依据
    'group': 'rpc-service-group-' + BUILD_ARGVS,  //获取登录依据
    'prefix': 'com.yks',  //获取登录依据
    'version': version, //获取登录依据
    'Content-Type': 'application/json',
}
// const initLoginMessage = () => {
//     if (getLoginmsg()) {
//         ticket = getLoginmsg().ticket;
//         operator = getLoginmsg().userName;
//         personName=getLoginmsg().personName;
//     }
// }

// 文件上传
export const fetchUpload = (url = '/yks/file/server/', fileList) =>{
    if (fileList.length > 0) {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
        });
        let request = new Request(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        return fetch(request)
            .then(response => response.json())
    } else {
        return Promise.reject("请先上传模板文件！");
    }
}

//文件下载
export const downlodFile = (url) => {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

//文件新开窗口下载
export const openDownloadFile = (url) => {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

// function parseParamsToUrl (url, params) {
//     if (params) {
//         const paramsArray = [];
//         //拼接参数
//         Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
//         if (url.search(/\?/) === -1) {
//             url += '?' + paramsArray.join('&')
//         } else {
//             url += '&' + paramsArray.join('&')
//         }
//     }
//     return url;
// }
// export const fetchGet = (url, params, isShowMessage) => {
//     if(!url) {
//         return ;
//     }
//     const repeatKey = `${url}-${JSON.stringify(params)}`
//     if(isShowMessage){
//         if(repeatMap.get(repeatKey) === 1) {
//             return message.warning("请勿重复提交")
//         } else {
//             repeatMap.set(repeatKey, 1)
//         }
//     }
//     url = parseParamsToUrl(url, params)
//     const request = new Request(url, {
//         method: 'GET',
//         credentials: 'include',
//         headers:headers
//     });
//     return fetch(request)
//         .then((response) => {
//             repeatMap.delete(repeatKey)
//             return response.json()
//         })
//         .then(result => {
//             if (result.state === '100002') {  //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
//                 setCookie('session', '', -1);
//                 location.href = '/';
//                 return Promise.resolve(false)
//             }
//             return Promise.resolve(result);
//         })
//         .catch((error) => {
//             repeatMap.delete(repeatKey)
//             if (isShowMessage) {
//                 message.error(error)
//             }
//         })
// }

const computeParams = (url, params, headers = headerss) => {
    if (getLoginmsg()) {
        ticket = getLoginmsg().ticket;
        operator = getLoginmsg().userName;
        personName=getLoginmsg().personName;
    }
    params.ticket     = ticket;
    params.operator   = operator;
    params.personName = personName;
    const moduleUrl = location.pathname //获取登录依据
    const funcVersion = getCookie('funcVersion')

    params.funcVersion = funcVersion
    params.moduleUrl = moduleUrl
    params.deviceName = getDeviceName(); // 获取浏览器类型
    return new Request(url, {
        method: 'POST',
        credentials: 'include',
        body:JSON.stringify(params),
        headers:headers
    });

}
/**
 * url  请求地址
 * params 请求参数
 * flag  0  不提示  1  成功失败都提示  2  失败提示
 */
export const fetchPost = (url, params = {}, flag=0, headers) => {
    if(!url){
        return ;
    }
    const repeatKey = `${url}-${JSON.stringify(params)}`
    if(flag === 1 || flag === 2){
        if(repeatMap.get(repeatKey) === 1) {
            return message.warning("请勿重复提交")
        } else {
            repeatMap.set(repeatKey, 1)
        }
    }
    const request = computeParams(url, params, headers);
    return fetch(request)
        .then(response => {
            repeatMap.delete(repeatKey)
            return response.json()
        })
        .then(result =>{
            parseResult(flag, result);
            return Promise.resolve(result);
        })
        .catch((error) => {
            parseResult(flag, error);
            repeatMap.delete(repeatKey)
            return Promise.resolve(false)
        })
}

const parseResult = (flag, result = {msg: '网络请求失败'}) => {
    if (result.state === '100002') {  //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
        toLoginNormal(result.msg || '登录超时');
    } else if(result.state === '100007'){   //100007为功能权限发生变化，改变询问弹窗visible，显示弹窗
        funcVersionChange(result.data.newFuncVersion);
    }  else if(result.state === '101003'){   //101003为多终端登录互斥，跳转互斥页面
        toLoginContradiction(result.msg);
    } else if(flag === 1 || flag === 2){
        parseMsg(result, flag);
    }
}
const parseMsg = (result, flag) => {
    if(result.state === '000001') {
        if(flag===1){
            return message.success(result.msg);
        }
    } else {
        const resMsg = result.msg || '网络请求失败';
        const msg = `${resMsg}`;
        return message.error(msg);
    }
}
