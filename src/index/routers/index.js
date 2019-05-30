/**
 *作者: 黄建峰
 */
import Loadable from 'react-loadable';
import LoadingComponent from '@/common/components/loading';

/**
 *  工作台
 * @param props
 * @returns {*}
 * @constructor
 */
const ConsoleBundle = Loadable({
    loader: () => import('../console'),
    loading: LoadingComponent,
});

/**
 *  我的权限
 * @param props
 * @returns {*}
 * @constructor
 */
const PermissionlistBundle = Loadable({
    loader: () => import('../personalcenter'),
    loading: LoadingComponent,
});


const routers = [
    {
        path: '/index/console/',
        component: ConsoleBundle,
    },
    {
        path: '/index/personalcenter/permissionlist/',
        component: PermissionlistBundle,
    },
    {
        path: '/index/',
        exact: true,
        to: '/index/console/'
    },
];


export default routers;
