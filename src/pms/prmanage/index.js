/**
 *作者: 黄建峰
 *功能描述:  PR管理
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  PR查询
 * @param props
 * @returns {*}
 * @constructor
 */
const PrqueryBundle = props => (
    <Bundle load={() => import('./prquery')}>
        {PrqueryComponent => <PrqueryComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/pms/prmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}prquery/`} render={p => <PrqueryBundle {...props} {...p} />} />
                <Redirect from={path} to={`${path}prquery/`} />
            </Switch>
        </div>
    );
};


export default App;
