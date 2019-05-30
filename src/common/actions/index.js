/**
 *作者: 任贸华
 *功能描述: 获取左侧及头部菜单
 *参数说明:
 *时间: 2018/4/16 10:50
 */
import { post } from 'util/axios'
import {setCookie} from "util/baseTool";
import {api_url} from "util/connectConfig";
import {
    setPageCacheAction,
    clearPageCacheAction,
    clearAllPageCacheAction
} from './pagecache';
import {
    setPageCache,
    getPageCache
} from 'util/PageCache';

export const menudataInfo = 'menudataInfo'

/**
 *作者: 任贸华
 *功能描述: 分发菜单数据
 *参数说明:
 *时间: 2018/4/16 10:51
 */
export const menudataaction = value => ({
    type: menudataInfo,
    payload: value
})

/**
 *作者: 任贸华
 *功能描述: 获取菜单数据
 *参数说明:
 *时间: 2018/4/16 10:51
 */
export const getMenuData = () => (dispatch) => {
    const menuinfos = sessionStorage.getItem('menuinfos');
    if (menuinfos) {
        dispatch(menudataaction(JSON.parse(menuinfos)));
        return ;
    }

    return post(`${api_url}/urc/motan/service/api/IUrcService/getAllFuncPermit`)
        .then(data => {
            if (data.state == '000001') {
                const funcVersion = data.data.funcVersion
                setCookie("funcVersion", funcVersion);
                const resdata = data.data.lstSysRoot.map(v => {
                        if (!(typeof v == 'object')) {
                            return JSON.parse(v)
                        } else {
                            return v
                        }
                    }
                );

                resdata.map((item, index) => {
                    if (item.system.key === '013') {
                        resdata.splice(index,1);
                    }
                    if (item.system.key === '004') {
                        resdata.splice(index,1);
                        resdata.push(item);
                    }
                });
                let leftmenudata = [], topmenudata = [], topmodule = [], newresdata = {};
                let indexMenuData = {
                    "menu": [
                        {
                            "key": "inedx_000-000001",
                            "module": [
                                {
                                    "function": [],
                                    "key": "inedx_000-000001-000001",
                                    "module": [],
                                    "name": "我的待办",
                                    "pageFullPathName": "",
                                    "show": 1,
                                    "url": "/index/console/myupcoming/"
                                }, {
                                    "function": [],
                                    "key": "inedx_000-000001-000002",
                                    "module": [],
                                    "name": "消息通知",
                                    "pageFullPathName": "",
                                    "show": 1,
                                    "url": "/index/console/messagenotification/"
                                }
                            ],
                            "name": "工作台",
                            "url": "/index/"
                        },
                        {
                            "key": "inedx_000-000002",
                            "module": [
                                {
                                    "function": [],
                                    "key": "inedx_000-000002-000001",
                                    "module": [],
                                    "name": "我的权限",
                                    "pageFullPathName": "",
                                    "show": 1,
                                    "url": "/index/personalcenter/permissionlist/"
                                }
                            ],
                            "name": "个人中心",
                            "url": "/index/"
                        }
                    ],
                    "system": {
                        "key": "index",
                        "name": "首页",
                        "url": "/index/"
                    }
                }
                resdata.unshift(indexMenuData);
                
                
                resdata.forEach((item, index) => {
                    item.system.defaultUrl = item.menu[0].module[0].url
                    if(item.system.name.length <= 3){
                        topmenudata.push(item.system);
                    }else{
                        topmodule.push(item.system);
                    }
                    leftmenudata.push(...item.menu);
                })
                topmenudata.push(...topmodule);

                newresdata = {topmenudata, leftmenudata};
                const menuinfos = {
                    data: newresdata,
                    leftmenudata,
                    topmenudata,
                    funcVersion,
                };
                sessionStorage.setItem('menuinfos', JSON.stringify(menuinfos));
                dispatch(menudataaction(menuinfos));
            }
        });
}


const actions = {
    menudataaction,
    getMenuData,
    setPageCacheAction,
    clearPageCacheAction,
    clearAllPageCacheAction
}

export default actions




