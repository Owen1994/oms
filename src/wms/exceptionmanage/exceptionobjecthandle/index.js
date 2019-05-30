/**
 *作者: 陈文春
 *功能描述:  异常处理
 *时间: 2018年11月27日20:04:12
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  异常处理页面
 * @param props
 * @returns {*}
 * @constructor
 */
const ExceptionObjectHandleBundle = props => (
    <Bundle load={() => import('./indexs')}>
        {ExceptionObjectHandleComponent => <ExceptionObjectHandleComponent {...props} />}
    </Bundle>
);
/**
 *  打印SKU标签页面
 * @param props
 * @returns {*}
 * @constructor
 */
const SkuPrintBundle = props => (
    <Bundle load={() => import('./skuprint')}>
        {SkuPrintComponent => <SkuPrintComponent {...props} />}
    </Bundle>
);
/**
 *  打印箱唛标签页面
 * @param props
 * @returns {*}
 * @constructor
 */
const BoxPrintBundle = props => (
    <Bundle load={() => import('./boxprint')}>
        {BoxPrintComponent => <BoxPrintComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/wms/exceptionmanage/exceptionobjecthandle/';
    return (
        <div>
            <Switch>
                <Route path={`${path}skuprint/`} render={p => <SkuPrintBundle {...props} {...p} />} />
                <Route path={`${path}boxprint/`} render={p => <BoxPrintBundle {...props} {...p} />} />
                <Route exact path={path} render={p => <ExceptionObjectHandleBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
