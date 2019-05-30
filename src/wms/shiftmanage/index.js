/**
 *作者: 蒋林峰
 *功能描述:  移位管理
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  移位列表
 * @param props
 * @returns {*}
 * @constructor
 */
const ShiftListBundle = props => (
    <Bundle load={() => import('./shiftlist')}>
        {ShiftListComponent => <ShiftListComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/shiftmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}shiftlist/`} render={p => <ShiftListBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
