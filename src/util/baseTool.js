/**
 *作者: 任贸华
 *功能描述: 全局公共方法文件
 *时间: 2018/4/2 14:35
 */

import { message, } from 'antd'
import moment from 'moment';

const querystring = require('querystring');

/**
 *作者: 任贸华
 *功能描述: createUUID 创建用户唯一id  ，暂未用到
 *参数说明:
 * @param {number} len 长度
 * @param {number} radix 基数
 *时间: 2018/4/2 14:36
 */
const createUUID = (len, radix) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

/**
 *作者: 任贸华
 *功能描述: 设置cookie
 *参数说明:
 * @param {string} cookieName  名称
 * @param {string} value 值
 * @param {number} expiretimes 设置时间
 *时间: 2018/4/2 14:39
 */
export const setCookie = function (cookieName, value, expiretimes, domain = document.domain) {
    var exdate = new Date();
    // var domain = document.domain.replace(/.*\.(.*\..*)/g, '$1');
    // var domain = document.domain;
    exdate.setTime(exdate.getTime() + expiretimes);
    document.cookie = cookieName + "=" + escape(value) + ";path=/;domain=" + domain + ";" +
        ((expiretimes == null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 *作者: 任贸华
 *功能描述: 获取cookie
 *参数说明:
 * @param {string} cookieName 名称
 * @return {string}
 *时间: 2018/4/2 14:39
 */
export const getCookie = function (cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
        return "";
    }
    return "";
};

/**
 *作者: 任贸华
 *功能描述: 获取最近一个月 区间毫秒数
 *参数说明:
 * @param {number} value 默认30天
 * @return {object}
 *时间: 2018/4/2 14:42
 */

export const getrangetime = (value = 30) => {
    var end = moment().endOf('day').valueOf()
    var start = moment().subtract(value, 'day').startOf('day').valueOf()
    // const end = new Date(timestampFromat(moment().valueOf(), 1, '/')).getTime() + 86399000
    // const start = new Date(timestampFromat(moment().subtract(value, 'day').valueOf(), 1, '/')).getTime()
    return ({ start, end })
}

/**
 *作者: 任贸华
 *功能描述: 自动添加日期区间， 开始时间的0:00:00点 到 结束时间的23:59:59点 暂未用到
 *参数说明:
 * @param {function} arr 时间区间数组[moment(),moment()]
 *时间: 2018/4/2 14:43
 */
/*export const getGangeGimes = (arr) => {

    return arr.map((v, i) => {
        if (i == 0) {
            return new Date(timestampFromat(v.valueOf(), 1, '/')).getTime()
        } else {
            return new Date(timestampFromat(v.valueOf(), 1, '/')).getTime() + 86399000
        }
    })
}*/

/**
 *作者: 任贸华
 *功能描述:
 *参数说明:
 * @param {array} arr 数组
 *时间: 2018/4/16 15:00
 */
export const getGangeGimes = (arr) => {
    return arr.map((v, i) => v.valueOf())
}


/**
 *作者: 任贸华
 *功能描述: 对象参数序列化 暂未用到
 *参数说明:
 * @return {string}
 *时间: 2018/4/2 16:32
 */
export const objTodata = (obj) => {
    const arr = []
    for (let o in obj) {
        if (obj[o]) {
            arr.push(o + '=' + obj[o])
        }
    }
    return arr.join('&')
}

/**
 *作者: 任贸华
 *功能描述: 获取url参数
 *参数说明:
 * @param {string} url url地址
 * @return {object}
 *时间: 2018/4/2 16:31
 */
export const getUrlParams = (url) => {
    if (!url) {
        url = location.href;
    }
    var queryArr = url.split('?');
    var querys = queryArr.length > 1 ? querystring.parse(queryArr[1]) : {};
    return querys;
}


/**
 *作者: 任贸华
 *功能描述: getLoginAccount 获取localStorage信息  暂未用到
 *参数说明:
 * @return {object}
 *时间: 2018/4/2 16:30
 */
export const getLoginAccount = () => {
    var loginAccount = '';
    if (window.localStorage) {
        var store = localStorage.getItem('loginAccount'); //保存登录token
        loginAccount = store ? JSON.parse(store) : {};
    } else {
        //Cookie.get("menuTitle", arrDisplay);	
    }
    return loginAccount;
}


/**
 *作者: 任贸华
 *功能描述: 数组增加key
 *参数说明:
 * @param {object} obj 数组对象
 * @return {array}
 *时间: 2018/4/2 16:29
 */
export const datasaddkey = (obj) => {
    if (obj && obj.length > 0) {
        obj.map((v, i) => {
            if (!v.key) {
                v.key = ++i
            }
            return v
        })
        return obj
    }
    return []
}

/**
 *作者: 任贸华
 *功能描述: 获取登录用户信息
 *参数说明:
 * @return {object}
 *时间: 2018/4/2 16:28
 */
export const getLoginmsg = () => {
    let sessioncookie = getCookie('session')
    if (sessioncookie) {
        sessioncookie = JSON.parse(unescape(sessioncookie))
    }

    return sessioncookie
}


/**
 *作者: 任贸华
 *功能描述: 获取页面functoins
 *参数说明:
 *时间: 2018/6/14 19:56
 */
export const functions = (obj, key) => {
    const pathname = location.pathname
    const keys = obj.props.menuInfos.functions[pathname] || []
    return keys.includes(key)
}
/**
 *作者: 任贸华
 *功能描述: 对象转数组后排序  暂未用到
 *参数说明:
 * @return {array}
 *时间: 2018/4/2 16:28
 */
export const objToarrsort = (obj) => {
    var arr = [], arr2 = [], newarr;
    for (let i in obj) {
        if (i.match(/\d+$/g)) {
            arr.push([i, obj[i]]);
        } else {
            arr2.push([i, obj[i]]);
        }
    }

    arr.sort((a, b) => a[0].match(/\d+$/g).join('') * 1 - b[0].match(/\d+$/g).join('') * 1)
    newarr = [...arr, ...arr2]
    return newarr;
}


export const pageCache = (obj, pathname) => {
    const pageCache = obj.props.menuInfos.pageCache
    if (pageCache[pathname]) {
        return pageCache[pathname]
    }
    return undefined
}
/**
 *作者: 任贸华
 *功能描述: selectValues 公共选择组件 方法
 *参数说明:
 * @param {object} obj 当前组件this对象
 * @param {string} url url地址
 * @param {string} title 标题
 * @param {string} name 参数名
 * @param {string} id 参数值
 * @param {string} type single单选 multiple 多选
 * @param {bool} searchabled 是否有搜索框
 * @param {number} num 最多选择几个
 * @param {function} transformData 用于转换请求到的的数据
 * @param {string} searchField 搜索字段名称自定义(默认name)
 *时间: 2018/4/2 16:27
 */
export const selectValues = ({ obj, url, title, name, id, type = 'single', num = 'infinity', searchabled = true, searchField = "name", transformData }) => () => {
    const idval = obj.props.form.getFieldValue(id)
    const nameval = obj.props.form.getFieldValue(name)
    obj.props.searchVluesaction({
        url,
        title,
        name,
        id,
        visible: true,
        type,
        searchabled,
        num,
        searchField,
        transformData
    })
    obj.props.fetchsearchValues({ url, idval, nameval, transformData, value: { name: "" } })
}

/**
 *作者: 任贸华
 *功能描述: 快速清除input内容
 *参数说明:
 * @param {object} e 鼠标事件
 * @param {object} obj 当前组件this对象
 *时间: 2018/4/8 16:31
 */
export const closehandle = (e, obj) => {
    const objs = {}
    let runabled = false
    const input = e.target.parentNode.querySelectorAll('input');
    input.forEach((v, index) => {
        objs[v.id] = ''
        if (index === 0 && v.value) {
            runabled = true
        }
    })
    if (runabled) {
        obj.props.form.setFieldsValue(objs)
    }

}

/**
 *作者: 任贸华
 *功能描述: sortarrToobj  排序数组转对象  暂未用到
 *参数说明:
 * @param {array} arr 数组
 * @return {object}
 *时间: 2018/4/2 16:26
 */
export const sortarrToobj = (arr) => {
    const params = {}
    for (let i = 0, len = arr.length; i < len; i++) {
        const re = /\d+$/g;
        const arr0 = arr[i][0]
        const arr1 = arr[i][1]
        if (re.test(arr0)) {
            const key = arr0.replace(/(.*?)\d+/, '$1')
            if (Reflect.has(params, key)) {
                params[key].push(arr1)
            } else {
                params[key] = []
                params[key].push(arr1)
            }

        } else {
            params[arr0] = arr1
        }
    }
    return params
}

/**
 *作者: 任贸华
 *功能描述: 深度拷贝
 *参数说明:
 *时间: 2018/6/20 9:19
 */

export const deepCopyobject = (obj, copyobj) => {
    if (window.JSON) {
        return JSON.parse(JSON.stringify(obj));
    } else {
        var copyobj = copyobj || (obj.constructor === Array ? [] : {});
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                copyobj[i] = (obj[i].constructor === Array) ? [] : {};
                deepCopyobject(obj[i], copyobj[i]);
            } else {
                copyobj[i] = obj[i];
            }
        }
        return copyobj;
    }
}


