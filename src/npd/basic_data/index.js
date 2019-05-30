/**
 *作者: 黄建峰
 *功能描述:  关税模块根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'
/**
 *  仓库关系表
 * @param props
 * @returns {*}
 * @constructor
 */
const DepotBundle = (props) => (
    <Bundle load={() => import('./depot')}>
        {(DepotComponent) => <DepotComponent {...props} />}
    </Bundle>
);
/**
 *  用户管理
 * @param props
 * @returns {*}
 * @constructor
 */
const UserManageBundle = (props) => (
    <Bundle load={() => import('./user_manage')}>
        {(UserManageComponent) => <UserManageComponent {...props} />}
    </Bundle>
);
/**
 *  意向供应商
 * @param props
 * @returns {*}
 * @constructor
 */
const IntentSupplierBundle = (props) => (
    <Bundle load={() => import('./intent_supplier')}>
        {(IntentSupplierComponent) => <IntentSupplierComponent {...props} />}
    </Bundle>
);

/**
 *  新品项目流列表
 * @param props
 * @returns {*}
 * @constructor
 */
const ProjectFlowBundle = (props) => (
    <Bundle load={() => import('./project_flow')}>
        {(ProjectFlowComponent) => <ProjectFlowComponent {...props} />}
    </Bundle>
);
/**
 *  新品审核流列表
 * @param props
 * @returns {*}
 * @constructor
 */
const AuditFlowBundle = (props) => (
    <Bundle load={() => import('./audit_flow')}>
        {(AuditFlowComponent) => <AuditFlowComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/npd/bd';
    return (
        <Switch>
            <Route path={`${path}/depot/`} render={(p) => <DepotBundle {...props} {...p}/> } />
            <Route path={`${path}/user/`} render={(p) => <UserManageBundle {...props} {...p}/> } />
            <Route path={`${path}/intent_supplier/`} render={() => <IntentSupplierBundle {...props} /> } />
            <Route path={`${path}/project_flow/`} render={() => <ProjectFlowBundle {...props} /> } />
            <Route path={`${path}/audit_flow/`} render={() => <AuditFlowBundle {...props} /> } />
            <Redirect from="/npd/bd/" to={`${path}/depot/`} />
        </Switch>
    )
};


export default App;
