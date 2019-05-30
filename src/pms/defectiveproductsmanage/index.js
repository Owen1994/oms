/**
 *作者: zhengxuening
 *功能描述:  不良品管理
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  普通产品
 * @param props
 * @returns {*}
 * @constructor
 */
const CommonproductBundle = props => (
    <Bundle load={() => import('./commonproduct')}>
        {CommonproductComponent => <CommonproductComponent {...props} />}
    </Bundle>
);

/**
 *  三无产品
 * @param props
 * @returns {*}
 * @constructor
 */
const NoneproductBundle = props => (
    <Bundle load={() => import('./noneproduct')}>
        {NoneproductComponent => <NoneproductComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/pms/defectiveproductsmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}commonproduct/`} render={p => <CommonproductBundle {...props} {...p} />} />

                <Route path={`${path}noneproduct/`} render={p => <NoneproductBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};

export default App;
