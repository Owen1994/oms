/**
 *作者: 陈文春
 *功能描述: 订单配置
 *时间: 2019年3月18日09:42:05
 */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Bundle from '@/common/components/bundle/bundle';

/**
 *作者: 陈文春
 *功能描述: 订单配置 - 渠道异常规则
 */
const Channelexceptionrule = (props) => (
    <Bundle load={() => import('./channelexceptionrule')}>
        {(Channelexceptionrule) => <Channelexceptionrule {...props} />}
    </Bundle>
)

/**
 *作者: 陈文春
 *功能描述: 订单配置 - 发货优选配置
 */
const Deliverypriorityconfig = (props) => (
    <Bundle load={() => import('./deliverypriorityconfig')}>
        {(Deliverypriorityconfig) => <Deliverypriorityconfig {...props} />}
    </Bundle>
)

const App = (props) => {
    const path = '/order/orderconfig/';
    return (
        <div>
            <Switch>
                <Route path={`${path}channelexceptionrule/`} render={(p) => <Channelexceptionrule {...props} {...p} />} />
                <Route path={`${path}deliverypriorityconfig/`} render={(p) => <Deliverypriorityconfig {...props} {...p} />} />
            </Switch>
        </div>
    )
};

export default App;
