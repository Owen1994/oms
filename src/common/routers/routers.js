/**
 *作者: 任贸华
 *功能描述: 前端路由配置
 *时间: 2018/4/2 16:40
 */
import React from 'react';
import Bundle from '../components/bundle/bundle';

/**
 *作者: 任贸华
 *功能描述:AsyncNoFound  404模块
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const AsyncNoFound = (props) => (
    <Bundle load={() => import('../components/404/404')}>
        {(AsyncNoFound) => <AsyncNoFound {...props} />}
    </Bundle>
)

const AsyncNoAccess  = (props) => (
    <Bundle load={() => import('../components/403/403')}>
        {(AsyncNoAccess) => <AsyncNoAccess {...props} />}
    </Bundle>
)

/**
 *作者: 任贸华
 *功能描述:AsyncPermissionlist
 *参数说明: 个人操作权限功能
 *时间: 2018/4/2 16:41
 */
const AsyncPermissionlist = (props) => (
    <Bundle load={() => import('../../index/permissionlist')}>
        {(AsyncPermissionlist) => <AsyncPermissionlist {...props} />}
    </Bundle>
)

/**
 *作者: 杨波
 *功能描述: 合规模块
 *参数说明:
 *时间: 2018/7/21
 */
const Compliance = (props) => (
    <Bundle load={() => import('../../compliance')}>
        {(Compliance) => <Compliance {...props} />}
    </Bundle>
);

/**
 *作者: 杨波
 *功能描述: 客服管理
 *参数说明:
 *时间: 2018/8/31
 */
const customerBundle = (props) => (
    <Bundle load={() => import('../../customerservice')}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

/**
 *作者: pzt
 *功能描述: Ebay刊登模块
 *参数说明:
 *时间: 2018/7/27
 */
const Publish = (props) => (
    <Bundle load={() => import('../../publish')}>
        {(Publish) => <Publish {...props} />}
    </Bundle>
);

/*
 *作者: 黄建峰
 *功能描述: PmsBundle 采购管理系统
 *参数说明:
 *时间: 2018/10/11
 */
const PmsBundle = (props) => (
    <Bundle load={() => import('../../pms')}>
        {(Pms) => <Pms {...props} />}
    </Bundle>
);

/*
 *功能描述: 基础资料
 *参数说明:
 *时间: 2018/11/24
 */
const BasicdataBundle = (props) => (
    <Bundle load={() => import('../../basicdata')}>
        {(BasicdataComponent) => <BasicdataComponent {...props} />}
    </Bundle>
);

/*
 *作者: 陈文春
 *功能描述: WmsBundle 仓储管理
 *参数说明:
 *时间: 2018/4/27
 */
const WmsBundle = (props) => (
    <Bundle load={() => import('../../wms')}>
        {(WmsComponent) => <WmsComponent {...props} />}
    </Bundle>
);

/**
 *作者: 任贸华
 *功能描述:根据url路径路由模块
 *参数说明:
 *时间: 2018/4/2 16:41
 */
export const routes = [
    {
        path: '/index/personalcenter/permissionlist/',
        component: AsyncPermissionlist
    },
    {
        path: '/compliance/',
        component: Compliance
    },
    {
        path: '/customerservice/',
        component: customerBundle
    },
    {
        path: '/publish/',
        component: Publish
    },
    {
        path: '/pms/', // 采购管理系统
        component: PmsBundle
    },
    {
        path: '/basicdata/', // 基础资料
        component: BasicdataBundle
    },
    {
        path: '/wms/', // 仓储管理
        component: WmsBundle
    },
    {
        path: '/403/', // 无权限提示页面
        component: AsyncNoAccess
    },
    {
        path: '*',
        component: AsyncNoFound
    }
];
