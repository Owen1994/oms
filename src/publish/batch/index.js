/**
 *作者: 黄建峰
 *功能描述:  批量刊登
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'
/**
 *  批量导入
 * @param props
 * @returns {*}
 * @constructor
 */
const BatchImportBundle = (props) => (
    <Bundle load={() => import('./batchimport')}>
        {(BatchImportComponent) => <BatchImportComponent {...props} />}
    </Bundle>
);
/**
 *  刊登队列
 * @param props
 * @returns {*}
 * @constructor
 */
const BatchQueueBundle = (props) => (
    <Bundle load={() => import('./batchqueue')}>
        {(BatchQueueComponent) => <BatchQueueComponent {...props} />}
    </Bundle>
);

/**
 *  Shopee物流查询
 * @param props
 * @returns {*}
 * @constructor
 */
const BatchShopeeLgtBundle = (props) => (
    <Bundle load={() => import('./batchshopeelgtquery')}>
        {(BatchShopeeLgtComponent) => <BatchShopeeLgtComponent {...props} />}
    </Bundle>
);

/**
 *  Amazon库存模板
 * @param props
 * @returns {*}
 * @constructor
 */
const BatchamazonstocktempBundle = (props) => (
    <Bundle load={() => import('./batchamazonstocktemp')}>
        {(BatchamazonstocktempComponent) => <BatchamazonstocktempComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/publish/batch/';
    return (
        <div>
            <Switch>
                <Route path={`${path}batchimport/`} render={(p) => <BatchImportBundle {...props} {...p}/> } />
                <Route path={`${path}batchqueue/`} render={(p) => <BatchQueueBundle {...props} {...p}/> } />
                <Route path={`${path}batchshopeelgtquery/`} render={(p) => <BatchShopeeLgtBundle {...props} {...p}/> } />
                <Route path={`${path}batchamazonstocktemp/`} render={(p) => <BatchamazonstocktempBundle {...props} {...p}/> } />
                <Redirect from={path} to={`${path}batchimport/`} />
            </Switch>
        </div>
    )
};


export default App;
