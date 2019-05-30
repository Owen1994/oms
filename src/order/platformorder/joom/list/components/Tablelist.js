/**
 * 作者: pzt
 * 描述: 速卖通列表页表格组件
 * 时间: 2018/4/18 18:26
 **/
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {
    Button,
    Row,
    Col,
    Table,
    Pagination,
    Spin,
    Icon,
    Menu,
    Modal,
    Dropdown,
    Tooltip,
    message,
    Tag,
} from 'antd'

import '../css/css.css'
import OrderModal from './Ordergrab'
import TagTrackingNumber from './TagTrackingNumber'
import {
    timestampFromat,
    downloadUrl
} from '@/util/baseTool';
import Functions from '@/components/functions';
import img from '../css/img/default.png'
import { orderStatus, orderStatus1 } from '../constants/index';
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from 'util/fetch';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';

const confirm = Modal.confirm;
class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
    }
    state = {
        modalVisible: false,
        numberVisible: false,
        markVisible: false, //批量标记
        orderId: null,
        productId: null
    }
    rowSelection = {
        columnWidth: 30,
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.setState({})
        }
    };

    columns = [
        {
            title: '订单信息',
            dataIndex: 'orderInfo',
            key: 'orderInfo',
            width: 130,
            render: (text, record, index) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                return (
                    <div className="text-left joom-table-p"  >
                        <p className="breakwrod pl6"><span className="w6">平台订单号：</span><span>{record.orderId}</span></p>
                        <p className="breakwrod pl6"><span className="w6 display-inline-block" >YKS单号：</span><Link className="mymallorder-flex" to={url} target="_blank">{record.companyOrdersId}</Link></p>
                        <p className="breakwrod pl6"><span className="w6 display-inline-block" >交易号：</span>{record.transactionId}</p>
                        <p className="breakwrod pl6"><span className="w6 display-inline-block" >店铺账号：</span>{record.sellerId}</p>
                        <p className="breakwrod pl6"><span className="w6 display-inline-block" >买家ID：</span>{record.buyerId}</p>
                        <p className="breakwrod pl6"><span className="w6 display-inline-block" >国家：</span>{record.buyerCountry}</p>
                    </div>
                )
            }
        },
        {
            title: '商品信息',
            dataIndex: 'productName',
            key: 'productName',
            width: 200,
            render: (text, record, index) => {
                return (
                    <Row>
                        <Col span={6}>
                            <img width={65} src={record.productImageUrl ? record.productImageUrl : img} alt="" />
                        </Col>
                        <Col className="text-left joom-table-p" span={18}>
                            <p className="one-ellipsis pl5"><span className="w5">商品名称：</span>
                                <Tooltip placement="topLeft" title={record.productName}>
                                    <span>{record.productName}</span>
                                </Tooltip>
                            </p>
                            <p className="breakwrod pl5"><span className="w5">item ID：</span>{record.productId}</p>
                            <p className="breakwrod pl5"><span className="w5">平台SKU：</span>{record.joomSku}</p>
                            <p className="breakwrod pl5 red"><span className="w5">USD：</span><span>{record.price} * {record.quantity}</span></p>
                        </Col>
                    </Row>
                )
            }
        },
        {
            title: '日期',
            dataIndex: 'orderPayTime',
            key: 'orderPayTime',
            width: 110,
            render: (text, record, index) => {
                return (
                    <div className="text-left joom-table-p">
                        <p className="pl7"><span className="w7">付款时间：</span>{record.orderPayTime ? timestampFromat(Number(record.orderPayTime), 2) : "--"}</p>
                        <p className="pl7"><span className="w7">抓单时间：</span>{record.createdTime ? timestampFromat(Number(record.createdTime), 2) : "--"}</p>
                        {
                            record.shippedDate ?
                                <p className="pl7"><span className="w7">发货时间：</span>{timestampFromat(Number(record.shippedDate), 2)}</p>
                                : null
                        }
                        <p className="pl7"><span className="w7">发货截止日期：</span>{record.shipDeadline ? timestampFromat(Number(record.shipDeadline), 2) : "--"}</p>
                    </div>
                )
            }
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 50,
            render: (t) => {
                let data = orderStatus1.find(v => v.id == t);
                return data ? data.name : '--'
            }
        },
        {
            title: '金额',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div className="text-left">
                        <p><span>订单总额：</span>USD {record.orderTotal}</p>
                        <p><span className="display-inline-block" style={{ textIndent: "2em" }}>运费：</span>USD {record.shippingCost}</p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            key: 'Operation',
            width: 80,
            render: (text, record, index) => {
                const pathname = location.pathname
                const url = `${pathname}detail/?id=${record.id}`;
                const menu = (
                    <Menu>
                        {
                            <Menu.Item>
                                <Functions {...this.props} functionkey="001-000001-000005-004">
                                    <a onClick={() => {
                                        this.setState({
                                            numberVisible: true,
                                            orderId: record.orderId,
                                            // productId: record.productId
                                        })
                                    }}>标记跟踪号</a>
                                </Functions>
                            </Menu.Item>
                        }
                        {
                            <Menu.Item>
                                <Functions {...this.props} functionkey="001-000001-000005-005">
                                    <a href="javascript:;" onClick={() => confirm({
                                        title: '同步订单',
                                        content: '确认同步订单',
                                        centered: true,
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk: () => this.syncJoomOrder(record.orderId)
                                    })}>同步订单</a>
                                </Functions>
                            </Menu.Item>
                        }

                    </Menu>);
                return (

                    <div className="actions-btns">
                        <Functions {...this.props} functionkey="001-000001-000005-006">
                            <a target="_blank" href={url}>查看</a>
                            {/* <span className="margin-ss-left margin-ss-right v-line">|</span> */}
                        </Functions>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link margin-ss-left">
                                更多 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            },
        }];

    componentDidMount() {
    }

    syncJoomOrder = (key) => {
        this.props.getSyncJoomOrder({ data: { orderId: key } })
            .then(result => {
                if(result && result.state === "000001"){
                    message.success(result.msg)
                    this.Paginatihandle()
                }
            })
            .catch(err => {

            })
    }
    Paginatihandle = (page, pageSize) => {
        const { getParams, getList } = this.props;
        const value = getParams();
        if (page) {
            value.pageData = pageSize
            value.pageNumber = page
        }
        getList(value)
    }
    tagOnClick = (id) => {
        const { getParams, getList } = this.props;
        const data = getParams();
        data.pageNumber = 1;
        data.tab = id;
        getList(data)
    }

    /**
     * 订单导出
     */
    exportOrderList = () => {
        const { getParams } = this.props;
        const params = getParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/joomExportOrder', { data: params }, 1)
            .then(res => {
                if(res.state === '000001') {
                    location.href = '/order/basicdata/importexportrecords/';
                }
            })
    }

    render() {
        const { modalVisible, numberVisible, markVisible, orderId, productId } = this.state;
        const { columns } = this;
        const { tablemodel } = this.props
        const {
            list,
            total,
            params,
            loading
        } = tablemodel;
        const { quickdstateModel } = this.props;
        let data = quickdstateModel.map((v, i) => {
            return <Tag onClick={() => this.tagOnClick(v.id)} key={i} className={(v.id == params.tab) ? 'active' : ''}>
                <span>{v.name}({v.num})</span>
            </Tag>
        });
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="001-000001-000005-002">
                        <a onClick={() => this.setState({ markVisible: true })}>批量标记</a>
                    </Functions>
                </Menu.Item>
            </Menu>);
        return (
            <div>
                <div className="newCluenk margin-sm-top">
                    <Row className={"cut-off-line"}>
                        <Col span={24}>
                            <div className={"quiteState"}>
                                {data}
                            </div>
                        </Col>
                    </Row>
                    <div style={{padding: 10}}>
                        <div className="joom-optionbtn-div">
                            <Dropdown overlay={menu}>
                                <Button style={{ float: 'left' }}>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                            <Functions {...this.props} functionkey="001-000001-000005-003">
                                <Button
                                    icon="download"
                                    onClick={() => this.setState({ modalVisible: true })}
                                    style={{ marginLeft: 15}}
                                >
                                    订单抓取
                                </Button>
                            </Functions>
                            <Functions {...this.props} functionkey="001-000001-000005-007">
                                <Button icon="upload" className="margin-sm-left" onClick={() => PopConfirm('订单导出',
                                            '确定导出当前搜索条件下所有订单数据吗？',
                                            () => this.exportOrderList())}>订单导出</Button>
                            </Functions>
                        </div>
                        <div className="content table-fixed">
                            <Spin spinning={loading} delay={500} tip="Loading...">
                                <Table
                                    rowSelection={this.rowSelection}
                                    columns={columns}
                                    dataSource={list}
                                    pagination={false}
                                    className="table-fixed"
                                    bordered={true}
                                />
                            </Spin>
                            <Pagination
                                showTotal={total => `共 ${total} 条`}
                                pageSizeOptions={['20', '30', '40', '50']}
                                showSizeChanger
                                showQuickJumper={{ goButton: true }}
                                current={params.pageNumber}
                                defaultCurrent={1}
                                onShowSizeChange={this.Paginatihandle}
                                total={total}
                                pageSize={params.pageData}
                                onChange={this.Paginatihandle} />
                        </div>
                    </div>
                    <OrderModal
                        visible={modalVisible}
                        closeModal={() => this.setState({ modalVisible: false })}
                    />
                    <TagTrackingNumber
                        visible={numberVisible}
                        orderId={orderId}
                        // productId={productId}
                        closeModal={() => this.setState({ numberVisible: false, orderId: null, })}
                    />
                    <BatchOptionModal
                        title="批量标记"
                        visible={markVisible}
                        closeModal={() => {
                            this.setState({ markVisible: false })
                        }}
                        url="/oms/order/manage/motan/service/api/IOrderManageService/batchMarkJoomOrder0"
                        templateUrl={downloadUrl('/download/oms/joom-mark-template.xlsx')}
                        fileSize={2}
                        maxCount={10000}
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist
