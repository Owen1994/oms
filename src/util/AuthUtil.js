import { message } from 'antd';
import { setCookie } from './baseTool';
import { getCookie } from '../utils';
/**
 * 跳转到登录页
 */
export const toLoginNormal = (msg) => {
    if (msg) {
        message.error(msg);
    }
    setCookie('session', '', -1);
    setCookie('funcVersion', '', -1);
    // sessionStorage.setItem('overTime', '1');
    sessionStorage.setItem('lastHref', `${location.pathname}${location.search}`);
    sessionStorage.removeItem('menuinfos');
    location.href = '/login/normal/';
}

/**
 * funcversion 改变
 */
export const funcVersionChange = (newFuncVersion) => {
    localStorage.setItem('funcVersion', newFuncVersion);
    localStorage.setItem('funcChangeModalVisible', true);
    sessionStorage.removeItem('menuinfos');
}

/**
 * 多终端登录互斥
 */
export const toLoginContradiction = (loginContradictionMsg) => {
    sessionStorage.setItem('loginContradiction', '1');
    sessionStorage.setItem('loginContradictionMsg', loginContradictionMsg);
    sessionStorage.setItem('lastHref', `${location.pathname}${location.search}`);
    setCookie('session', '', -1);
    sessionStorage.removeItem('menuinfos');
    location.href = '/login/contradiction/';
}