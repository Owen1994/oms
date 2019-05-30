import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoadingComponent from '@/common/components/loading';
import $ from 'jquery';
  
/**
 *  登录页
 * @param props
 * @returns {*}
 * @constructor
 */
const NormalBundle = Loadable({
    loader: () => import('./normal'),
    loading: LoadingComponent,
});

/**
 *  忘记密码页
 * @param props
 * @returns {*}
 * @constructor
 */
const ForgetBundle = Loadable({
    loader: () => import('./forget'),
    loading: LoadingComponent,
});

/**
 *  超时页
 * @param props
 * @returns {*}
 * @constructor
 */
const OvertimeBundle = Loadable({
    loader: () => import('./overtime'),
    loading: LoadingComponent,
});

/**
 *  登录互斥
 * @param props
 * @returns {*}
 * @constructor
 */
const ContradictionBundle = Loadable({
    loader: () => import('./contradiction'),
    loading: LoadingComponent,
});


export default class LoginRouter extends React.Component {

    componentDidMount() {
        $('.loadEffectWrap').remove();
    }

    render(){
        const path = '/login/'
        return (
            <Router>
                <Switch>
                    <Route path={`${path}normal/`} component={NormalBundle} />
                    <Route path={`${path}forget/`} component={ForgetBundle} />
                    <Route path={`${path}overtime/`} component={OvertimeBundle} />
                    <Route path={`${path}contradiction/`} component={ContradictionBundle} />         
                    <Redirect from={`${path}`} to={`${path}normal/`}/>
                    <Redirect exact from="/" to={`${path}normal/`}/>
                </Switch>
            </Router>
        )
    
    }
}
