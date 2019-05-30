/**
 *作者: 陈文春
 *功能描述:  对图
 *时间: 2018年11月27日20:04:12
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  对图
 * @param props
 * @returns {*}
 * @constructor
 */
const CompareImageBundle = props => (
    <Bundle load={() => import('./indexs')}>
        {CompareImageComponent => <CompareImageComponent {...props} />}
    </Bundle>
);
/**
 *  对图详情
 * @param props
 * @returns {*}
 * @constructor
 */
const CompareImageDetailBundle = props => (
    <Bundle load={() => import('./detail')}>
        {CompareImageDetailComponent => <CompareImageDetailComponent {...props} />}
    </Bundle>
);
/**
 *  打印SKU标签
 * @param props
 * @returns {*}
 * @constructor
 */
const PrintBundle = props => (
    <Bundle load={() => import('./print')}>
        {PrintComponent => <PrintComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/wms/stockmanage/compareimage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}detail/`} render={p => <CompareImageDetailBundle {...props} {...p} />} />
                <Route path={`${path}print/`} render={p => <PrintBundle {...props} {...p} />} />
                <Route exact path={path} render={p => <CompareImageBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
