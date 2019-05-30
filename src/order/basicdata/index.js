/**
 *作者: 黄建峰
 *功能描述:  批量刊登
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'
/**
 *  跟踪号管理
 * @param props
 * @returns {*}
 * @constructor
 */
const TracknumbermanageBundle = (props) => (
    <Bundle load={() => import('./tracknumbermanage')}>
        {(TracknumbermanageComponent) => <TracknumbermanageComponent {...props} />}
    </Bundle>
);
/**
 *  渠道管理
 * @param props
 * @returns {*}
 * @constructor
 */
const ChannelListBundle = (props) => (
    <Bundle load={() => import('./channellist')}>
        {(ChannelListmanageComponent) => <ChannelListmanageComponent {...props} />}
    </Bundle>
);

/**
 *  导入导出记录
 * @param props
 * @returns {*}
 * @constructor
 */
const ImportexportrecordsBundle = (props) => (
    <Bundle load={() => import('./importexportrecords')}>
        {(ImportexportrecordsComponent) => <ImportexportrecordsComponent {...props} />}
    </Bundle>
);



const App = (props) => {
    const path = '/order/basicdata/';
    return (
        <div>
            <Switch>
                <Route path={`${path}tracknumbermanage/`} render={(p) => <TracknumbermanageBundle {...props} {...p}/> } />
                <Route path={`${path}channellist/`} render={(p) => <ChannelListBundle {...props} {...p}/> } />
                <Route path={`${path}importexportrecords/`} render={(p) => <ImportexportrecordsBundle {...props} {...p}/> } />
                <Redirect from={path} to={`${path}tracknumbermanage/`} />
            </Switch>
        </div>
    )
};


export default App;
