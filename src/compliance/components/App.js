/**
 *作者: 杨波
 *功能描述:  合规模块根路由
 *时间: 2018/7/21 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

// 合规库
const DatabaseBundle = (props) => (
    <Bundle load={() => import('../database')}>
        {(DatabaseBundle) => <DatabaseBundle {...props} />}
    </Bundle>
);

// 合规库
const SettingBundle = (props) => (
    <Bundle load={() => import('../setting')}>
        {(SettingBundle) => <SettingBundle {...props} />}
    </Bundle>
);

// 知产查询
const QueryBundle = (props) => (
    <Bundle load={() => import('../query')}>
        {(QueryBundle) => <QueryBundle {...props} />}
    </Bundle>
);

// 知产处理
const Handle = (props) => (
    <Bundle load={() => import('../handle')}>
        {(Handle) => <Handle {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/compliance/';
    return (
        <Switch>
            <Route path={`${path}setting/`} render={() => <SettingBundle {...props} /> } />
            <Route path={`${path}database/`} render={() => <DatabaseBundle {...props} /> } />
            <Route path={`${path}query/`} render={() => <QueryBundle {...props} /> } />
            <Route path={`${path}handle/`} render={() => <Handle {...props} /> } />
            <Redirect from={path} to={`${path}setting/`} />
        </Switch>
    )
};


export default App;
