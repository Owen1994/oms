/**
 *作者: 黄建峰
 *功能描述:  采购管理
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  订货管理
 * @param props
 * @returns {*}
 * @constructor
 */
const OrdermanageBundle = props => (
    <Bundle load={() => import('./ordermanage')}>
        {OrdermanageComponent => <OrdermanageComponent {...props} />}
    </Bundle>
);
/**
 *  订货管理 订货明细列表
 * @param props
 * @returns {*}
 * @constructor
 */
const OrdermanagedetaillistBundle = props => (
    <Bundle load={() => import('./ordermanagedetaillist')}>
        {Ordermanagedetaillist => <Ordermanagedetaillist {...props} />}
    </Bundle>
);
/**
 *  核价管理
 * @param props
 * @returns {*}
 * @constructor
 */
const CheckpricemanageBundle = props => (
    <Bundle load={() => import('./checkpricemanage')}>
        {CheckpricemanageComponent => <CheckpricemanageComponent {...props} />}
    </Bundle>
);
/**
 *  SKU价格核查页面
 * @param props
 * @returns {*}
 * @constructor
 */
const SkuCheckpricBundle = props => (
    <Bundle load={() => import('./checkpricemanageDetail')}>
        {CheckpricemanageComponent => <CheckpricemanageComponent {...props} />}
    </Bundle>
);

/**
 *  跟单管理
 * @param props
 * @returns {*}
 * @constructor
 */
const DocumentarymanageBundle = props => (
    <Bundle load={() => import('./documentarymanage')}>
        {DocumentarymanageComponent => <DocumentarymanageComponent {...props} />}
    </Bundle>
);

/**
 *  供应商跟单明细
 * @param props
 * @returns {*}
 * @constructor
 */
const DocumentarymanageDetailBundle = props => (
    <Bundle load={() => import('./documentarymanagedetail')}>
        {DocumentarymanageDetailComponent => <DocumentarymanageDetailComponent {...props} />}
    </Bundle>
);

/**
 *  送货单管理
 * @param props
 * @returns {*}
 * @constructor
 */
const DeliveryordermanageBundle = props => (
    <Bundle load={() => import('./deliveryordermanage')}>
        {DeliveryordermanageComponent => <DeliveryordermanageComponent {...props} />}
    </Bundle>
);

/**
 *  采购单查询
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderqueryBundle = props => (
    <Bundle load={() => import('./orderquery')}>
        {OrderqueryComponent => <OrderqueryComponent {...props} />}
    </Bundle>
);

/**
 *  采购单明细
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderqueryDetailBundle = props => (
    <Bundle load={() => import('./orderquerydetail')}>
        {OrderqueryDetailComponent => <OrderqueryDetailComponent {...props} />}
    </Bundle>
);

/**
 *  采购单打印页
 * @param props
 * @returns {*}
 * @constructor
 */
const OrderqueryPrintBundle = props => (
    <Bundle load={() => import('./orderqueryprint')}>
        {OrderqueryPrintComponent => <OrderqueryPrintComponent {...props} />}
    </Bundle>
);

/**
 *  阿里订单查询
 * @param props
 * @returns {*}
 * @constructor
 */
const ALorderqueryBundle = props => (
    <Bundle load={() => import('./alorderquery')}>
        {ALorderqueryComponent => <ALorderqueryComponent {...props} />}
    </Bundle>
);

/**
 *  阿里订单查询
 * @param props
 * @returns {*}
 * @constructor
 */
const ALorderquerydetailBundle = props => (
    <Bundle load={() => import('./alorderquerydetail')}>
        {ALorderquerydetailComponent => <ALorderquerydetailComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/pms/purchasemanage/';
    return (
        <div>
            <Switch>
                <Route exact path={`${path}documentarymanage/`} render={p => <DocumentarymanageBundle {...props} {...p} />} />
                <Route exact path={`${path}documentarymanage/detail/`} render={p => <DocumentarymanageDetailBundle {...props} {...p} />} />
                <Route exact path={`${path}ordermanage/detaillist/`} render={p => <OrdermanagedetaillistBundle {...props} {...p} />} />
                <Route exact path={`${path}checkpricemanage/`} render={p => <CheckpricemanageBundle {...props} {...p} />} />
                <Route exact path={`${path}checkpricemanage/skucheckpric/`} render={p => <SkuCheckpricBundle {...props} {...p} />} />
                <Route exact path={`${path}ordermanage/`} render={p => <OrdermanageBundle {...props} {...p} />} />
                <Route path={`${path}deliveryordermanage/`} render={p => <DeliveryordermanageBundle {...props} {...p} />} />
                <Route exact path={`${path}orderquery/`} render={p => <OrderqueryBundle {...props} {...p} />} />
                <Route exact path={`${path}orderquery/detail/`} render={p => <OrderqueryDetailBundle {...props} {...p} />} />
                <Route exact path={`${path}orderquery/print/`} render={p => <OrderqueryPrintBundle {...props} {...p} />} />
                <Route exact path={`${path}alorderquery/`} render={p => <ALorderqueryBundle {...props} {...p} />} />
                <Route exact path={`${path}alorderquery/detail`} render={p => <ALorderquerydetailBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};

export default App;
