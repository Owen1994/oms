/**
 *作者: 黄建峰
 *功能描述:  Ebay订单
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  ebay订单
 * @param props
 * @returns {*}
 * @constructor
 */
const ShopeeBundle = (props) => (
    <Bundle load={() => import('./indexs')}>
        {(ShopeeComponent) => <ShopeeComponent {...props} />}
    </Bundle>
);
/**
 *  ebay订单详情
 * @param props
 * @returns {*}
 * @constructor
 */
const ShopeeDetailBundle = (props) => (
    <Bundle load={() => import('./detail')}>
        {(ShopeeDetailComponent) => <ShopeeDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/shopee/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}`} render={(p) => <ShopeeBundle {...props} {...p}/> } />
                <Route path={`${path}detail/`} render={(p) => <ShopeeDetailBundle {...props} {...p}/> } />
            </Switch>
        </div>
    )
};


export default App;
