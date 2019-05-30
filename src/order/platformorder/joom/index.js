/**
 *作者: 陈林
 *功能描述: joom订单
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  joom订单
 * @param props
 * @returns {*}
 * @constructor
 */
const JoomBundle = (props) => (
    <Bundle load={() => import('./list')}>
        {(JoomComponent) => <JoomComponent {...props} />}
    </Bundle>
);
/**
 *  joom订单详情
 * @param props
 * @returns {*}
 * @constructor
 */
const JoomDetailBundle = (props) => (
    <Bundle load={() => import('./detail')}>
        {(JoomDetailComponent) => <JoomDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/joom/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}`} render={(p) => <JoomBundle {...props} {...p}/> } />
                <Route path={`${path}detail/`} render={(p) => <JoomDetailBundle {...props} {...p}/> } />
            </Switch>
        </div>
    )
};


export default App;
