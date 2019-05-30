/**
 *作者: 蒋林峰
 *功能描述:  报表管理
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  入库类报表
 * @param props
 * @returns {*}
 * @constructor
 */
const StockFormsBundle = props => (
    <Bundle load={() => import('./stockforms')}>
        {StockFormsComponent => <StockFormsComponent {...props} />}
    </Bundle>
);
/**
 *  不良品报表
 * @param props
 * @returns {*}
 * @constructor
 */
const BadGoodsFormsBundle = props => (
    <Bundle load={() => import('./badgoodsforms')}>
        {BadGoodsFormsComponent => <BadGoodsFormsComponent {...props} />}
    </Bundle>
);
/**
 *  库存维护类报表
 * @param props
 * @returns {*}
 * @constructor
 */
const InventoryMaintenanceBundle = props => (
    <Bundle load={() => import('./inventorymaintenance')}>
        {InventoryMaintenanceComponent => <InventoryMaintenanceComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/wms/reportformsmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}stockforms/`} render={p => <StockFormsBundle {...props} {...p} />} />
                <Route path={`${path}badgoodsforms/`} render={p => <BadGoodsFormsBundle {...props} {...p} />} />
                <Route
                    path={`${path}inventorymaintenance/`}
                    render={p => <InventoryMaintenanceBundle {...props} {...p} />}
                />
            </Switch>
        </div>
    );
};


export default App;