/**
 *作者: 任贸华
 *功能描述: dataPack json请求数据封装
 *参数说明:
 * @param {object} obj 数据对象模板
 * @param {object} values 原始数据json对象
 * @return {object}
 *时间: 2018/4/2 16:26
 */
export const dataPack = (obj, values) => {
    const template = { ...obj }
    for (let a in template) {
        if (typeof template[a] === 'object') {

            if (template[a].constructor === Array) {

                let numarr = [];
                for (let t in template[a][0]) {
                    for (let i in values) {
                        if (i.replace(/(.*?)\d+/g, '$1') == t) {
                            const newnum = i.replace(/(.*?)(\d+).*/g, '$2')
                            if (!numarr.includes(newnum)) {
                                numarr.push(newnum)
                            }
                        }
                    }
                }

                template[a] = numarr.map(v => {
                    const obj2 = {}
                    for (let i in template[a][0]) {
                        if (typeof template[a][0][i] === 'string') {
                            obj2[i] = values[i + v] !== undefined ? values[i + v] : ''
                        } else if (template[a][0][i].constructor === Array) {
                            let numarr = [];
                            for (let t in template[a][0][i][0]) {
                                for (let i in values) {
                                    if (i.match(t + v)) {
                                        const newnum = i.replace(/(.*?)\d+_(\d+)/g, '$2')
                                        if (!numarr.includes(newnum)) {
                                            numarr.push(newnum)
                                        }
                                    }
                                }
                            }

                            obj2[i] = numarr.map(p => {
                                const obj3 = {}
                                for (let j in template[a][0][i][0]) {

                                    obj3[j] = values[j + v + '_' + p]
                                }
                                return obj3
                            })
                        }
                    }
                    return obj2
                })

            } else {
                for (let b in template[a]) {
                    if (typeof template[a][b] === 'string') {
                        template[a][b] = values[b]
                    }
                }

            }
        } else if (typeof template[a] === 'string') {
            template[a] = values[a]
        }
    }
    return template

}

