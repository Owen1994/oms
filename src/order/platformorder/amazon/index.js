/**
 *作者: zhengxuening
 *功能描述: amazon订单
 *时间: 2018/12/14 10:00
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  amazon订单列表
 * @param props
 * @returns {*}
 * @constructor
 */
const AmazonBundle = (props) => (
    <Bundle load={() => import('./list')}>
        {(AmazonComponent) => <AmazonComponent {...props} />}
    </Bundle>
);
/**
 *  amazon订单详情
 * @param props
 * @returns {*}
 * @constructor
 */
const AmazonDetailBundle = (props) => (
    <Bundle load={() => import('./detail')}>
        {(AmazonDetailComponent) => <AmazonDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/amazon/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`} render={(p) => <AmazonBundle { ...props } { ...p }/> } />
                <Route path={`${path}detail/`} render={(p) => <AmazonDetailBundle { ...props } { ...p }/> } />
            </Switch>
        </div>
    )
};


export default App;
