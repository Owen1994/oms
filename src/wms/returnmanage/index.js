/**
 *作者: 陈文春
 *功能描述:  入库管理
 *时间: 2018年11月27日19:54:11
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  三无产品退件
 * @param props
 * @returns {*}
 * @constructor
 */
const ReturnThreeNoBundle = props => (
    <Bundle load={() => import('./returnthreeno')}>
        {ReturnThreeNoComponent => <ReturnThreeNoComponent {...props} />}
    </Bundle>
);
/**
 *  扫描退件
 * @param props
 * @returns {*}
 * @constructor
 */
const ScanReturnBundle = props => (
    <Bundle load={() => import('./scanreturn')}>
        {ScanReturnComponent => <ScanReturnComponent {...props} />}
    </Bundle>
);
/**
 *  退货列表
 * @param props
 * @returns {*}
 * @constructor
 */
const ReturningListBundle = props => (
    <Bundle load={() => import('./returninglist')}>
        {ReturningListComponent => <ReturningListComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/wms/returnmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}scanreturn/`} render={p => <ScanReturnBundle {...props} {...p} />} />
                <Route path={`${path}returnthreeno/`} render={p => <ReturnThreeNoBundle {...props} {...p} />} />
                <Route path={`${path}returninglist/`} render={p => <ReturningListBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