/**
 *作者: 任贸华
 *功能描述: objvaluesformat 暂未用到
 *参数说明:
 * @param {object} params 对象
 * @return {object}
 *时间: 2018/4/2 16:24
 */
export const objvaluesformat = (params) => {
    const newparams = {}
    for (let o in params) {
        if (typeof params[o] === 'object') {
            if (params[o].constructor === Array) {
                if (typeof params[o][0] == 'object' && params[o][0] && params[o][0].format) {
                    newparams[o] = params[o].map(v => v ? v.format("YYYY-MM-DD") : '').join(',')
                } else if (typeof params[o][0] == 'object' && params[o][0] && params[o][0].status) {
                    newparams[o] = params[o].map(v => (v.response ? v.response.key : v.url).replace(/.*com/g, '')).join('@')
                } else if (typeof params[o][0] == 'object' && params[o][0].constructor == Array && params[o][0][0] && params[o][0][0].status) {
                    newparams[o] = params[o].map(v => v.map(k => (k.response ? k.response.key : k.url).replace(/.*com/g, '')).join('@')).join(',')
                } else {
                    newparams[o] = params[o].join(',')
                }
            } else {
                if (params[o].format) {
                    newparams[o] = params[o].format("YYYY-MM-DD")
                } else if (params[o].label) {
                    newparams[o] = params[o].label
                }
            }
        } else {
            if (params[o]) {
                newparams[o] = params[o]
            }
        }
    }
    return newparams
}

