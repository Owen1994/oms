import React from "react";
import { Route, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'

/**
 * 轨迹查询
 * @param props
 * @returns {*}
 * @constructor
 */
const QueryBundle = (props) => (
    <Bundle load={() => import('./query')}>
        {(QueryComponent) => <QueryComponent {...props} />}
    </Bundle>
);

/**
 * 渠道设置
 * @param props
 * @returns {*}
 * @constructor
 */
const ChannelSetBundle = (props) => (
    <Bundle load={() => import('./channelset')}>
        {(ChannelSetComponent) => <ChannelSetComponent {...props} />}
    </Bundle>
);
/**
 *  轨迹状态设置
 * @param props
 * @returns {*}
 * @constructor
 */
const ChannelStateSetBundle = (props) => (
    <Bundle load={() => import('./channelstateset')}>
        {(ChannelStateSetComponent) => <ChannelStateSetComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/lgtconfig/trajectory/';
    return (
        <Switch>
            <Route path={`${path}query/`} render={(p) => <QueryBundle {...props} {...p}/> } />
            <Route path={`${path}channelset/`} render={(p) => <ChannelSetBundle {...props} {...p}/> } />
            <Route path={`${path}channelstateset/`} render={(p) => <ChannelStateSetBundle {...props} {...p}/> } />
        </Switch>
    )
};


export default App;
