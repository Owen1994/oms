/**
 *作者: 陈文春
 *功能描述: 包裹订单
 *时间: 2019年3月18日09:42:05
 */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Bundle from '@/common/components/bundle/bundle';

/**
 *作者: 陈文春
 *功能描述: 包裹订单 - 渠道异常
 */
const Channelexception = (props) => (
    <Bundle load={() => import('./channelexception')}>
        {(Channelexception) => <Channelexception {...props} />}
    </Bundle>
)

/**
 *作者: 陈文春
 *功能描述: 包裹订单 - 缺货包裹
 */
const Stockoutpackage = (props) => (
    <Bundle load={() => import('./stockoutpackage')}>
        {(Stockoutpackage) => <Stockoutpackage {...props} />}
    </Bundle>
)

const App = (props) => {
    const path = '/order/packageorder/';
    return (
        <div>
            <Switch>
                <Route path={`${path}channelexception/`} render={(p) => <Channelexception {...props} {...p} />} />
                <Route path={`${path}stockoutpackage/`} render={(p) => <Stockoutpackage {...props} {...p} />} />
            </Switch>
        </div>
    )
};


export default App;
