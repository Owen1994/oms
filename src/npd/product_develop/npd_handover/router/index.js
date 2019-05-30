/**
 *作者: 黄建峰
 *功能描述:  新品交接根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";

import Bundle from '../../../../common/components/bundle/bundle'
/**
 *  新品交接列表
 * @param props
 * @returns {*}
 * @constructor
 */
const NpdListBundle = (props) => (
    <Bundle load={() => import('../list/containers/index')}>
        {(NpdListComponent) => <NpdListComponent {...props} />}
    </Bundle>
);
/**
 *  修改  交接
 * @param props
 * @returns {*}
 * @constructor
 */
const EditBundle = (props) => (
    <Bundle load={() => import('../edit/containers/index')}>
        {(EditComponent) => <EditComponent {...props} />}
    </Bundle>
);
/**
 *  交接明细
 * @param props
 * @returns {*}
 * @constructor
 */
const ProjectDetailBundle = (props) => (
    <Bundle load={() => import('../project_detail/containers/index')}>
        {(ProjectDetailComponent) => <ProjectDetailComponent {...props} />}
    </Bundle>
);
/**
 *  审核界面
 * @param props
 * @returns {*}
 * @constructor
 */
const ReviewBundle = (props) => (
    <Bundle load={() => import('../review/containers/index')}>
        {(ReviewComponent) => <ReviewComponent {...props} />}
    </Bundle>
);
const App = (props) => {
    const path = '/npd/pd/handover';
    return (
        <Switch>
            <Route exact path={`${path}/`} render={(p) => <NpdListBundle {...props} {...p}/> } />
            <Route path={`${path}/project_detail/`} render={(p) => <ProjectDetailBundle {...props} {...p}/> } />
            <Route path={`${path}/review/`} render={(p) => <ReviewBundle {...props} {...p}/> } />
            <Route path={`${path}/project_detail_edit/`} render={(p) => <EditBundle {...props} {...p}/> } />
        </Switch>
    )
};


export default App;

