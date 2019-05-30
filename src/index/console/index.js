/**
 *作者: 黄建峰
 *功能描述:  工作台
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  消息队列
 * @param props
 * @returns {*}
 * @constructor
 */
const MessageNotificationBundle = props => (
    <Bundle load={() => import('./messagenotification')}>
        {MessageNotificationComponent => <MessageNotificationComponent {...props} />}
    </Bundle>
);

/**
 *  我的待办
 * @param props
 * @returns {*}
 * @constructor
 */
const MyupcomingBundle = props => (
    <Bundle load={() => import('./myupcoming')}>
        {MyupcomingComponent => <MyupcomingComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/index/console/';
    return (
        <div>
            <Switch>
                <Route path={`${path}myupcoming/`} render={p => <MyupcomingBundle {...props} {...p} />} />
                <Route path={`${path}messagenotification/`} render={p => <MessageNotificationBundle {...props} {...p} />} />
                <Redirect from="/" to={`${path}myupcoming/`} />
            </Switch>
        </div>
    );
};


export default App;
