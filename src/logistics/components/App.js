/**
 *作者: 黄建峰
 *功能描述:  关税模块根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'
/**
 *  报关单
 * @param props
 * @returns {*}
 * @constructor
 */
const DeclarationBundle = (props) => (
    <Bundle load={() => import('../declaration/list')}>
        {(DeclarationComponent) => <DeclarationComponent {...props} />}
    </Bundle>
);
/**
 *  查看报关资料
 * @param props
 * @returns {*}
 * @constructor
 */
const CheckCustomsInfoBundle = (props) => (
    <Bundle load={() => import('../declaration/checkCustomsInfo/components')}>
        {(CheckCustomsInfoComponent) => <CheckCustomsInfoComponent {...props} />}
    </Bundle>
);
/**
 *  制单/查看制单数据
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderComponentBundle = (props) => (
    <Bundle load={() => import('../declaration/order')}>
        {(OrderComponent) => <OrderComponent {...props} />}
    </Bundle>
);

/**
 *  报关设置
 * @param props
 * @returns {*}
 * @constructor
 */
const CustomsSetBundle = (props) => (
    <Bundle load={() => import('../customs_set')}>
        {(CustomsSetComponent) => <CustomsSetComponent {...props} />}
    </Bundle>
);
/**
 *  操作日志
 * @param props
 * @returns {*}
 * @constructor
 */
const OperationLogBundle = (props) => (
    <Bundle load={() => import('../operation_log')}>
        {(OperationLogComponent) => <OperationLogComponent {...props} />}
    </Bundle>
);
/**
 *  物流轨迹
 * @param props
 * @returns {*}
 * @constructor
 */
const TrajectoryBundle = (props) => (
    <Bundle load={() => import('../trajectory')}>
        {(TrajectoryComponent) => <TrajectoryComponent {...props} />}
    </Bundle>
);

/**
 *  物流商管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ServiceManageBundle = (props) => (
    <Bundle load={() => import('../servicemanage')}>
        {(ServiceManageComponent) => <ServiceManageComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/lgtconfig';
    return (
        <Switch>
            <Route path={`${path}/declaration/check_customs_info/`} render={(p) => <CheckCustomsInfoBundle {...props} {...p}/> } />
            <Route path={`${path}/declaration/order/:type/`} render={(p) => <OrderComponentBundle {...props} {...p}/> } />
            <Route exact path={`${path}/declaration/`} render={() => <DeclarationBundle {...props} /> } />
            <Route path={`${path}/customs_set/`} render={() => <CustomsSetBundle {...props} /> } />
            <Route path={`${path}/operate_log/`} render={() => <OperationLogBundle {...props} /> } />
            <Route path={`${path}/trajectory/`} render={() => <TrajectoryBundle {...props} /> } />
            <Route path={`${path}/servicemanage/`} render={() => <ServiceManageBundle {...props} /> } />
            <Redirect from="/lgtconfig/" to={`${path}/declaration/`} />
        </Switch>
    )
};


export default App;
