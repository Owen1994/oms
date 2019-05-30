/**
 *作者: 黄建峰
 *功能描述:  平台订单
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Bundle from '../../common/components/bundle/bundle';

/**
 *  速卖通订单
 * @param props
 * @returns {*}
 * @constructor
 */
const SmtBundle = (props) => (
    <Bundle load={() => import('./smt')}>
        {(SmtComponent) => <SmtComponent {...props} />}
    </Bundle>
);

/**
 *  wish订单
 * @param props
 * @returns {*}
 * @constructor
 */
const WishBundle = (props) => (
    <Bundle load={() => import('./wish')}>
        {(WishComponent) => <WishComponent {...props} />}
    </Bundle>
);

/**
 *  ebay订单
 * @param props
 * @returns {*}
 * @constructor
 */
const EbayBundle = (props) => (
    <Bundle load={() => import('./ebay')}>
        {(EbayComponent) => <EbayComponent {...props} />}
    </Bundle>
);

/**
 *  joom订单
 * @param props
 * @returns {*}
 * @constructor
 */
const JoomBundle = (props) => (
    <Bundle load={() => import('./joom')}>
        {(JoomComponent) => <JoomComponent {...props} />}
    </Bundle>
);

/**
 *  amazon订单
 * @param props
 * @returns {*}
 * @constructor
 */
const AmazonBundle = (props) => (
    <Bundle load={() => import('./amazon')}>
        {(AmazonComponent) => <AmazonComponent {...props} />}
    </Bundle>
);

/**
 *  mymall订单
 * @param props
 * @returns {*}
 * @constructor
 */
const MymallBundle = (props) => (
    <Bundle load={() => import('./mymall')}>
        {(MymallComponent) => <MymallComponent {...props} />}
    </Bundle>
);

/**
 *  shoppe订单
 * @param props
 * @returns {*}
 * @constructor
 */
const ShopeeBundle = (props) => (
    <Bundle load={() => import('./shopee')}>
        {(ShopeeComponent) => <ShopeeComponent {...props} />}
    </Bundle>
);


/**
 *  订单导入
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderImportBundle = (props) => (
    <Bundle load={() => import('./orderimport')}>
        {(OrderImportComponent) => <OrderImportComponent {...props} />}
    </Bundle>
);

/**
 *  订单定位
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderLocationBundle = (props) => (
    <Bundle load={() => import('./orderlocation')}>
        {(OrderLocationBundle) => <OrderLocationBundle {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/order/platformorder/';
    return (
        <div>
            <Switch>
                <Route path={`${path}smt/`} render={(p) => <SmtBundle {...props} {...p} />} />
                <Route path={`${path}wish/`} render={(p) => <WishBundle {...props} {...p} />} />
                <Route path={`${path}ebay/`} render={(p) => <EbayBundle {...props} {...p} />} />
                <Route path={`${path}joom/`} render={(p) => <JoomBundle {...props} {...p} />} />
                <Route path={`${path}amazon/`} render={(p) => <AmazonBundle {...props} {...p} />} />
                <Route path={`${path}mymall/`} render={(p) => <MymallBundle {...props} {...p} />} />
                <Route path={`${path}shopee/`} render={(p) => <ShopeeBundle {...props} {...p} />} />
                <Route path={`${path}orderimport/`} render={(p) => <OrderImportBundle {...props} {...p} />} />
                <Route path={`${path}orderlocation/`} render={(p) => <OrderLocationBundle {...props} {...p} />} />
                <Redirect from={path} to={`${path}smt/`} />
            </Switch>
        </div>
    )
};


export default App;
