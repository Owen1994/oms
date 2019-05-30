/**
 *作者: 李佳时
 *功能描述:  合规模块根路由
 *时间: 2018/7/21 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

// baseInfo审核
const BaseInfo = (props) => (
    <Bundle load={() => import('./baseInfo')}>
        {(BaseInfo) => <BaseInfo {...props} />}
    </Bundle>
);

// baseInfo审核详情
const BaseInfoDetail = (props) => (
    <Bundle load={() => import('./baseInfo/components/auditDetail')}>
        {(BaseInfoDetail) => <BaseInfoDetail {...props} />}
    </Bundle>
);

// list图片审核
const Listing = (props) => (
    <Bundle load={() => import('./listing')}>
        {(Listing) => <Listing {...props} />}
    </Bundle>
);

// list图片审核详情
const ListingDetail = (props) => (
    <Bundle load={() => import('./listing/components/auditDetail')}>
        {(Listing) => <Listing {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/compliance/handle/';
    return (
        <Switch>
            <Route exact path={`${path}baseInfo/`} render={() => <BaseInfo {...props} /> } />
            <Route exact path={`${path}baseInfo/detail/`} render={() => <BaseInfoDetail {...props} /> } />
            <Route exact path={`${path}listingImageReview/`} render={() => <Listing {...props} /> } />
            <Route exact path={`${path}listingImageReview/detail/`} render={() => <ListingDetail {...props} /> } />
            <Redirect from={path} to={`${path}sensitive/`} />
        </Switch>
    )
};


export default App;
