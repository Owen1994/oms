/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--列表组件
 *参数说明:
 *时间: 2018/5/28 9:58
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    Button,
    Table,
    Pagination,
    Spin,
} from 'antd';
import Functions from "@/components/functions";
import {
    timestampFromat,
    datasaddkey,
    functions
} from 'util/baseTool';
import { Link } from 'react-router-dom';
import { levelOptions } from "util/options";
import {fetchPost} from "util/fetch";

export default class Tablelist extends Component {

    columns = [
        {
            title: '序号',
            dataIndex: 'sid',
            width: 50,
            render: (text, record, index) => ++index + (this.props.Paginationmodel.current - 1) * this.props.Paginationmodel.pageSize
        }, {
            title: '单号',
            render: (text, record, index) => {
                let url = `/order/orderlist/orderdetail/?orderId=${record.yksOrderNumber}`
                if (record.isException == 1) {
                    url = `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.yksOrderNumber}`
                }
                return (
                    <div className="order-tablelist-div" style={{minWidth: 170}}>
                        <p><span className="order-tablelist-span1">YKS单号:</span>{
                            functions(this, '001-000002-000001-002') ?
                                <Link to={url}  target="_blank" className={'bcolor order-tablelist-span3'}>{record.yksOrderNumber}</Link>
                                : record.yksOrderNumber
                        }</p>
                        <p><span className="order-tablelist-span1">平台单号:</span><span className="order-tablelist-span3">{record.platformOrderNumber}</span></p>
                    </div>
                )
            }
        }, {
            title: '平台',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 150}}>
                        <p><span>销售平台:</span><span>{record.platformName}</span></p>
                        <p><span>销售账号:</span><span>{record.saleAccount}</span></p>
                        <p><span>买家账号:</span><span>{record.buyerAccount}</span></p>
                        <p><span>国家全称:</span><span>{record.countryName}</span></p>
                    </div>
                );
            }
        }, {
            title: '金额',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div" style={{minWidth: 160}}>
                        <p><span className="order-tablelist-span2">订单总金额:</span>{`${record.currencyName} ${record.orderAmount}`}</p>
                        <p><span className="order-tablelist-span2">卖家实收金额:</span>{`${record.currencyName} ${record.sellerIncomeAmount}`}</p>
                    </div>
                );
            }
        }, {
            title: '时间',
            render: (text, record, index) => {
                return (
                    <div className="order-tablelist-div order-tablelist-div2" style={{minWidth: 140}}>
                        <p><span>抓单时间:</span><span>{timestampFromat(record.grabTime, 2)}</span></p>
                        <p><span>付款时间:</span><span>{timestampFromat(record.paymentTime, 2)}</span></p>
                    </div>
                );
            }
        }, {
            title: '状态',
            render: (text, record, index) => {
                const arr = ['待确认', '待处理', '待分仓', '分仓失败'];
                return (
                    <div className="order-tablelist-div order-tablelist-div2 order-tablelist-div3" style={{minWidth: 120}}>
                        <p><span>订单状态:</span><span className={ arr.includes(record.orderStateName) ? 'colorRed' : ''}>{record.orderStateName}</span></p>
                        <p><span>订单来源:</span><span>{record.orderTypeName}</span></p>
                    </div>
                );
            }
        },
        {
            title: '客服',
            dataIndex: 'customerService',
            width: 60,
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                let url = `/order/orderlist/orderdetail/?orderId=${record.yksOrderNumber}`;
                if (record.isException == 1) {
                    url = `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.yksOrderNumber}`;
                }
                return (
                    <div style={{minWidth: 100}}>
                        {functions(this, '001-000002-000001-002') ? <Link to={url} target="_blank">查看</Link> : null}
                        {Number(record.updateProductFlag) === 1 ? <Link to={`${url}&updateProductFlag=1`} target="_blank" className="margin-ss-left">添加商品</Link> : null}
                    </div>
                )
            },
        }];

    state = {
        export: false
    };

    Paginatihandle = (page, pageSize) => {
        this.props.onSearch(page, pageSize);
        this.props.menudataaction({
            pageCache: {
                ...this.props.menuInfos.pageCache,
                [`${location.pathname}${location.search}`]: newobj
            }
        })
        this.props.tablemodelaction({ selectedRowKeys: [] });
    }

    export = () => {
        const params = this.props.filterSearchParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/exportOrder', params, 2)
            .then(result => {
                if(result.state === '000001'){
                    this.setState({export: true})
                    window.location.href="/order/basicdata/importexportrecords/"
                }
            })
    }

    render() {
        const { data } = this.props.tablemodel;
        const newdata = datasaddkey(data.data)
        const columns = this.columns;
        return (
            <div className="newCluenk  margin-ms-top textRight">
                <div className="margin-ss-right padding-sm-top">
                    <Functions {...this.props} functionkey={'001-000002-000001-003'}>
                        <Button icon="upload" onClick={this.export} disabled={this.state.export}>
                            订单导出
                        </Button>
                    </Functions>
                </div>
                <div className="content">
                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table rowSelection={null} columns={columns} dataSource={newdata} bordered
                               pagination={false} />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle} />

                </div>
            </div>
        );
    }
}
