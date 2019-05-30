/**
 *作者: 陈文春
 *功能描述:  库存管理
 *时间: 2018年11月27日19:51:00
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  库存查询
 * @param props
 * @returns {*}
 * @constructor
 */
const CheckInventoryBundle = props => (
    <Bundle load={() => import('./checkinventory')}>
        {CheckInventoryComponent => <CheckInventoryComponent {...props} />}
    </Bundle>
);
/**
 *  库存盘点
 * @param props
 * @returns {*}
 * @constructor
 */
const MakingAnInventoryBundle = props => (
    <Bundle load={() => import('./makinganinventory')}>
        {MakingAnInventoryComponent => <MakingAnInventoryComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/wms/inventorymanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}checkinventory/`} render={p => <CheckInventoryBundle {...props} {...p} />} />
                <Route path={`${path}makinganinventory/`} render={p => <MakingAnInventoryBundle {...props} {...p} />} />
                <Redirect from="/wms/inventorymanage/" to={`${path}checkinventory/`} />
            </Switch>
        </div>
    );
};


export default App;
