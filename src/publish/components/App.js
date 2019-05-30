/**
 * 作者: pzt
 * 描述: Ebay 刊登模块根路由
 * 时间: 2018/7/27 14:46
 **/
import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
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
 * 描述: Ebay刊登 -- 模板管理(描述模板)
 * 时间: 2018/7/27 15:00
 * @param props
 **/
// const Describe = (props) => (
//     <Bundle load={() => import('../ebay_publish/template/components/describe')}>
//         {(DescribeComponent) => <DescribeComponent {...props} />}
//     </Bundle>
// );


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
 * 作者: 陈林
 * 描述:汽配档案管理
 * 时间: 2018/7/30 0030 上午 9:52
 * @param props
 **/
const TemplateBundle = (props) => (
    <Bundle load={() => import('../ebay_publish/template')}>
        {(TemplatematchruleComponent) => <TemplatematchruleComponent {...props} />}
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

const App = (props) =>{
    const path = '/publish/';
    return(
        <Switch>
            <Route exact path={`${path}listing/list/`} render={() => <ListingBundle {...props} /> } />
            <Route exact path={`${path}listing/list/detail/`} render={() => <ListingDetailBundle {...props} /> } />
            <Route exact path={`${path}smt/publicationqueue/`} render={() => <Publicationqueue {...props} /> } />
            <Route exact path={`${path}smt/publicationsetting/`} render={() => <Publicationsetting {...props} /> } />
            <Route exact path={`${path}queue/list/`} render={() => <InventoryPriceQueue {...props} /> } />
            <Route path={`${path}setting/`} render={() => <BasicSetBundle {...props} /> } />            
            <Route path={`${path}batch/`} render={() => <BatchBundle {...props} /> } />            
            <Route path={`${path}autoparts/management/`} render={() => <ManagementBundle {...props} /> } />            
            <Route path={`${path}bulkcopy/record/`} render={() => <BulkcopyrecordBundle {...props} /> } />            
            <Route path={`${path}salespricing/`} render={() => <SalesPricingBundle {...props} /> } />                        
            <Route exact path={`${path}template/describeTemplate/`} render={() => <DscribeTemplate {...props} />} />
            <Route from={`${path}template/`} render={() => <TemplateBundle {...props} />} />
            <Route from={`${path}datahandling/importexport/`} render={() => <ImportexportBundle {...props} />} />

            <Redirect from="/publish/" to={`${path}listing/list/`} />
        </Switch>
    )
}

export default App