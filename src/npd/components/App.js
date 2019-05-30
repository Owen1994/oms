/**
 *作者: 黄建峰
 *功能描述:  关税模块根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '@/common/components/bundle/bundle'
/**
 *  基础数据
 * @param props
 * @returns {*}
 * @constructor
 */
const BasicDataBundle = (props) => (
    <Bundle load={() => import('../basic_data')}>
        {(BasicDataComponent) => <BasicDataComponent {...props} />}
    </Bundle>
);
/**
 *  新品开发
 * @param props
 * @returns {*}
 * @constructor
 */
const ProductDevelopBundle = (props) => (
    <Bundle load={() => import('../product_develop')}>
        {(ProductDevelopComponent) => <ProductDevelopComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/npd';
    return (
        <Switch>
            <Route path={`${path}/bd/`} render={(p) => <BasicDataBundle {...props} {...p}/> } />
            <Route path={`${path}/pd/`} render={(p) => <ProductDevelopBundle {...props} {...p}/> } />
            <Redirect from="/npd/" to={`${path}/bd/`} />
        </Switch>
    )
};


export default App;