/**
 *作者: 任贸华
 *功能描述: 取消antd ID绑定
 *参数说明:
 * @param {object} obj 当前组件this对象
 * @param {array} allobj 数组
 *时间: 2018/4/2 16:23
 */
export const unbinds = (obj, allobj) => {
    const objs = {}
    for (let i in allobj) {
        if (typeof allobj[i] === 'string') {
            objs[i] = ''
        }
        if (typeof allobj[i] === 'object') {
            if (allobj[i].constructor == Array) {
                allobj[i].forEach(v => {
                    for (let j in v) {
                        if (v[j].name) {
                            objs[v[j].name] = ''
                        }
                    }
                })
            }
        }
    }
    obj.props.baseInfoForm(objs)
}
/**
 *作者: 任贸华
 *功能描述:timestampFromat 时间格式化 方法
 *参数说明:
 * @param {number} v 毫秒数
 * @param {number} t 类型1 返回年月日 类型2返回年月日时分秒
 * @param {string} interval 分隔符
 * @return {string}
 *时间: 2018/4/2 16:22
 */
export const timestampFromat = (v, t = 1, interval = '-') => {
    if (!v || Number.isNaN(v)) {
        return null;
    }
    if (typeof v !== 'number') return v
    const date = new Date(v);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return t == 1 ? y + interval + m + interval + d : y + interval + m + interval + d + ' ' + h + ':' + minute + ':' + second;
}


/**
 *作者: 任贸华
 *功能描述: 页面不兼容CSS3的提示信息
 *参数说明:
 *时间: 2018/4/2 16:22
 */
(function () {
    if (!('flex' in document.body.style)) {
        const root = document.getElementById('root');
        const first = document.body.firstChild;
        var html = document.createElement("div");
        html.innerHTML = `<div style='line-height:50px;background:#ff0000;color:#ffffff;position: absolute;top:0px;left:0px;width:100%;z-index:99999;text-align:center;' onclick="javascript:this.style.display='none'">您的浏览器版本过低，为了更好的体验，请您升级浏览器！<a style="color:#108ee9" href="http://se.360.cn/" target="_blank" rel='nofollow'>点击更新</a></div>`
        document.body.insertBefore(html, first);
        root.style.display = 'none'
    }
})();

/**
 *作者: 任贸华
 *功能描述: 判断是否支持 server worker
 *参数说明:
 *时间: 2018/5/28 16:53
 */
// (function () {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('/sw.js', { scope: '/' })
//             .then(registration => console.log('ServiceWorker 注册成功！作用域为: ', registration.scope))
//             .catch(err => console.log('ServiceWorker 注册失败: ', err));

//         // SW 消息处理
//         /*
//                 navigator.serviceWorker.ready.then(function(reg) {
//                     console.log(reg)
//                     if (!window.Notification || !window.MessageChannel) {
//                         return;
//                     }

//                     // 建立一个消息管道，用于当前页面与 SW 之间的消息传递，也便于 SW 知道该消息的来源
//                     var channel = new window.MessageChannel();

//                     channel.port1.onmessage = function(e) {
//                         console.log('get Message: ', e.data);
//                         if (!e.data) {
//                             return;
//                         }

//                         // 要求申请通知权限
//                         if (e.data.type === 'applyNotify') {
//                             window.Notification.requestPermission().then(function(grant) {
//                                 if (grant !== 'granted') {
//                                     console.log('申请通知权限被拒绝了！')
//                                     return;
//                                 }

