/**
 *作者: 黄建峰
 *功能描述:  WMS模块根路由
 *时间: 2018/4/17 10:55
 */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Bundle from '@/common/components/bundle/bundle';

/**
 *  库存管理
 * @param props
 * @returns {*}
 * @constructor
 */
const InventoryManageBundle = props => (
    <Bundle load={() => import('../inventorymanage')}>
        {InventoryManageComponent => <InventoryManageComponent {...props} />}
    </Bundle>
);
/**
 *  入库管理
 * @param props
 * @returns {*}
 * @constructor
 */
const StockManageBundle = props => (
    <Bundle load={() => import('../stockmanage')}>
        {StockManageComponent => <StockManageComponent {...props} />}
    </Bundle>
);
/**
 *  出库管理
 * @param props
 * @returns {*}
 * @constructor
 */
const OutboundManageBundle = props => (
    <Bundle load={() => import('../outboundmanage')}>
        {OutboundManageComponent => <OutboundManageComponent {...props} />}
    </Bundle>
);
/**
 *  异常管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ExceptionManageBundle = props => (
    <Bundle load={() => import('../exceptionmanage')}>
        {ExceptionManageComponent => <ExceptionManageComponent {...props} />}
    </Bundle>
);
/**
 *  不良品管理
 * @param props
 * @returns {*}
 * @constructor
 */
const RejectsManageBundle = props => (
    <Bundle load={() => import('../rejectsmanage')}>
        {RejectsManageComponent => <RejectsManageComponent {...props} />}
    </Bundle>
);
/**
 *  退货管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ReturnManageBundle = props => (
    <Bundle load={() => import('../returnmanage')}>
        {ReturnManageComponent => <ReturnManageComponent {...props} />}
    </Bundle>
);
/**
 *  样品管理
 * @param props
 * @returns {*}
 * @constructor
 */
const SampleManageBundle = props => (
    <Bundle load={() => import('../samplemanage')}>
        {SampleManageComponent => <SampleManageComponent {...props} />}
    </Bundle>
);
/**
 *  移位管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ShiftManageBundle = props => (
    <Bundle load={() => import('../shiftmanage')}>
        {ShiftManageComponent => <ShiftManageComponent {...props} />}
    </Bundle>
);
/**
 *  报表管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ReportFormsManageBundle = props => (
    <Bundle load={() => import('../reportformsmanage')}>
        {ReportFormsManageComponent => <ReportFormsManageComponent {...props} />}
    </Bundle>
);
/**
 *  系统设置
 * @param props
 * @returns {*}
 * @constructor
 */
const SystemSettingBundle = props => (
    <Bundle load={() => import('../systemsetting')}>
        {SystemSettingComponent => <SystemSettingComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/';
    return (
        <Switch>
            <Route path={`${path}inventorymanage/`} render={p => <InventoryManageBundle {...props} {...p} />} />
            <Route path={`${path}stockmanage/`} render={p => <StockManageBundle {...props} {...p} />} />
            <Route path={`${path}outboundmanage/`} render={p => <OutboundManageBundle {...props} {...p} />} />
            <Route path={`${path}exceptionmanage/`} render={p => <ExceptionManageBundle {...props} {...p} />} />
            <Route path={`${path}rejectsmanage/`} render={p => <RejectsManageBundle {...props} {...p} />} />
            <Route path={`${path}returnmanage/`} render={p => <ReturnManageBundle {...props} {...p} />} />
            <Route path={`${path}samplemanage/`} render={p => <SampleManageBundle {...props} {...p} />} />
            <Route path={`${path}shiftmanage/`} render={p => <ShiftManageBundle {...props} {...p} />} />
            <Route path={`${path}reportformsmanage/`} render={p => <ReportFormsManageBundle {...props} {...p} />} />
            <Route path={`${path}systemsetting/`} render={p => <SystemSettingBundle {...props} {...p} />} />
            <Redirect from={path} to={`${path}inventorymanage/`} />
        </Switch>
    );
};


export default App;
