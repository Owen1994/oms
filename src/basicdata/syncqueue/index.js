/**
 *作者: 黄建峰
 *功能描述:  统表
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';
import '../statistictable/style.css';

/**
 *  异步队列
 * @param props
 * @returns {*}
 * @constructor
 */
const SyncqueueBundle = props => (
    <Bundle load={() => import('./syncqueue')}>
        {SyncqueueComponent => <SyncqueueComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/basicdata/syncqueue/';
    return (
        <div>
            <Switch>
                <Route path={`${path}syncqueue/`} render={p => <SyncqueueBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
