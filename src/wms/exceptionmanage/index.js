/**
 *作者: 陈文春
 *功能描述:  异常管理
 *时间: 2018年11月27日19:51:00
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  三无产品登记
 * @param props
 * @returns {*}
 * @constructor
 */
const ThreeNoProductManageBundle = props => (
    <Bundle load={() => import('./threenoupload')}>
        {ThreeNoProductManageComponent => <ThreeNoProductManageComponent {...props} />}
    </Bundle>
);
/**
 * 入库异常
 * @param props
 * @returns {*}
 * @constructor
 */
const ExceptionObjectHandleBundle = props => (
    <Bundle load={() => import('./exceptionobjecthandle')}>
        {ExceptionObjectHandleComponent => <ExceptionObjectHandleComponent {...props} />}
    </Bundle>
);
/**
 *  出库异常
 * @param props
 * @returns {*}
 * @constructor
 */
const AbnormalOrderBundle = props => (
    <Bundle load={() => import('./abnormalorder')}>
        {AbnormalOrderComponent => <AbnormalOrderComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/exceptionmanage/';
    return (
        <div>
            <Switch>
                <Route
                    path={`${path}threenoupload/`}
                    render={p => <ThreeNoProductManageBundle {...props} {...p} />}
                />
                <Route
                    path={`${path}exceptionobjecthandle/`}
                    render={p => <ExceptionObjectHandleBundle {...props} {...p} />}
                />
                <Route path={`${path}abnormalorder/`} render={p => <AbnormalOrderBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
