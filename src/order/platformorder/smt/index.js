/**
 *作者: 黄建峰
 *功能描述: 速卖通订单
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  速卖通订单
 * @param props
 * @returns {*}
 * @constructor
 */
const EbayBundle = (props) => (
    <Bundle load={() => import('./smtorderlist')}>
        {(EbayComponent) => <EbayComponent {...props} />}
    </Bundle>
);
/**
 *  速卖通订单详情
 * @param props
 * @returns {*}
 * @constructor
 */
const EbayDetailBundle = (props) => (
    <Bundle load={() => import('./smtorderdetail')}>
        {(EbayDetailComponent) => <EbayDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/smt/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`} render={(p) => <EbayBundle {...props} {...p}/> } />
                <Route path={`${path}smtorderdetail/`} render={(p) => <EbayDetailBundle {...props} {...p}/> } />
            </Switch>
        </div>
    )
};


export default App;
