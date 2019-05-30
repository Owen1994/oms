/**
 *作者: 黄建峰
 *功能描述:  报表
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  在途库存量查询
 * @param props
 * @returns {*}
 * @constructor
 */
const InventoryqueryBundle = props => (
    <Bundle load={() => import('./inventoryquery')}>
        {InventoryqueryComponent => <InventoryqueryComponent {...props} />}
    </Bundle>
);


/**
 *  采购订单明细表
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderdetailtableBundle = props => (
    <Bundle load={() => import('./orderdetailtable')}>
        {OrderdetailtableComponent => <OrderdetailtableComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/pms/statement/';
    return (
        <div>
            <Switch>
                <Route path={`${path}inventoryquery/`} render={p => <InventoryqueryBundle {...props} {...p} />} />
                <Route path={`${path}orderdetailtable/`} render={p => <OrderdetailtableBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
