import React, {Component} from 'react'
import {
    Table,
    Pagination,
    Spin,
} from 'antd'
import '../css/css.css'

import {datasaddkey} from '../../../../util/baseTool';

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }
     
    //表头
    columns = [
        {
            title: '信息编号',
            dataIndex: 'messageNumber',
            width: 90,
            render:(text, record, index) => {
                return (
                    <div className="Indemnified-info1 text-left">
                        <div className="info-span">
                            <span className="span-name pull-left">批准日期：</span>
                            <span className="span-value">{record.approvalDateStr}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">赔偿编号：</span>
                            <span className="span-value">{record.reimbursementId}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">问题编号：</span>
                            <span className="span-value">{record.caseId}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">订单编号：</span>
                            <span className="span-value">{record.amazonOrderId}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '原因',
            dataIndex: 'reason',
            width: 70,
        },
        {
            title: 'Listing信息',
            dataIndex: 'listingInfo',
            width: 80,
            render:(text, record, index) => {
                return (
                    <div className="Indemnified-info2 text-left">
                        <div className="info-span">
                            <span className="span-name pull-left">ASIN：</span>
                            <span className="span-value">{record.asin}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">FNSKU：</span>
                            <span className="span-value">{record.fnsku}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">Seller SKU：</span>
                            <span className="span-value">{record.sellerSku}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name pull-left">销售账号：</span>
                            <span className="span-value">{record.shopAccount}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '标题',
            dataIndex: 'productName',
            width: 60,
        },
        {
            title: '金额信息',
            dataIndex: 'sumInfo',
            width: 80,
            render:(text, record, index) => {
                return (
                    <div className="Indemnified-info3  text-left">
                        <div className="info-span">
                            <span className="span-name">货币单位：</span>
                            <span className="span-value">{record.currencyUnit}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name">每件商品金额：</span>
                            <span className="span-value">{record.amountPerUnit}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name">现金赔偿数量：</span>
                            <span className="span-value">{record.quantityReimbursedCash}</span>
                        </div>
                        <div className="info-span">
                            <span className="span-name">总金额：</span>
                            <span className="span-value">{record.amountTotal}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: '库存赔偿数量',
            dataIndex: 'quantityReimbursedInventory',
            width: 36
        },
        {
            title: '总赔偿数量',
            dataIndex: 'quantityReimbursedTotal',
            width: 35
        }];

    componentWillUnmount() {

    }

    //----自定义方法----

    //分页方法
    currentChange = (current,pageSize)=>{
        this.setState({
         pagenum:Number(current)
        })
        this.Paginatihandle(current,pageSize)
     }
    //分页方法  
    Paginatihandle = (current, pageSize=20) => {
        let {perValue} = this.props.Infos;
        let newobj = {...perValue,pageNumber: current, pageData: pageSize}
        this.props.fetchPosts({
            key: 'data',
            value: newobj
        });
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathspan-name}${location.search}`]:newobj}});
    }
    
    render() {
        const {data} = this.props.tablemodel;
        const newdata = datasaddkey(data.lst || []);
        const columns = this.columns;
        return (
                <div className="newCluenk">
                    <div className="content IndemnifiedTablist">
                        <Spin tip="Loading..." spinning={this.props.tablemodel.loading} delay={100}>
                            <Table 
                            columns={columns} 
                            dataSource={newdata} 
                            bordered 
                            pagination={false} />
                        </Spin>
                        <Pagination
                                showTotal={total => `共 ${total} 条`}  //用于显示数据总量和当前数据顺序
                                pageSizeOptions={['20', '30', '40', '50']} //指定每页可以显示多少条
                                showSizeChanger                         //是否可以改变 pageSize
                                showQuickJumper={{goButton: true}}      //是否可以快速跳转至某页
                                current={this.props.tablemodel.current}    //当前页数
                                onShowSizeChange={this.Paginatihandle}      //pageSize 变化的回调
                                total={this.props.tablemodel.total}    //数据总数
                                pageSize={this.props.tablemodel.pageSize} //每页条数
                                onChange={this.currentChange}              //页码改变的回调，参数是改变后的页码及每页条数
                                    />
                    </div>
                </div>
        );
    }
}

export default Tablelist