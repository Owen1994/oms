/**
 *作者: 任贸华
 *功能描述: 公共权限验证组件
 *参数说明:
 *时间: 2018/6/21 16:12
 */
import React from 'react'
import Error403 from '../../common/components/403/403.js';

const Functions = (props) => {
    const pathname = location.pathname;
    const { menuInfos, functionkey, isPage, children } = props;
    const keys = menuInfos.functions[pathname] || [];
    if(Array.isArray(functionkey) === true){
        for(let key in functionkey){
            if(keys.includes(functionkey[key]) === true){
                return children
            } else {
                return null
            }
        }
    }else{
        const is = keys.includes(functionkey);
        if(isPage){
            return is ? children : <Error403/>
        }else{
            return is ? children : null
        }
    }
}

export default Functions;