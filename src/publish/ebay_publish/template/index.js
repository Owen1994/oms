/**
 *作者: 黄建峰
 *功能描述:  基础设置
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Bundle from '../../../common/components/bundle/bundle'
/**
 *  描述模板
 * @param props
 * @returns {*}
 * @constructor
 */
const TemplateManageBundle = (props) => (
    <Bundle load={() => import('./App')}>
        {(TemplateManageComponent) => <TemplateManageComponent {...props} />}
    </Bundle>
);
/**
 *  运输模板
 * @param props
 * @returns {*}
 * @constructor
 */
// const TransportBundle = (props) => (
//     <Bundle load={() => import('./transport')}>
//         {(TransportComponent) => <TransportComponent {...props} />}
//     </Bundle>
// );
/**
 *  退货模板
 * @param props
 * @returns {*}
 * @constructor
 */
// const ReturnBundle = (props) => (
//     <Bundle load={() => import('./return')}>
//         {(ReturnComponent) => <ReturnComponent {...props} />}
//     </Bundle>
// );
/**
 *  付款模板
 * @param props
 * @returns {*}
 * @constructor
 */
// const PaymentBundle = (props) => (
//     <Bundle load={() => import('./payment')}>
//         {(PaymentComponent) => <PaymentComponent {...props} />}
//     </Bundle>
// );

/**
 *  模板匹配规则
 * @param props
 * @returns {*}
 * @constructor
 */
const MatchruleBundle = (props) => (
    <Bundle load={() => import('./matchrule')}>
        {(MatchruleComponent) => <MatchruleComponent {...props} />}
    </Bundle>
);
/**
 *  模板匹配规则
 * @param props
 * @returns {*}
 * @constructor
 */
// const PublishBundle = (props) => (
//     <Bundle load={() => import('./publish')}>
//         {(PublishComponent) => <PublishComponent {...props} />}
//     </Bundle>
// );

const App = (props) => {
    const path = '/publish/template/';
    return (
        <div>
            <Switch>
                {/*<Route path={`${path}transport/`} render={(p) => <TransportBundle {...props} {...p}/> } />*/}
                {/*<Route path={`${path}return/`} render={(p) => <ReturnBundle {...props} {...p}/> } />*/}
                {/*<Route path={`${path}payment/`} render={(p) => <PaymentBundle {...props} {...p}/> } />*/}
                <Route exact path={`${path}matchrule/`} render={(p) => <MatchruleBundle {...props} {...p}/> } />
                {/*<Route path={`${path}publishtemplate/`} render={(p) => <PublishBundle {...props} {...p}/> } />*/}
                <Route path={`${path}`} render={(p) => <TemplateManageBundle {...props} {...p}/> } />
                {/*<Redirect from={path} to={`${path}App/`} />*/}
            </Switch>
        </div>
    )
};


export default App;
