/**
 *作者: 任贸华
 *功能描述: 路由验证组件
 *参数说明:
 *时间: 2018/4/16 10:47
 */
import React from 'react'
import {Route} from 'react-router-dom'
import {getCookie} from 'util/baseTool';
import {Redirect, withRouter} from 'react-router';
import { toLoginNormal } from 'util/AuthUtil';

export default @withRouter

class AuthorizationRoute extends React.Component {

    render() {
        const {component: Component, ...rest} = this.props;
        // const pathname = this.props.location.pathname
        // const funcVersion = this.props.menuInfos.funcVersion
        const loginabled = getCookie('session') ? true : false
        // const isreturn = pathname === '/403/' ? true : funcVersion != '' ? true : false
        const content = loginabled ? Component ? <Route {...rest} render={() => <Component {...this.props} />}/> :
                                     <Redirect to={rest.to}/> :
                        null;
        if (!loginabled) {
            sessionStorage.setItem('lastHref', `${location.pathname}${location.search}`);
            toLoginNormal();
        }

        return (
            // isreturn ? content : null
            content
        )
    }
}
