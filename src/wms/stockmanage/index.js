/**
 *作者: 陈文春
 *功能描述:  入库管理
 *时间: 2018年11月27日19:54:11
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  扫描收货
 * @param props
 * @returns {*}
 * @constructor
 */
const ScanAndCollectBundle = props => (
    <Bundle load={() => import('./scanandcollect')}>
        {ScanAndCollectComponent => <ScanAndCollectComponent {...props} />}
    </Bundle>
);

/**
 *  对图
 * @param props
 * @returns {*}
 * @constructor
 */
const CompareImageBundle = props => (
    <Bundle load={() => import('./compareimage')}>
        {CompareImageComponent => <CompareImageComponent {...props} />}
    </Bundle>
);

/**
 *  质检
 * @param props
 * @returns {*}
 * @constructor
 */
const QualityTestingBundle = props => (
    <Bundle load={() => import('./qualitytesting')}>
        {QualityTestingComponent => <QualityTestingComponent {...props} />}
    </Bundle>
);

/**
 *  批次管理
 * @param props
 * @returns {*}
 * @constructor
 */
const BatchManageBundle = props => (
    <Bundle load={() => import('./batchmanage')}>
        {BatchManageComponent => <BatchManageComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/stockmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}scanandcollect/`} render={p => <ScanAndCollectBundle {...props} {...p} />} />
                <Route path={`${path}compareimage/`} render={p => <CompareImageBundle {...props} {...p} />} />
                <Route path={`${path}qualitytesting/`} render={p => <QualityTestingBundle {...props} {...p} />} />
                <Route path={`${path}batchmanage/`} render={p => <BatchManageBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