//                                 reg.active.postMessage({type: 'notify', info: e.data.info}, [channel.port2]);
//                             });
//                         }
//                     }

//                     reg.active.postMessage('hi!', [channel.port2]);
//                 });
//         */


//         Notification.requestPermission(function (result) {
//             if (result === 'granted') {
//                 navigator.serviceWorker.ready.then(function (registration) {
//                     /* registration.showNotification('Vibration Sample', {
//                          body: 'Buzz! Buzz!',
//                          icon: '/offline/images/default.png',
//                          tag: 'vibration-sample'
//                      });*/
//                 });
//             }
//         });


//         window.addEventListener("offline", function () {
//             Notification.requestPermission().then(function (grant) {
//                 if (grant !== 'granted') {
//                     return;
//                 }

//                 var notification = new Notification("喔噢，网络不给力！", {
//                     body: '您的网络貌似离线了~',
//                     icon: '/offline/images/default.png',
//                 });

//                 notification.onclick = function () {
//                     notification.close();
//                 };
//             });
//         })
//     }

// })();

/**
 *作者: pzt
 *时间: 2018/4/8
 *描述: 按逗号截取字符串，并给每一项添加单引号
 *@param: <string> str 一串逗号隔开的字符串
 **/
export const addQuotes = (str) => {
    str = str.replace(/，/ig, ',');
    let arr = str.split(','),
        obj = '';
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "'");
        } else {
            arr[i] = arr[i].replace(arr[i], "'" + encodeURIComponent(arr[i]) + "',");
        }
        obj += decodeURIComponent(arr[i])
    }
    return obj;
}


/**
 *作者: 魏洁
 *时间: 2018/6/21
 *描述: 深度克隆对象
 *@param: arr or obj
 **/
export const deepCloneObj = (obj) => {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj), //序列化对象
            newobj = JSON.parse(str); //还原
    } else {//如果不支持以上方法
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};


/**
 *作者: 唐峰
 *时间: 2018/6/21
 *描述: 取两个数组的交集
 *@param: arr
 **/
export const arrayIntersection = (a, b) => {
    var ai = 0, bi = 0;
    var result = new Array();
    while (ai < a.length && bi < b.length) {
        if (a[ai] < b[bi]) {
            ai++;
        } else if (a[ai] > b[bi]) {
            bi++;
        } else {
            result.push(a[ai]);
            ai++;
            bi++;
        }
    }
    return result;
};

export const parseNetErrorToMsg = (err) => {
    if (err.state === '000001' && err.msg) {
        return message.success(err.msg);
    } else if (err.msg) {
        return message.error(err.msg);
    }
    return message.error("网络请求失败");
}
/**
 * 作者: pzt
 * 描述: 关务系统条件筛选字段非空过滤
 * 时间: 2018/6/25 16:26
 * @param <object> values Form表单字段对象
 **/
export const filterParams = (values) => {
    for (let i in values) {
        if ((!values[i] && values[i] !== 0) || values[i].length === 0) {
            delete values[i];
        } else {
            if (/time$/gi.test(i)) {
                values[i] = [values[i][0].startOf('day').valueOf(), values[i][1].endOf('day').valueOf()]
            }
        }
        if (!values['searchContent']) {
            delete values['searchType']
        } else {
            values['searchContent'] = strTrim(values['searchContent'])
        }
    }
    return values
}
/**
 *作者: pzt
 *时间: 2018/6/12
 *描述: 去除首尾空格
 **/
export const strTrim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

export const replaceAllSpace = (str) => {
    return str.replace(/(\s*)/g, "")
}
export const parseUploadFileObj = (item) => {
    item.status = 'done';
    const name = item.filename;
    const url = item.path;
    delete item.filename;
    delete item.path;
    item.name = name;
    item.url = url;
    item.uid = Date.now();
    return item;
}
/**
 *作者: weijie
 *时间: 2018/8/16
 *描述: 图片弹框展示
 * @param {string} 图片地址
 * @param {Boolean} 浏览器宽高变化时重新计算
 **/
