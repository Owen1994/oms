/**
 *作者: 黄建峰
 *功能描述:  新品跟踪
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";

import Bundle from '../../../../common/components/bundle/bundle'
/**
 *  新品跟踪
 * @param props
 * @returns {*}
 * @constructor
 */
const TrackNpdBundle = (props) => (
    <Bundle load={() => import('../containers')}>
        {(TrackNpdComponent) => <TrackNpdComponent {...props} />}
    </Bundle>
);
/**
 *  首单申请
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdApplyBundle = (props) => (
    <Bundle load={() => import('../containers/OrderApply')}>
        {(NpdApplyComponent) => <NpdApplyComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/npd/pd/track';
    return (
        <Switch>
            <Route path={`${path}/apply/`} render={() => <NpdApplyBundle {...props} /> } />
            <Route path={`${path}/`} render={(p) => <TrackNpdBundle {...props}/> } />
        </Switch>
    )
};


export default App;
