/**
 *作者: 黄建峰
 */
import Loadable from 'react-loadable';
import LoadingComponent from '@/common/components/loading';


/**
 *作者: 陈林
 *功能描述: performanceKanban 业绩看板-SKU分析
 *参数说明:
 *时间: 2018/12/11 16:41
 */
const AsyncOrderAnalysis = Loadable({
    loader: () => import('@/order/analysis'),
    loading: LoadingComponent,
});

/**
 *作者: 陈林
 *功能描述: performanceKanban 业绩看板-SKU分析
 *参数说明:
 *时间: 2018/12/11 16:41
 */
const AsyncOrderSkuAnalysis = Loadable({
    loader: () => import('@/order/analysissku'),
    loading: LoadingComponent,
});

/*
 *作者: 陈文春
 *功能描述: 业绩看板 - itemID分析
 *参数说明:
 *时间: 2018/4/27
 */
const AsyncOrderItemIdAnalysis = Loadable({
    loader: () => import('@/order/analysisitemid'),
    loading: LoadingComponent,
});

/*
 *作者: 陈文春
 *功能描述: 业绩看板 - 时效分析
 *参数说明:
 *时间: 2019年5月14日
 */
const AsyncOrderAgingAnalysis = Loadable({
    loader: () => import('@/order/analysisaging'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述: AsyncOrderlist 订单管理-全部订单
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const AsyncOrderlist = Loadable({
    loader: () => import('@/order/orderlist'),
    loading: LoadingComponent,
});


/**
 *作者: 任贸华
 *功能描述: AsyncOrderconsignee
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const AsyncOrderconsignee = Loadable({
    loader: () => import('@/order/orderconsignee'),
    loading: LoadingComponent,
});


/**
 *作者: 任贸华
 *功能描述:Asyncorderdetail 订单管理-订单详情
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncorderdetail = Loadable({
    loader: () => import('@/order/orderdetail'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncexceptionorderlist 订单管理-异常订单
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncexceptionorderlist = Loadable({
    loader: () => import('@/order/exceptionorderlist'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncexceptionorderdetail 订单管理-异常订单详情
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncexceptionorderdetail = Loadable({
    loader: () => import('@/order/exceptionorderdetail'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncwarehouselist 订单配置-指定发货仓
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncwarehouselist = Loadable({
    loader: () => import('@/order/warehouselist'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncchannelsignall  订单配置-渠道标记-新增页
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncchannelsignall = Loadable({
    loader: () => import('@/order/channelsignall'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncconversion 订单配置-抓单转换
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncconversion = Loadable({
    loader: () => import('@/order/conversion'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncdeliveryparcellist
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncdeliveryparcellist = Loadable({
    loader: () => import('@/order/deliveryparcellist'),
    loading: LoadingComponent,
});

/**
 * 作者: pzt
 * 描述: Asyncskureplacementrules  订单配置--指定SKU转换规则
 * 时间: 2018/11/19 11:28
 **/
const Asyncskureplacementrules = Loadable({
    loader: () => import('@/order/skureplacementrules'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncdeliveryparceldetail
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncdeliveryparceldetail = Loadable({
    loader: () => import('@/order/deliveryparceldetail'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:Asyncnegativeprofitauditdetailfail
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncnegativeprofitauditdetailfail = Loadable({
    loader: () => import('@/order/negativeprofitauditdetailfail'),
    loading: LoadingComponent,
});


/**
 *作者: 任贸华
 *功能描述:Asyncnegativeprofitauditlist
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const Asyncnegativeprofitauditlist = Loadable({
    loader: () => import('@/order/negativeprofitauditlist'),
    loading: LoadingComponent,
});

/**
 *作者: 任贸华
 *功能描述:AsyncOrderindex
 *参数说明:
 *时间: 2018/4/2 16:41
 */
const AsyncOrderindex = Loadable({
    loader: () => import('@/order/orderindex'),
    loading: LoadingComponent,
});

/*
 *作者: 黄建峰
 *功能描述: OrderMarkrulesBundle 标记规则
 *参数说明:
 *时间: 2018/4/27
 */
const OrderMarkrulesBundle = Loadable({
    loader: () => import('@/order/markrules'),
    loading: LoadingComponent,
});

/*
 *作者: 黄建峰
 *功能描述: OrderBasicdataBundle 订单管理基础数据
 *参数说明:
 *时间: 2018/4/27
 */
const OrderBasicdataBundle = Loadable({
    loader: () => import('@/order/basicdata'),
    loading: LoadingComponent,
});

/*
 *作者: 黄建峰
 *功能描述: 订单审核规则
 *参数说明:
 *时间: 2018/10/11
 */
const CheckRulesBundle = Loadable({
    loader: () => import('@/order/checkrules'),
    loading: LoadingComponent,
});

/*
 *作者: 陈林
 *功能描述: 平台订单
 *参数说明:
 *时间: 2018/4/27
 */
const PlatformOrderBundle = Loadable({
    loader: () => import('@/order/platformorder'),
    loading: LoadingComponent,
});

/*
 *功能描述: PackageOrderBundle 包裹订单
 */
const PackageOrderBundle = Loadable({
    loader: () => import('@/order/packageorder'),
    loading: LoadingComponent,
});

/*
 *功能描述: OrderConfigBundle 订单配置
 */
const OrderConfigBundle = Loadable({
    loader: () => import('@/order/orderconfig'),
    loading: LoadingComponent,
});

const routers = [
    {
        path: '/order/',
        exact: true,
        component: AsyncOrderindex
    },
    {
        path: '/order/analysis/', //业绩看板-订单分析页面
        exact: true,
        component: AsyncOrderAnalysis
    },
    {
        path: '/order/analysissku/', //业绩看板-SKU分析页面
        exact: true,
        component: AsyncOrderSkuAnalysis
    },
    {
        path: '/order/analysisitemid/', //业绩看板-itemID分析页面
        exact: true,
        component: AsyncOrderItemIdAnalysis
    },
    {
        path: '/order/analysisaging/', //业绩看板-itemID分析页面
        exact: true,
        component: AsyncOrderAgingAnalysis
    },
    {
        path: '/order/orderlist/',
        exact: true,
        component: AsyncOrderlist
    },
    {
        path: '/order/orderlist/orderdetail/',
        component: Asyncorderdetail
    },
    {
        path: '/order/exceptionorderlist/',
        exact: true,
        component: Asyncexceptionorderlist
    },
    {
        path: '/order/exceptionorderlist/exceptionorderdetail/',
        component: Asyncexceptionorderdetail
    },
    {
        path: '/order/warehouselist/',
        component: Asyncwarehouselist
    },
    {
        path: '/order/basicdata/channellist/channelsignall/',
        component: Asyncchannelsignall
    },
    {
        path: '/order/conversion/',
        component: Asyncconversion
    },
    {
        path: '/order/deliveryparcellist/',
        exact: true,
        component: Asyncdeliveryparcellist
    },{
        path: '/order/skureplacementrules/',
        component: Asyncskureplacementrules
    },
    {
        path: '/order/deliveryparcellist/deliveryparceldetail/',
        component: Asyncdeliveryparceldetail
    },
    {
        path: '/order/negativeprofitauditlist/negativeprofitauditdetailfail/',
        component: Asyncnegativeprofitauditdetailfail
    },
    {
        path: '/order/negativeprofitauditlist/',
        exact: true,
        component: Asyncnegativeprofitauditlist
    },
    {
        path: '/order/orderconsignee/',
        component: AsyncOrderconsignee
    },
    {
        path: '/order/markrules/', // 订单标记规则
        component: OrderMarkrulesBundle
    },
    {
        path: '/order/basicdata/', // 基础数据
        component: OrderBasicdataBundle
    },
    {
        path: '/order/platformorder/', // 基础数据
        component: PlatformOrderBundle
    },
    {
        path: '/order/checkrules/', // 订单审核规则
        component: CheckRulesBundle
    },
    {
        path: '/order/packageorder/', // 包裹订单
        component: PackageOrderBundle
    },
    {
        path: '/order/orderconfig/', // 基础数据
        component: OrderConfigBundle
    },
];


export default routers;
