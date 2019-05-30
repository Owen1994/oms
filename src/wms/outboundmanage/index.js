/**
 *作者: 蒋林峰
 *功能描述:  出库管理
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';


/**
 *  发货列表
 * @param props
 * @returns {*}
 * @constructor
 */
const DelivieriesListBundle = props => (
    <Bundle load={() => import('./delivierieslist')}>
        {DelivieriesListComponent => <DelivieriesListComponent {...props} />}
    </Bundle>
);
/**
 *  拣货任务
 * @param props
 * @returns {*}
 * @constructor
 */
const PickingTaskBundle = props => (
    <Bundle load={() => import('./pickingtask')}>
        {PickingTaskComponent => <PickingTaskComponent {...props} />}
    </Bundle>
);
/**
 *  核对打包
 * @param props
 * @returns {*}
 * @constructor
 */
const CheckPackageBundle = props => (
    <Bundle load={() => import('./checkpackage')}>
        {CheckPackageComponent => <CheckPackageComponent {...props} />}
    </Bundle>
);
/**
 *  扫描发运
 * @param props
 * @returns {*}
 * @constructor
 */
const ScanDeliveryBundle = props => (
    <Bundle load={() => import('./scandelivery')}>
        {ScanDeliveryComponent => <ScanDeliveryComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/wms/outboundmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}delivierieslist/`} render={p => <DelivieriesListBundle {...props} {...p} />} />
                <Route path={`${path}pickingtask/`} render={p => <PickingTaskBundle {...props} {...p} />} />
                <Route path={`${path}checkpackage/`} render={p => <CheckPackageBundle {...props} {...p} />} />
                <Route path={`${path}scandelivery/`} render={p => <ScanDeliveryBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
