/**
 *作者: 黄建峰
 *功能描述:  销售定价
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'
/**
 *  定价&利润率核算
 * @param props
 * @returns {*}
 * @constructor
 */
const ProfitsBundle = (props) => (
    <Bundle load={() => import('./profits')}>
        {(ProfitsComponent) => <ProfitsComponent {...props} />}
    </Bundle>
);
/**
 *  动态数据配置
 * @param props
 * @returns {*}
 * @constructor
 */
const DynamicDataConfigBundle = (props) => (
    <Bundle load={() => import('./dynamicdataconfig')}>
        {(DynamicDataConfigComponent) => <DynamicDataConfigComponent {...props} />}
    </Bundle>
);

/**
 *  国内仓
 * @param props
 * @returns {*}
 * @constructor
 */
const DomesticBundle = (props) => (
    <Bundle load={() => import('./domesticwarehouse')}>
        {(DomesticComponent) => <DomesticComponent {...props} />}
    </Bundle>
);

/**
 *  售价计算规则
 * @param props
 * @returns {*}
 * @constructor
 */
const ComputedRuleBundle = (props) => (
    <Bundle load={() => import('./computedrule')}>
        {(ComputedRuleComponent) => <ComputedRuleComponent {...props} />}
    </Bundle>
);

/**
 *  SKU账号权限控制
 * @param props
 * @returns {*}
 * @constructor
 */
const SkuPermissionConfigBundle = (props) => (
    <Bundle load={() => import('./skupermissionconfig')}>
        {(SkuPermissionConfigComponent) => <SkuPermissionConfigComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/publish/salespricing/';
    return (
        <div>
            <Switch>
                <Route path={`${path}profits/`} render={(p) => <ProfitsBundle {...props} {...p}/> } />
                <Route path={`${path}dynamicdataconfig/`} render={(p) => <DynamicDataConfigBundle {...props} {...p}/> } />
                <Route path={`${path}domesticwarehouse/`} render={(p) => <DomesticBundle {...props} {...p}/> } />
                <Route path={`${path}computedRule/`} render={(p) => <ComputedRuleBundle {...props} {...p}/> } />
                <Route path={`${path}skupermissionconfig/`} render={(p) => <SkuPermissionConfigBundle {...props} {...p}/> } />
                <Redirect from={path} to={`${path}profits/`} />
            </Switch>
        </div>
    )
};


export default App;
