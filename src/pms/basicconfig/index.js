/**
 *作者: 黄建峰
 *功能描述:  基础设置
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  采购角色配置
 * @param props
 * @returns {*}
 * @constructor
 */
const PurchaserolesetBundle = props => (
    <Bundle load={() => import('./purchaseroleset')}>
        {PurchaserolesetComponent => <PurchaserolesetComponent {...props} />}
    </Bundle>
);

/**
 *  其它设置
 * @param props
 * @returns {*}
 * @constructor
 */
const OthersetBundle = props => (
    <Bundle load={() => import('./otherset')}>
        {OthersetComponent => <OthersetComponent {...props} />}
    </Bundle>
);

/**
 *  采购订单审核规则设置
 * @param props
 * @returns {*}
 * @constructor
 */
const PurchasecheckrulesetBundle = props => (
    <Bundle load={() => import('./purchasecheckruleset')}>
        {PurchasecheckrulesetComponent => <PurchasecheckrulesetComponent {...props} />}
    </Bundle>
);

/**
 *  采购订单审核规则设置详情页面
 * @param props
 * @returns {*}
 * @constructor
 */
const PurchasecheckruleseteditruleBundle = props => (
    <Bundle load={() => import('./purchasecheckruleseteditrule')}>
        {PurchasecheckruleseteditruleComponent => <PurchasecheckruleseteditruleComponent {...props} />}
    </Bundle>
);

/**
 *  基础配置用户列表
 * @param props
 * @returns {*}
 * @constructor
 */
const UserlistBundle = props => (
    <Bundle load={() => import('./userlist')}>
        {UserlistComponent => <UserlistComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/pms/basicconfig/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}purchaseroleset/`} render={p => <PurchaserolesetBundle {...props} {...p} />} />
                <Route exact path={`${path}otherset/`} render={p => <OthersetBundle {...props} {...p} />} />
                <Route exact path={`${path}purchasecheckruleset/`} render={p => <PurchasecheckrulesetBundle {...props} {...p} />} />
                <Route exact path={`${path}purchasecheckruleset/editrule/`} render={p => <PurchasecheckruleseteditruleBundle {...props} {...p} />} />
                <Route exact path={`${path}userlist/`} render={p => <UserlistBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