export const popUpImage = function () {
    var imgStie = null;
    var maskStyle = {
        position: "fixed",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        left: 0,
        fontSize: "12px",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
    }
    var wrapStyle = {
        position: "relative",
        padding: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 14px 2px rgba(0, 0, 0, 0.20)",
        borderRadius: "4px",
        overflow: "hidden",
        boxSizing: "border-box",
    }
    var delIconStyle = {
        position: 'absolute',
        display: 'block',
        top: "10px",
        right: "12px",
        width: '16px',
        height: '16px',
        lineHeight: "20px",
        // backgroundImage: "url(http://101.200.49.206:8080/P.GGYX.FS/static/pages/qysh/imgs/btn_close.svg)",
        backgroundSize: 'cover',
        cursor: 'pointer',
    }
    var imgStyle = {
        display: "block",
        width: "100%",
        height: "100%",
    }
    var flexStyle = { "display": "flex" }
    var noneStyle = { "display": "none" }
    // 间距
    var space = 40;

    var mask = document.createElement("div")
    var sh = window.innerHeight || document.documentElement.clientheight;
    var sw = window.innerWidth || document.documentElement.clientWidth;
    mask.style.width = sw + "px"
    mask.style.height = sh + "px"
    css(mask, maskStyle)

    var close = document.createElement("div");
    close.innerText = "×";
    var closeStyle = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        right: '0',
        top: '0',
        color: '#fff',
        backgroundColor: '#000',
        cursor: 'pointer',
        'font-size': '35px',
        'text-align': 'center'
    }
    css(close, closeStyle);
    mask.appendChild(close);
    mask.setAttribute('class', 'preview-mask');

    var wrap = document.createElement("div")
    css(wrap, wrapStyle)

    // var delIcon = document.createElement("div")
    mask.addEventListener("click", function (e) {
        css(mask, noneStyle)
        if (imgStie) {
            wrap.removeChild(imgStie)
            imgStie = null
        }
    })
    // css(delIcon, delIconStyle)
    // delIcon.classList.add("ant-modal-close-x")
    mask.appendChild(wrap)
    // wrap.appendChild(delIcon)
    document.body.appendChild(mask)
    function popUp(src, flag = false) {
        var previewMask = document.querySelector('.preview-mask').children[1];
        previewMask.innerHTML = '';
        if (!src) return;
        if (flag) {
            sh = window.innerHeight || document.documentElement.clientheight;
            sw = window.innerWidth || document.documentElement.clientWidth;
            mask.style.width = sw + "px"
            mask.style.height = sh + "px"
        }
        var img = imgStie = new Image()
        css(img, imgStyle)
        img.addEventListener("load", function (e) {
            var w = e.target.width;
            var h = e.target.height;
            var obj = {}
            if (!(w + 2 * space <= sw) || !(h + 2 * space <= sh)) {
                var wratio = w / sw;
                var hratio = h / sh;
                if (hratio > wratio) {
                    // 宽
                    obj.height = sh - 2 * space
                    var actualwidth = Math.floor(w / h * obj.height)
                    obj.width = actualwidth
                } else {
                    obj.width = sw - 2 * space
                    var actualHeight = Math.floor(h / w * obj.width)
                    obj.height = actualHeight
                }
                obj.width += "px"
                obj.height += "px"
            } else {
                obj.width = w + "px"
                obj.height = h + "px"
            }
            css(wrap, obj)
            wrap.appendChild(img)
            css(mask, flexStyle)
        })
        img.addEventListener("error", function () {
            wrap.appendChild("图片加载失败,请尝试刷新")
            css(mask, flexStyle)
        })
        img.setAttribute('src', src);
    }
    function css(dom, obj) {
        for (var k in obj) {
            dom.style[k] = obj[k]
        }
    }
    return popUp
}()

/**
 *作者: weijie
 *时间: 2018/8/20
 *描述: 节流
 * @param fn {function} 函数
 * @param interval {number} 间隔时间（毫秒）
 **/
export function throttle(fn, interval) {
    var last, timer;
    interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = Date.now();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}
