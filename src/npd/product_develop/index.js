/**
 *作者: 黄建峰
 *功能描述:  关税模块根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "../common/css.css"

import Bundle from '../../common/components/bundle/bundle'
/**
 *  热销新品申请（销售）
 * @param props
 * @returns {*}
 * @constructor
 */
const HotNpdApplyBundle = (props) => (
    <Bundle load={() => import('./hot_npd_apply')}>
        {(HotNpdApplyComponent) => <HotNpdApplyComponent {...props} />}
    </Bundle>
);
/**
 *  新品立项表
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdProjectBundle = (props) => (
    <Bundle load={() => import('./npd_project')}>
        {(NpdProjectComponent) => <NpdProjectComponent {...props} />}
    </Bundle>
);
/**
 *  样品表
 * @param props
 * @returns {*}
 * @constructor
 */
const SpecimenBundle = (props) => (
    <Bundle load={() => import('./specimen')}>
        {(SpecimenComponent) => <SpecimenComponent {...props} />}
    </Bundle>
);

/**
 *  新品交接表（国内线）
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdHandoverBundle = (props) => (
    <Bundle load={() => import('./npd_handover/index')}>
        {(NpdHandoverComponent) => <NpdHandoverComponent {...props} />}
    </Bundle>
);
/**
 *  新品SKU列表
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdSkuBundle = (props) => (
    <Bundle load={() => import('./npd_sku')}>
        {(NpdSkuComponent) => <NpdSkuComponent {...props} />}
    </Bundle>
);
/**
 *  新品跟踪表
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdTrackBundle = (props) => (
    <Bundle load={() => import('./npd_track')}>
        {(NpdTrackComponent) => <NpdTrackComponent {...props} />}
    </Bundle>
);
/**
 *  首单申请列表
 * @param props
 * @returns {*}
 * @constructor
 */
const FirstApplyBundle = (props) => (
    <Bundle load={() => import('./first_apply')}>
        {(FirstApplyComponent) => <FirstApplyComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/npd/pd';
    return (
        <div className="npd">
            <Switch>
                <Route path={`${path}/hnpdapply/`} render={(p) => <HotNpdApplyBundle {...props} {...p}/> } />
                <Route path={`${path}/project/`} render={(p) => <NpdProjectBundle {...props} {...p}/> } />
                <Route path={`${path}/specimen/`} render={() => <SpecimenBundle {...props} /> } />
                <Route path={`${path}/handover/`} render={() => <NpdHandoverBundle {...props} /> } />
                <Route path={`${path}/sku/`} render={() => <NpdSkuBundle {...props} /> } />
                <Route path={`${path}/track/`} render={() => <NpdTrackBundle {...props} /> } />
                <Route path={`${path}/fapply/`} render={() => <FirstApplyBundle {...props} /> } />
                <Redirect from={path} to={`${path}/hnpdapply/`} />
            </Switch>
        </div>
    )
};


export default App;
