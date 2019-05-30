import React from 'react'
import Bundle from '../bundle/bundle';

/**
 *作者: 任贸华
 *功能描述:AsyncNoFound  404模块
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const AsyncNoFound = (props) => (
    <Bundle load={() => import('../404/404')}>
        {(AsyncNoFound) => <AsyncNoFound {...props} />}
    </Bundle>
)

const AsyncNoAccess  = (props) => (
    <Bundle load={() => import('../403/403')}>
        {(AsyncNoAccess) => <AsyncNoAccess {...props} />}
    </Bundle>
)

const routers = [
    {
        path: '/403/', // 无权限提示页面
        component: AsyncNoAccess
    },
    {
        path: '*',
        component: AsyncNoFound
    }
]

export default routers;