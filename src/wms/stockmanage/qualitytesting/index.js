/**
 *作者: 陈文春
 *功能描述:  质检
 *时间: 2018年12月11日11:48:20
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  质检
 * @param props
 * @returns {*}
 * @constructor
 */
const QualityTestingBundle = props => (
    <Bundle load={() => import('./indexs')}>
        {QualityTestingComponent => <QualityTestingComponent {...props} />}
    </Bundle>
);
/**
 *  打印箱唛标签
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
    const path = '/wms/stockmanage/qualitytesting/';
    return (
        <div>
            <Switch>
                <Route path={`${path}print/`} render={p => <PrintBundle {...props} {...p} />} />
                <Route exact path={path} render={p => <QualityTestingBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
