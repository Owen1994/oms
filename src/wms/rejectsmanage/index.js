/**
 *作者: 陈文春
 *功能描述:  不良品管理
 *时间: 2018年11月27日19:51:00
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  不良品库存查询
 * @param props
 * @returns {*}
 * @constructor
 */
const RejectsInventoryDemandBundle = props => (
    <Bundle load={() => import('./rejectsinventorydemand')}>
        {RejectsInventoryDemandComponent => <RejectsInventoryDemandComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/rejectsmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}rejectsinventorydemand/`} render={p => <RejectsInventoryDemandBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
