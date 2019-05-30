/**
 *作者: 杨波
 *功能描述:  合规模块根路由
 *时间: 2018/7/21 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

// 商标商品分类
const Trademark = (props) => (
    <Bundle load={() => import('./trademark')}>
        {(Trademark) => <Trademark {...props} />}
    </Bundle>
);

// 风险代码
const Riskcode = (props) => (
    <Bundle load={() => import('./riskcode')}>
        {(Riskcode) => <Riskcode {...props} />}
    </Bundle>
);

// 图形商标分类
const Trademarkclass = (props) => (
    <Bundle load={() => import('./trademarkclass')}>
        {(Trademarkclass) => <Trademarkclass {...props} />}
    </Bundle>
);

// 特批销售账号类型
const PermitSaleAccount = (props) => (
    <Bundle load={() => import('./permitSaleAccount')}>
        {(PermitSaleAccount) => <PermitSaleAccount {...props} />}
    </Bundle>
);
// 审核人员设置
const ReviewerSetting = (props) => (
    <Bundle load={() => import('./reviewerSetting')}>
        {(ReviewerSetting) => <ReviewerSetting {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/compliance/setting/';
    return (
        <Switch>
            <Route path={`${path}trademark/`} render={() => <Trademark {...props} /> } />
            <Route path={`${path}riskcode/`} render={() => <Riskcode {...props} /> } />
            <Route path={`${path}trademarkclass/`} render={() => <Trademarkclass {...props} /> } />
            <Route path={`${path}reviewerSetting/`} render={() => <ReviewerSetting {...props} /> } />
            <Route path={`${path}permitSaleAccount/`} render={() => <PermitSaleAccount {...props} /> } />
            <Redirect from={path} to={`${path}trademark/`} />
        </Switch>
    )
};


export default App;
