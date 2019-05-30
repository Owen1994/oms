/**
 *作者: 任贸华
 *功能描述: axios请求数据配置文件
 *参数说明:
 *时间: 2018/4/2 14:25
 */
import axios from 'axios'
import { toLoginNormal, funcVersionChange, toLoginContradiction } from './AuthUtil';
import {getLoginmsg, getCookie, getDeviceName} from './baseTool'
import {message,} from 'antd'
import { version } from '@/constants/config';

const BUILD_ARGVS = process.env.BUILD_ARGVS
let cancelToken = axios.CancelToken;
axios.defaults.timeout = 60*1000;
axios.defaults.headers['Content-Type'] = "application/json";//headers头配置
axios.noRepeat = {}
axios.defaults.headers.common['paramType'] = '1'  //获取登录依据
axios.defaults.headers.common['group'] = 'rpc-service-group-' + BUILD_ARGVS  //获取登录依据
axios.defaults.headers.common['prefix'] = 'com.yks'  //获取登录依据
axios.defaults.headers.common['version'] = version  //获取登录依据

//修改请求配置
axios.interceptors.request.use(config => {
    const moduleUrl = location.pathname; //获取登录依据
    const funcVersion = getCookie('funcVersion');
    let ticket = '', operator = '', personName = '';
    if (getLoginmsg()) {
        ticket = getLoginmsg().ticket
        operator = getLoginmsg().userName
        personName=getLoginmsg().personName;
        axios.defaults.headers.common['ticket'] = getLoginmsg().ticket  //获取登录依据
    }
    if (config.method == 'post') {
        if (config.data) {
            config.data.ticket = ticket
            config.data.operator = operator
            config.data.funcVersion = funcVersion
            config.data.moduleUrl = moduleUrl
            config.data.personName = personName
        } else {
            config.data = {ticket, operator, moduleUrl, funcVersion, personName}
        }
        config.data.deviceName = getDeviceName();
    }
    config.cancelToken = new cancelToken((c) => {
        const uniqueKey = `${config.url}|${JSON.stringify(config.data)}`
        if (axios.noRepeat[uniqueKey]) {
            c('请勿重复提交')
        } else {
            axios.noRepeat[uniqueKey] = true
        }
    })

    if (config.url.match(/mockjsdata/)) {
        const delarr = ['ticket', 'paramType', 'group', 'prefix', 'version', 'moduleUrl']
        delarr.forEach(v => {
            Reflect.deleteProperty(config.headers.common, v);
        })
    }
    //根据请求头修改超时时间
    if (config.responseType == 'blob') {
        config.timeout = 60000
    }
    return config
}, error => Promise.reject(error));

//修改响应配置
axios.interceptors.response.use(response => {
    const uniqueKey = `${response.config.url}|${response.config.data}`;
    Reflect.deleteProperty(axios.noRepeat, uniqueKey);
    if (response.data.state === '100002') {  //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
        toLoginNormal(response.data.msg);
    }
    if(response.data.state === '100007'){   //100007为功能权限发生变化，改变询问弹窗visible，显示弹窗
        funcVersionChange(response.data.data.newFuncVersion);
    }
    if(response.data.state === '101003'){   //101003为多终端登录互斥，跳转互斥页面
        toLoginContradiction(response.data.msg);
    }
    if (response.request.responseType === 'blob') {//返回二进制大对象错误信息拦截处理
        if (response.data.type === 'application/json') {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
                const json = JSON.parse(reader.result)
                message.error(json.msg)
            });
            reader.readAsText(response.data);
            return false
        }
    } else if (response.data.state !== '000001') {//服务器返回异常状态信息拦截处理
        parseMsg(response.data);
        // message.error(response.data.msg || '服务器响应失败')
        return false
    }
    return response;
}, error => {
    if (error.response && error.response.data && typeof error.response.data == 'object') {
        if (error.response.data.state === '100002') {
            message.error(`${error.response.data.msg}`,1, () => {
                //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
                toLoginNormal();
            });
        } else if ( error.response.data.state === '100007') {
            funcVersionChange(error.response.data.data.newFuncVersion);
        }else if(error.response.data.state === '101003'){   //101003为多终端登录互斥，跳转互斥页面
            toLoginContradiction(error.response.data.msg);
        } else if (error.response.data.state !== '000001') {//服务器返回异常状态信息拦截处理
            parseMsg(error.response.data);
            return false
        }
    } else if (error.response && error.response.statusText) {//服务器其他异常信息拦截处理
        message.error(`${error.response.status}, ${error.response.statusText}`);
    } else {
        if (error.message) {
            message.error(`${error.message}`);
            if (error.message == '请勿重复提交') {
                return false
            }
        } else if (error) {
            message.error(`${error}`);
        } else {
            message.error(`Error, 服务器响应失败`);
        }
    }
    axios.noRepeat = {}
    return false
});


export const get = (url, params) => {
    return axios.get(url, {params})
        .then(response => {
            if (response.data.state === '100002') {  //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
                toLoginNormal(response.data.msg);
                return false
            }
            return response.data
        }).catch(error => {
            console.log(error);
            return false
        })
};


export const post = (url, params) => {
    return axios.post(url, params)
        .then(response => {
            if (response.data.state === '100002') {  //100002为后台全局效验状态码，未登录清掉cookie跳转登录页
                toLoginNormal(response.data.msg);
                return false
            }
            return response.data
        }).catch(error => {
            console.log(error);
            return false
        })
};

const parseMsg = (result) => {
    const resMsg = result.msg || '网络请求失败'
    const msg = `${resMsg}`
    return message.error(msg);
}

/**
 *作者: 任贸华
 *功能描述: 下载文件
 *参数说明:
 *时间: 2018/7/18 11:48
 */
export const downloadfun = (obj, url, data = {}) => {
    axios({
        method: 'post',
        data: data,
        url: `${api_url}${url}`,
    }).then((res) => {
        obj.setState({ export: false })
        const arr = res.data.data
        arr.forEach(v => {
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = v.path
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }).catch(e => {
        console.log(e);
    })
}


/**
 *作者: 任贸华
 *功能描述: 自定义导入
 *参数说明:
 *时间: 2018/7/18 12:06
 */
export const customAxois = ({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }) => {
    const formData = new FormData();
    if (data) {
        Object.keys(data).map(key => {
            formData.append(key, data[key]);
        });
    }
    formData.append(filename, file);
    axios.post(action, formData, {
        withCredentials,
        headers,
        onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
        },
    })
        .then(response => {
            onSuccess(response, file);
        })
        .catch(onError);
}

export default axios
