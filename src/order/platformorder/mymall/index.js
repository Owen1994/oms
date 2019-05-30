/**
 *作者: 黄建峰
 *功能描述:  Ebay订单
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  mymall订单
 * @param props
 * @returns {*}
 * @constructor
 */
const MymallBundle = (props) => (
    <Bundle load={() => import('./indexs')}>
        {(MymallComponent) => <MymallComponent {...props} />}
    </Bundle>
);
/**
 *  mymall订单详情
 * @param props
 * @returns {*}
 * @constructor
 */
const MymallDetailBundle = (props) => (
    <Bundle load={() => import('./detail')}>
        {(MymallDetailComponent) => <MymallDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/mymall/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}`} render={(p) => <MymallBundle {...props} {...p}/> } />
                <Route path={`${path}detail/`} render={(p) => <MymallDetailBundle {...props} {...p}/> } />
            </Switch>
        </div>
    )
};


export default App;
