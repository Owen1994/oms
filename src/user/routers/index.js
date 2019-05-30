/**
 *作者: 黄建峰
 */
import Loadable from 'react-loadable';
import LoadingComponent from '@/common/components/loading';

/**
 *作者: 唐勇
 *功能描述:AsyncOrganization1
 *参数说明: 组织架构列表
 *时间: 2018/6/11 09:41
 */
const AsyncOrganizations = Loadable({
    loader: () => import('@/user/organization'),
    loading: LoadingComponent,
});

/**
 *作者: 唐勇
 *功能描述:AsyncRolemanagement
 *参数说明: 角色管理列表页
 *时间: 2018/6/11 09:41
 */
const AsyncRolemanagement = Loadable({
    loader: () => import('@/user/rolemanagement'),
    loading: LoadingComponent,
});


/**
 *作者: 唐勇
 *功能描述:AsyncRolemanagement
 *参数说明: 角色管理列表页
 *时间: 2018/6/11 09:41
 */
const AsyncAddupdaterole = Loadable({
    loader: () => import('@/user/addupdaterole'),
    loading: LoadingComponent,
});


/**
 *作者: 魏洁
 *功能描述:用于编写界面 AsyncAllocUser
 *参数说明:
 */
const AsyncOperatingAuthorization = Loadable({
    loader: () => import('@/user/operatingAuthorization'),
    loading: LoadingComponent,
});

/**
 *作者: 魏洁
 *功能描述:AsyncAllocUser 用户中心分配角色
 *参数说明:
 */
const AsyncAllocUser = Loadable({
    loader: () => import('@/user/allocUser/index'),
    loading: LoadingComponent,
});

/**
 *作者: 唐峰
 *功能描述:AsyncManagementlist
 *参数说明: 用户管理列表页
 *时间: 2018/6/11 09:41
 */
const AsyncManagementlist = Loadable({
    loader: () => import('@/user/usermanagement/usermanagementlist'),
    loading: LoadingComponent,
});

/**
 *作者: 唐峰
 *功能描述:AsyncDatapermissiontempl
 *参数说明:  数据权限模板列表
 *时间: 2018/6/11 09:41
 */
const AsyncDatapermissiontempl = Loadable({
    loader: () => import('@/user/usermanagement/datapermissiontempl'),
    loading: LoadingComponent,
});


/**
 *作者: 唐峰
 *功能描述:AsyncDatapermissiontemplview
 *参数说明:  数据权限模板列表--查看方案
 *时间: 2018/6/11 09:41
 */
const AsyncDatapermissiontemplview = Loadable({
    loader: () => import('@/user/usermanagement/datapermissiontemplview'),
    loading: LoadingComponent,
});


/**
 *作者: 唐峰
 *功能描述:AsyncDatapermissiontempledit
 *参数说明:  数据权限模板列表--新增/编辑方案
 *时间: 2018/6/11 09:41
 */
const AsyncDatapermissiontempledit = Loadable({
    loader: () => import('@/user/usermanagement/datapermissiontempledit'),
    loading: LoadingComponent,
});

/**
 *作者: 唐峰
 *功能描述:AsyncFunctionalpermissionlist
 *参数说明: 操作权限列表(功能权限清单)
 *时间: 2018/6/11 09:41
 */
const AsyncFunctionalpermissionlist = Loadable({
    loader: () => import('@/user/usermanagement/functionalpermissionlist'),
    loading: LoadingComponent,
});


/**
 *作者: 唐峰
 *功能描述:AsyncDatapauthorization
 *参数说明: 操作权限列表(功能权限清单)
 *时间: 2018/6/11 09:41
 */
const AsyncDatapauthorization = Loadable({
    loader: () => import('@/user/usermanagement/datapauthorization'),
    loading: LoadingComponent,
});

// AliExpress授权
const SmtBundle = Loadable({
    loader: () => import('@/user/smt'),
    loading: LoadingComponent,
});

// Wish授权
const WishBundle = Loadable({
    loader: () => import('@/user/wish'),
    loading: LoadingComponent,
});

// ebay授权
const EbayBundle = Loadable({
    loader: () => import('@/user/ebay'),
    loading: LoadingComponent,
});

// joom授权
const JoomBundle = Loadable({
    loader: () => import('@/user/joom'),
    loading: LoadingComponent,
});

// amazon授权
const AmazonBundle = Loadable({
    loader: () => import('@/user/amazon'),
    loading: LoadingComponent,
});

// mymall授权
const MymallBundle = Loadable({
    loader: () => import('@/user/mymall'),
    loading: LoadingComponent,
});

// shopee授权
const ShopeeBundle = Loadable({
    loader: () => import('@/user/shopee'),
    loading: LoadingComponent,
});


const routers = [
    {
        path: '/user/',
        exact: true,
        to: '/user/organization/'
    },
    {
        path: '/user/organization/',
        component: AsyncOrganizations
    },
    {
        path: '/user/usermanagementlist/',
        exact: true,
        component: AsyncManagementlist
    },
    {
        path: '/user/usermanagementlist/functionalpermissionlist/',
        component: AsyncFunctionalpermissionlist
    },
    {
        path: '/user/usermanagementlist/datapauthorization/',
        component: AsyncDatapauthorization
    },
    {
        path: '/user/usermanagementlist/datapermissiontempl/',
        exact: true,
        component: AsyncDatapermissiontempl
    },
    {
        path: '/user/usermanagementlist/datapermissiontempl/viewplan/',    //查看方案
        component: AsyncDatapermissiontemplview
    },
    {
        path: '/user/usermanagementlist/datapermissiontempl/compileplan/',    //新增/编辑方案
        component: AsyncDatapermissiontempledit
    },
    {
        path: '/user/rolemanagement/',
        exact: true,
        component: AsyncRolemanagement
    },
    {
        path: '/user/rolemanagement/operatingAuthorization/', // 角色授权
        component: AsyncOperatingAuthorization
    },
    {
        path: '/user/rolemanagement/allocUser/', // 分配角色
        component: AsyncAllocUser
    },
    {
        path: '/user/rolemanagement/addupdaterole/', // 新增编辑角色
        component: AsyncAddupdaterole
    },
    {
        path: '/user/platformauthorization/smt/',
        component: SmtBundle,
    },
    {
        path: '/user/platformauthorization/wish/',
        component: WishBundle,
    },
    {
        path: '/user/platformauthorization/ebay/',
        component: EbayBundle,
    },
    {
        path: '/user/platformauthorization/joom/',
        component: JoomBundle,
    },
    {
        path: '/user/platformauthorization/amazon/',
        component: AmazonBundle,
    },
    {
        path: '/user/platformauthorization/mymall/',
        component: MymallBundle,
    }
    ,
    {
        path: '/user/platformauthorization/shopee/',
        component:ShopeeBundle,
    }
    
    
];


export default routers;
