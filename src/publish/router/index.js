/**
 * 作者: pzt
 * 描述: Ebay 刊登模块根路由
 * 时间: 2018/7/27 14:46
 **/
import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Bundle from '../../common/components/bundle/bundle'

/**
 * 作者: pzt
 * 描述: Ebay刊登 -- listing 列表
 * 时间: 2018/7/27 15:00
 * @param props
 **/
const ListingBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/listing')}>
        {(ListingComponent) => <ListingComponent {...props} />}
    </Bundle>
);

/**
 * 作者: pzt
 * 描述: Ebay刊登 -- listing 详情页
 * 时间: 2018/7/31 19:28
 * @param props
 **/
const ListingDetailBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/listingdetail')}>
        {(ListingDetailComponent) => <ListingDetailComponent {...props} />}
    </Bundle>
);

/**
 * 作者: pzt
 * 描述: Ebay刊登 -- 模板管理(新增/编辑 描述模板)
 * 时间: 2018/7/27 15:00
 * @param props
 **/
const DscribeTemplate = (props) => (
    <Bundle load={() => import('../ebay_publish/templateDescribe')}>
        {(DescribeComponent) => <DescribeComponent {...props} />}
    </Bundle>
);


/**
 * 作者: 陈林
 * 描述: Ebay刊登 -- 模板管理(运输模板)
 * 时间: 2018/7/31 0031 下午 3:03
 * @param props
 **/
// const Transport = (props) => (
//     <Bundle load={() => import('../ebay_publish/template/transport')}>
//         {(TransportComponent) => <TransportComponent {...props} />}
//     </Bundle>
// );

/**
 * 作者: 陈林
 * 描述: Ebay刊登 -- 模板管理(退货模板)
 * 时间: 2018/7/31 0031 下午 3:03
 * @param props
 **/
// const Return = (props) => (
//     <Bundle load={() => import('../ebay_publish/template/return')}>
//         {(ReturnComponent) => <ReturnComponent {...props} />}
//     </Bundle>
// );

/**
 * 作者: 陈林
 * 描述: Ebay刊登 -- 模板管理(付款模板)
 * 时间: 2018/7/31 0031 下午 3:03
 * @param props
 **/
// const Payment = (props) => (
//     <Bundle load={() => import('../ebay_publish/template/payment')}>
//         {(ReturnComponent) => <ReturnComponent {...props} />}
//     </Bundle>
// );

/**
 * 作者: 陈林
 * 描述:库存价格队列
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const InventoryPriceQueue = (props) => (
    <Bundle load={() => import('../ebay_publish/queue')}>
        {(InventoryPriceQueueComponent) => <InventoryPriceQueueComponent {...props} />}
    </Bundle>
);


// const GalleryBundle = (props) => (
//     <Bundle load={() => import('../basic_set/gallery')}>
//         {(GalleryComponent) => <GalleryComponent {...props} />}
//     </Bundle>
// );

/**
 *
 * 基础设置
 */
const BasicSetBundle = (props) => (
    <Bundle load={() => import('../basic_set')}>
        {(BasicSetComponent) => <BasicSetComponent {...props} />}
    </Bundle>
)

/**
 *
 * 批量刊登
 */
const BatchBundle = (props) => (
    <Bundle load={() => import('../batch')}>
        {(BatchComponent) => <BatchComponent {...props} />}
    </Bundle>
)

/**
 *作者: 唐勇
 *功能描述: 速卖通刊登队列
 *参数说明:
 *时间: 2018/8/2
 */
const Publicationqueue = (props) => (
    <Bundle load={() => import('../../publish/smt/publicationqueue/')}>
        {(Publicationqueue) => <Publicationqueue {...props} />}
    </Bundle>
);
/**
 *作者: 唐勇
 *功能描述: 速卖通刊登设置
 *参数说明:
 *时间: 2018/8/2
 */
const Publicationsetting = (props) => (
    <Bundle load={() => import('../../publish/smt/publicationsetting/')}>
        {(Publicationsetting) => <Publicationsetting {...props} />}
    </Bundle>
);

/**
 * 作者: 陈林
 * 描述:汽配档案管理
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const ManagementBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/management')}>
        {(ManagementComponent) => <ManagementComponent {...props} />}
    </Bundle>
);

/**
 * 作者: 陈林
 * 描述:汽配档案管理
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const BulkcopyrecordBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/bulkcopyrecord')}>
        {(BulkcopyrecordComponent) => <BulkcopyrecordComponent {...props} />}
    </Bundle>
);

/**
 * 作者: pzt
 * 描述: 描述模板
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const TemplateBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/template')}>
        {(TemplatematchruleComponent) => <TemplatematchruleComponent {...props} />}
    </Bundle>
);


/**
 * 作者: huangjianfeng
 * 描述:销售定价
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const SalesPricingBundle = (props) => (
    <Bundle load={() => import('../salespricing')}>
        {(SalesPricingComponent) => <SalesPricingComponent {...props} />}
    </Bundle>
);


/**
 * 作者: weijie
 * 描述: 数据处理->导入导出
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const ImportexportBundle = (props) => (
    <Bundle load={() => import('../datahandling/importexport/index')}>
        {(ImportexportComponent) => <ImportexportComponent {...props} />}
    </Bundle>
);

/**
 * 作者: weijie
 * 描述: 数据处理->listing侵权检测
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const ChecktortBundle = (props) => (
    <Bundle load={() => import('../datahandling/checktort')}>
        {(ChecktortComponent) => <ChecktortComponent {...props} />}
    </Bundle>
);

/**
 * 作者: 郑学宁
 * 描述: 数据处理->listing侵权检测
 * 时间: 2019年04月22日09:20:48
 * @param props
 **/
