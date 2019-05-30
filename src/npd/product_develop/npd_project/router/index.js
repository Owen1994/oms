/**
 *作者: 黄建峰
 *功能描述:  新品立项根路由
 *时间: 2018/4/17 10:55
 */
import React from "react";
import { Route, Switch } from "react-router-dom";

import Bundle from '../../../../common/components/bundle/bundle'
/**
 *  新品立项列表
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
 *  新建 和 修改  立项
 * @param props
 * @returns {*}
 * @constructor
 */
const CreateBundle = (props) => (
    <Bundle load={() => import('../create/containers')}>
        {(CreateComponent) => <CreateComponent {...props} />}
    </Bundle>
);
/**
 *  立项明细
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
 *  立项明细修改
 * @param props
 * @returns {*}
 * @constructor
 */
// const ProjectDetailEditBundle = (props) => (
//     <Bundle load={() => import('../project_detail_edit')}>
//         {(ProjectDetailEditComponent) => <ProjectDetailEditComponent {...props} />}
//     </Bundle>
// );
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
/**
 *  绑定供应商
 * @param props
 * @returns {*}
 * @constructor
 */
const BindVendorBundle = (props) => (
    <Bundle load={() => import('../bind_vendor/containers')}>
        {(BindVendorComponent) => <BindVendorComponent {...props} />}
    </Bundle>
);
/**
 *  对样
 * @param props
 * @returns {*}
 * @constructor
 */
const CheckSpecimenBundle = (props) => (
    <Bundle load={() => import('../check_specimen/containers')}>
        {(CheckSpecimenComponent) => <CheckSpecimenComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/npd/pd/project';
    return (
        <Switch>
            <Route exact path={`${path}/`} render={(p) => <NpdListBundle {...props} {...p}/> } />
            <Route path={`${path}/create/`} render={(p) => <CreateBundle {...props} {...p}/> } />
            <Route path={`${path}/bindvendor/`} render={(p) => <BindVendorBundle {...props} {...p}/> } />
            <Route path={`${path}/check_specimen/`} render={(p) => <CheckSpecimenBundle {...props} {...p}/> } />
            <Route path={`${path}/project_detail/`} render={(p) => <ProjectDetailBundle {...props} {...p}/> } />
            <Route path={`${path}/review/`} render={(p) => <ReviewBundle {...props} {...p}/> } />
            <Route path={`${path}/project_detail_edit/`} render={(p) => <CreateBundle {...props} {...p}/> } />
        </Switch>
    )
};


export default App;