/**
 *作者: weijie
 *时间: 2018/8/20
 *描述: 防抖
 * @param fn    {function}   函数
 * @param delay {number}     延迟触发时间（毫秒）
 **/
export function debounce(fn, delay) {
    delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}

/**
 *  http图片转换https://xxx.youkeshu.com/angentImg/pic_url=原链接
 */
export const angentPicUrl = (url) => {
    if (!url) {
        return url;
    }
    let result = url;
    if (/^http:\/\//.test(url)) {
        result = '/angentImg/?type=image&pic_url=' + url;
    }
    return result
}

export const randNum = (n = 10) => {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
}

// 延时执行函数
const repeatMap = new Map();
let params = undefined;
export const repeatFunc = (func, key, paramData, time = 1000) => {
    params = paramData;
    if (repeatMap.get(key)) {
        return;
    }
    repeatMap.set(key, 1);
    setTimeout(() => {
        func(params);
        repeatMap.delete(key)
    }, time)
};

/**
 *作者: weijie
 *时间: 2018/8/20
 *描述: 数组去重
 * @param arr    {Array}   数组
 * @param field  {String}   依据去重的字段
 * @return Array
 **/
export const distinct = (arr, field = 'id') => {
    if (!Array.isArray(arr)) return arr;
    const obj = {},
        flag = 1,
        distinctArr = [],
        len = arr.length;
    for (let i = 0; i < len; i++) {
        if (!obj[arr[i][field]]) {
            obj[arr[i][field]] = flag
            distinctArr.push(arr[i])
        }
    }
    return distinctArr
}

/**
 * 权限判断
 */
export const hasPerssion = (functionkey, props) => {
    const pathname = location.pathname;
    const { menuInfos } = props;
    const keys = menuInfos.functions[pathname] || [];
    return keys.includes(functionkey);
}

/**
 * 关闭当前页面
 */
export const closeCurrentPage = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
        window.location.href = "about:blank";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}

/**
 * 获取部分主流浏览器类型 browserType
 */
export const getDeviceName = () => {
    let browserType = '未知浏览器';
    if (ifUserAgentExit('Chrome') && ifUserAgentExit('Safari')) {
        if (ifUserAgentExit('OPR')) {
            browserType = 'Opera浏览器';
        } else if (ifUserAgentExit('360EE')) {
            browserType = '360极速浏览器';
        } else if (ifUserAgentExit('360SE')) {
            browserType = '360安全浏览器';
        } else if (ifUserAgentExit('Edge')) {
            browserType = 'Microsoft Edge浏览器';
        } else {
            browserType = 'Chrome浏览器';
        }
    } else if (ifUserAgentExit('Firefox')) {
        browserType = 'Firefox浏览器';
    } else if (ifUserAgentExit('Mac')) {
        browserType = 'Safari浏览器';
    } else if ((ifUserAgentExit('compatible') && ifUserAgentExit('msie')) || (ifUserAgentExit('trident') && ifUserAgentExit('rv:11.0'))) { //IE11及以下
        browserType = 'IE浏览器';
    }
    return browserType;
}

const ifUserAgentExit = (str) => {
    let userAgent = navigator.userAgent;
    return userAgent.indexOf(str) > -1 ? true : false;
}

/**
 * 根据判断环境配置下载路径
 */
export const downloadUrl = (url, timestampFlag = true) => {
    let BUILD_ARGVS = process.env.BUILD_ARGVS;
    let timestamp = (new Date()).getTime();
    let src
    if (BUILD_ARGVS === 'pro') {
        src = 'https://erp.youkeshu.com' + url
    } else {
        src = 'https://erp-test.youkeshu.com' + url
    }
    return timestampFlag ? src + '?' + timestamp : src
}


/**
 * 数字自动补零   
 * @params num  Number  数字
 * @params len  Number  后缀长度   例如 ：  2.00  后缀长度为 2
 * @return String   
 */
export const autoZeroToString = (num, len = 2) => {
    num += ""
    const arr = num.split('.')
    let str = arr[1] || ""
    while (str.length < len) {
        str += "0"
    }
    arr[1] = str
    return arr.join(".")
}