const SkucoverBundle = (props) => (
    <Bundle load={() => import('../datahandling/skucover/index')}>
        {(SkucoverComponent) => <SkucoverComponent {...props} />}
    </Bundle>
);


/**
 * 作者: weijie
 * 描述: 亚马逊刊登->列表
 * @param props
 **/

const AmazonListingBundle = (props) => (
    <Bundle load={() => import('../amazon_publish/listing')}>
        {(ListingComponent) => <ListingComponent {...props} />}
    </Bundle>
);

/**
 * 作者: weijie
 * 描述: 亚马逊刊登->详情
 * @param props
 **/

const AmazonListingdetailBundle = (props) => (
    <Bundle load={() => import('../amazon_publish/listingdetail')}>
        {(ListingdetailComponent) => <ListingdetailComponent {...props} />}
    </Bundle>
);

/**
 * 作者: weijie
 * 描述: 跟卖监控
 * @param props
 **/

const FollowSellingBundle = (props) => (
    <Bundle load={() => import('../amazon_publish/followSelling')}>
        {(FollowSellingComponent) => <FollowSellingComponent {...props} />}
    </Bundle>
);

/**
 * 作者: weijie
 * 描述: 模板匹配规则
 * @param props
 **/

const TemplatematchruleBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/template')}>
        {(TemplatematchruleBundle) => <TemplatematchruleBundle {...props} />}
    </Bundle>
);

/**
 * 作者: weijie
 * 描述: 亚马逊刊登->侵权检测
 * @param props
 **/

// const AmazonListingBundle = (props) => (
//     <Bundle load={() => import('../amazon_publish/followSelling')}>
//         {(ListingComponent) => <ListingComponent {...props} />}
//     </Bundle>
// );

const App = (props) => {
    return (
        <Switch>
            <Route exact path={`${path}listing/list/`} render={() => <ListingBundle {...props} />} />
            <Route exact path={`${path}listing/list/detail/`} render={() => <ListingDetailBundle {...props} />} />
            <Route exact path={`${path}smt/publicationqueue/`} render={() => <Publicationqueue {...props} />} />
            <Route exact path={`${path}smt/publicationsetting/`} render={() => <Publicationsetting {...props} />} />
            <Route exact path={`${path}queue/list/`} render={() => <InventoryPriceQueue {...props} />} />
            <Route path={`${path}setting/`} render={() => <BasicSetBundle {...props} />} />
            <Route path={`${path}batch/`} render={() => <BatchBundle {...props} />} />
            <Route path={`${path}autoparts/management/`} render={() => <ManagementBundle {...props} />} />
            <Route path={`${path}bulkcopy/record/`} render={() => <BulkcopyrecordBundle {...props} />} />
            <Route path={`${path}salespricing/`} render={() => <SalesPricingBundle {...props} />} />
            <Route exact path={`${path}template/`} render={() => <TemplateBundle {...props} />} />
            <Route exact path={`${path}template/describeTemplate/`} render={() => <DscribeTemplate {...props} />} />

            <Route from={`${path}datahandling/importexport/`} render={() => <ImportexportBundle {...props} />} />
            <Route from={`${path}datahandling/checktort/`} render={() => <ChecktortBundle {...props} />} />
            <Route from={`${path}datahandling/skucover/`} render={() => <SkucoverBundle {...props} />} />

            <Route exact path={`${path}amazonlisting/list/`} render={() => <AmazonListingBundle {...props} />} />
            <Route exact path={`${path}amazonlisting/list/detail/`} render={() => <AmazonListingdetailBundle {...props} />} />
            <Route exact path={`${path}followselling/`} render={() => <FollowSellingBundle {...props} />} />
            <Redirect from="/publish/" to={`${path}listing/list/`} />
        </Switch>
    )
}



const path = '/publish/';

export default [
    {
        path: `${path}listing/list/`,
        exact: true,
        component: ListingBundle
    }, {
        path: `${path}listing/list/detail/`,
        exact: true,
        component: ListingDetailBundle
    }, {
        path: `${path}smt/publicationqueue/`,
        exact: true,
        component: Publicationqueue
    }, {
        path: `${path}smt/publicationsetting/`,
        exact: true,
        component: Publicationsetting
    }, {
        path: `${path}queue/list/`,
        exact: true,
        component: InventoryPriceQueue
    }, {
        path: `${path}setting/`,
        exact: false,
        component: BasicSetBundle
    }, {
        path: `${path}batch/`,
        exact: false,
        component: BatchBundle
    }, {
        path: `${path}autoparts/management/`,
        exact: false,
        component: ManagementBundle
    }, {
        path: `${path}bulkcopy/record/`,
        exact: false,
        component: BulkcopyrecordBundle
    }, {
        path: `${path}template/matchrule/`,
        exact: false,
        component: TemplatematchruleBundle
    }, {
        path: `${path}salespricing/`,
        exact: false,
        component: SalesPricingBundle
    }, {
        path: `${path}template/`,
        exact: true,
        component: TemplateBundle
    }, {
        path: `${path}template/describeTemplate/`,
        exact: true,
        component: DscribeTemplate
    }, {
        path: `${path}datahandling/importexport/`,
        exact: false,
        component: ImportexportBundle
    }, {
        path: `${path}datahandling/checktort/`,
        exact: false,
        component: ChecktortBundle
    },{
        path: `${path}datahandling/skucover/`,
        exact: false,
        component: SkucoverBundle
    }, {
        path: `${path}amazonlisting/list/`,
        exact: true,
        component: AmazonListingBundle
    }, {
        path: `${path}amazonlisting/list/detail/`,
        exact: true,
        component: AmazonListingdetailBundle
    }, {
        path: `${path}followselling/`,
        exact: true,
        component: FollowSellingBundle
    }, {
        to: `${path}listing/list/`,
    }
]
