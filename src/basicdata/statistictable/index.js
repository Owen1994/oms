/**
 *作者: 黄建峰
 *功能描述:  统表
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';
import './style.css';

/**
 *  国内仓
 * @param props
 * @returns {*}
 * @constructor
 */
const DomesticdepotBundle = props => (
    <Bundle load={() => import('./domesticdepot')}>
        {DomesticdepotComponent => <DomesticdepotComponent {...props} />}
    </Bundle>
);

/**
 *  海外仓
 * @param props
 * @returns {*}
 * @constructor
 */
const OverseasdepotBundle = props => (
    <Bundle load={() => import('./overseasdepot')}>
        {OverseasdepotComponent => <OverseasdepotComponent {...props} />}
    </Bundle>
);

/**
 *  国内覆盖海外仓
 * @param props
 * @returns {*}
 * @constructor
 */
const DomestictooverseasdepotBundle = props => (
    <Bundle load={() => import('./domestictooverseasdepot')}>
        {DomestictooverseasdepotComponent => <DomestictooverseasdepotComponent {...props} />}
    </Bundle>
);

/**
 *  备用仓库1
 * @param props
 * @returns {*}
 * @constructor
 */
const Sparedepot1Bundle = props => (
    <Bundle load={() => import('./sparedepot1')}>
        {Sparedepot1Component => <Sparedepot1Component {...props} />}
    </Bundle>
);

/**
 *  备用仓库2
 * @param props
 * @returns {*}
 * @constructor
 */
const Sparedepot2Bundle = props => (
    <Bundle load={() => import('./sparedepot2')}>
        {Sparedepot2Component => <Sparedepot2Component {...props} />}
    </Bundle>
);

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

/**
 *  操作日志
 * @param props
 * @returns {*}
 * @constructor
 */
const OperationlogBundle = props => (
    <Bundle load={() => import('./operationlog')}>
        {OperationlogComponent => <OperationlogComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/basicdata/statistictable/';
    return (
        <div>
            <Switch>
                <Route path={`${path}domesticdepot/`} render={p => <DomesticdepotBundle {...props} {...p} />} />
                <Route path={`${path}overseasdepot/`} render={p => <OverseasdepotBundle {...props} {...p} />} />
                <Route path={`${path}domestictooverseasdepot/`} render={p => <DomestictooverseasdepotBundle {...props} {...p} />} />
                <Route path={`${path}sparedepot1/`} render={p => <Sparedepot1Bundle {...props} {...p} />} />
                <Route path={`${path}sparedepot2/`} render={p => <Sparedepot2Bundle {...props} {...p} />} />
                <Route path={`${path}syncqueue/`} render={p => <SyncqueueBundle {...props} {...p} />} />
                <Route path={`${path}operationlog/`} render={p => <OperationlogBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
