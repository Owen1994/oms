/**
 *作者: 黄建峰
 *功能描述:  工作台
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Bundle from '@/common/components/bundle/bundle';


/**
 *  PR管理
 * @param props
 * @returns {*}
 * @constructor
 */
const PrmanageBundle = props => (
    <Bundle load={() => import('../prmanage')}>
        {PrmanageComponent => <PrmanageComponent {...props} />}
    </Bundle>
);

/**
 *  采购管理
 * @param props
 * @returns {*}
 * @constructor
 */
const PurchasemanageBundle = props => (
    <Bundle load={() => import('../purchasemanage')}>
        {PurchasemanageComponent => <PurchasemanageComponent {...props} />}
    </Bundle>
);

/**
 *  不良品管理
 * @param props
 * @returns {*}
 * @constructor
 */
const DefectiveproductsmanageBundle = props => (
    <Bundle load={() => import('../defectiveproductsmanage')}>
        {DefectiveproductsmanageComponent => <DefectiveproductsmanageComponent {...props} />}
    </Bundle>
);

/**
 *  报表
 * @param props
 * @returns {*}
 * @constructor
 */
const StatementBundle = props => (
    <Bundle load={() => import('../statement')}>
        {StatementComponent => <StatementComponent {...props} />}
    </Bundle>
);

/**
 *  导入导出管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ImportexportmanageBundle = props => (
    <Bundle load={() => import('../importexportmanage')}>
        {ImportexportmanageComponent => <ImportexportmanageComponent {...props} />}
    </Bundle>
);

/**
 *  基础配置
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicconfigBundle = props => (
    <Bundle load={() => import('../basicconfig')}>
        {BasicconfigComponent => <BasicconfigComponent {...props} />}
    </Bundle>
);



const App = (props) => {
    const path = '/pms/';
    return (
        <div>
            <Switch>
                <Route path={`${path}prmanage/`} render={p => <PrmanageBundle {...props} {...p} />} />
                <Route path={`${path}purchasemanage/`} render={p => <PurchasemanageBundle {...props} {...p} />} />
                <Route path={`${path}defectiveproductsmanage/`} render={p => <DefectiveproductsmanageBundle {...props} {...p} />} />
                <Route path={`${path}statement/`} render={p => <StatementBundle {...props} {...p} />} />
                <Route path={`${path}importexportmanage/`} render={p => <ImportexportmanageBundle {...props} {...p} />} />
                <Route path={`${path}basicconfig/`} render={p => <BasicconfigBundle {...props} {...p} />} />
                <Redirect from={path} to={`${path}prmanage/`} />

            </Switch>
        </div>
    );
};


export default App;
