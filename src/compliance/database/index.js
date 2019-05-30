/**
 *作者: 杨波
 *功能描述:  合规模块根路由
 *时间: 2018/7/21 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

// 敏感词库
const Sensitive = (props) => (
    <Bundle load={() => import('./sensitive')}>
        {(Sensitive) => <Sensitive {...props} />}
    </Bundle>
);

// 爬虫抓取
const Reptilian = (props) => (
    <Bundle load={() => import('./reptilian')}>
        {(Reptilian) => <Reptilian {...props} />}
    </Bundle>
);

// 敏感SKU库
const Sku = (props) => (
    <Bundle load={() => import('./sku')}>
        {(Sku) => <Sku {...props} />}
    </Bundle>
);

// 专利库
const Patent = (props) => (
    <Bundle load={() => import('./patent')}>
        {(Patent) => <Patent {...props} />}
    </Bundle>
);

// 版本库
const Version = (props) => (
    <Bundle load={() => import('./version')}>
        {(Version) => <Version {...props} />}
    </Bundle>
);

// 平台违禁品
const Contraband = (props) => (
    <Bundle load={() => import('./contraband')}>
        {(Contraband) => <Contraband {...props} />}
    </Bundle>
);

// 平台违禁品库
const Graphictrademark = (props) => (
    <Bundle load={() => import('./graphictrademark')}>
        {(Graphictrademark) => <Graphictrademark {...props} />}
    </Bundle>
);

// 平台认证库
const Authentication = (props) => (
    <Bundle load={() => import('./authentication')}>
        {(Authentication) => <Authentication {...props} />}
    </Bundle>
);

// 按条件获取
const Condition = (props) => (
    <Bundle load={() => import('./condition')}>
        {(Condition) => <Condition {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/compliance/database/';
    return (
        <Switch>
            <Route exact={true} path={`${path}sensitive/`} render={() => <Sensitive {...props} /> } />
            <Route path={`${path}sensitive/reptilian/`} render={() => <Reptilian {...props} /> } />
            <Route exact={true} path={`${path}sku/`} render={() => <Sku {...props} /> } />
            <Route path={`${path}patent/`} render={() => <Patent {...props} /> } />
            <Route path={`${path}version/`} render={() => <Version {...props} /> } />
            <Route path={`${path}contraband/`} render={() => <Contraband {...props} /> } />
            <Route path={`${path}graphictrademark/`} render={() => <Graphictrademark {...props} /> } />
            <Route path={`${path}authentication/`} render={() => <Authentication {...props} /> } />
            <Route path={`${path}sku/conditionmenu`} render={() => <Condition {...props} /> } />
            <Redirect from={path} to={`${path}sensitive/`} />
        </Switch>
    )
};


export default App;
