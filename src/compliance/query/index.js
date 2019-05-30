/**
 *作者: 李佳时
 *功能描述:  合规模块根路由
 *时间: 2018/7/21 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

// 商标商品分类
const IntellectualQuery = (props) => (
    <Bundle load={() => import('./intellectualQuery')}>
        {(IntellectualQuery) => <IntellectualQuery {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/compliance/query/';
    return (
        <Switch>
            <Route path={`${path}intellctual/`} render={() => <IntellectualQuery {...props} /> } />
            <Redirect from={path} to={`${path}sensitive/`} />
        </Switch>
    )
};


export default App;
