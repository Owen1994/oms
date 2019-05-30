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
 *  基本资料表
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicTableBundle = props => (
    <Bundle load={() => import('./basicTable')}>
        {BasicTableComponent => <BasicTableComponent {...props} />}
    </Bundle>
);

/**
 *  库存跟进表
 * @param props
 * @returns {*}
 * @constructor
 */
const StockFollowUpTableBundle = props => (
    <Bundle load={() => import('./stockFollowUpTable')}>
        {StockFollowUpTableComponent => <StockFollowUpTableComponent {...props} />}
    </Bundle>
);

/**
 *  业务角色配置
 * @param props
 * @returns {*}
 * @constructor
 */
const RoleConfigurationBundle = props => (
    <Bundle load={() => import('./roleConfiguration')}>
        {RoleConfigurationComponent => <RoleConfigurationComponent {...props} />}
    </Bundle>
);

/**
 *  业务角色(数据权限)
 * @param props
 * @returns {*}
 * @constructor
 */
const PermissionsBundle = props => (
    <Bundle load={() => import('./permissions')}>
        {PermissionsComponent => <PermissionsComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/basicdata/overseasStock/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}basicTable/`} render={p => <BasicTableBundle {...props} {...p} />} />
                <Route exact path={`${path}stockFollowUpTable/`} render={p => <StockFollowUpTableBundle {...props} {...p} />} />
                <Route exact path={`${path}roleConfiguration/`} render={p => <RoleConfigurationBundle {...props} {...p} />} />
                <Route exact path={`${path}roleConfiguration/permissions/`} render={p => <PermissionsBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
