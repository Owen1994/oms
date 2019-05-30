/**
 *作者: 黄建峰
 *功能描述:  基础资料
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Bundle from '@/common/components/bundle/bundle';

/**
 *  统表
 * @param props
 * @returns {*}
 * @constructor
 */
const StatistictableBundle = props => (
    <Bundle load={() => import('../statistictable')}>
        {StatistictableComponent => <StatistictableComponent {...props} />}
    </Bundle>
);

/**
 *  海外仓库存
 * @param props
 * @returns {*}
 * @constructor
 */
const OverseasStockBundle = props => (
    <Bundle load={() => import('../overseasStock')}>
        {OverseasStockComponent => <OverseasStockComponent {...props} />}
    </Bundle>
);

/**
 *  业务角色配置
 * @param props
 * @returns {*}
 * @constructor
 */
const SyncqueueBundle = props => (
    <Bundle load={() => import('../syncqueue')}>
        {SyncqueueComponent => <SyncqueueComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/basicdata/';
    return (
        <div>
            <Switch>
                <Route path={`${path}statistictable/`} render={p => <StatistictableBundle {...props} {...p} />} />
                <Route path={`${path}overseasStock/`} render={p => <OverseasStockBundle {...props} {...p} />} />
                <Route path={`${path}syncqueue/`} render={p => <SyncqueueBundle {...props} {...p} />} />
                <Redirect from={path} to={`${path}statistictable/domesticdepot/`} />
            </Switch>
        </div>
    );
};


export default App;
