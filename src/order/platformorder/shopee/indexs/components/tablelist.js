import React from 'react'
import {Link} from 'react-router-dom';
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
    Tooltip,
    Switch,
    Menu,
    Dropdown,
    Icon,
    Row,
    Col
} from 'antd'
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from 'util/fetch';
import { SUBMIT_SHOPEE_SYNC } from '../constants/Api'
import Functions from '@/components/functions'

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '订单信息',
            key: 'orderinfo',
            dataIndex: 'orderinfo',
            align: 'center',
            width: 130,
            render: (text, record, index) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                return (
                    <div className="shopee-order-tablelist-info">
                        <p><span className="shopee-order-tablelist-span">平台订单号：</span><span style={{ display: 'inline-flex', width: '50%' }}>{record.platformOrderNumber}</span></p>
                        <p><span className="shopee-order-tablelist-span">YKS单号：</span><Link style={{ display: 'inline-flex', width: '50%' }} to={url} target="_blank">{record.companyOrdersId}</Link></p>
                        <p><span className="shopee-order-tablelist-span">销售账号：</span><span style={{ display: 'inline-flex', width: '50%' }}>{record.account}</span></p>
                        <p><span className="shopee-order-tablelist-span">站点：</span><span style={{ display: 'inline-flex', width: '50%' }}>{record.site}</span></p>
                    </div>
                )
            }
        },
        {
            title: '商品信息',
            key: 'productInfo',
            dataIndex: 'productInfo',
            width: 170,
            render: (text, record, index) => {
                const gd = text ? text : [];
                return (
                    <div className="shopee-order-tablelist-goodsdetail">
                        {
                            gd.map((item, i) => {
                                return (
                                    <Row key={i}>
                                        <Col span={8}><div className="shopee-order-tablelist-orderdetail">{<img src={item.imgUrl} />}</div></Col>
                                        <Col span={16} style={{ textAlign: 'left' }}>
                                            <p>
                                                <span className="shopee-order-tablelist-span2">商品名称：</span>
                                                <Tooltip title={item.productName}>
                                                    <span className="shopee-order-tablelist-ellipsis">{item.productName}</span>
                                                </Tooltip>
                                            </p>
                                            <p><span className="shopee-order-tablelist-span2">item ID：</span><span>{item.itemId}</span></p>
                                            <p><span className="shopee-order-tablelist-span2">平台SKU：</span><span>{item.sku}</span></p>
                                            <p style={{ color: 'red', paddingLeft: 8 }}>{record.currency} {item.price}*{item.quantity}</p>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                )
            }
        },
        {
            title: '发货模式',
            key: 'deliveryPattern',
            dataIndex: 'deliveryPattern',
            width: 50,
            align: 'center'
        },
        {
            title: '平台订单状态',
            dataIndex: 'platformOrderState',
            key: 'platformOrderState',
            align: 'center',
            width: 50,
        },
        {
            title: '金额',
            key: 'orderAmount',
            align: 'center',
            width: 100,
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span className="shopee-order-tablelist-span3">订单总金额：</span><span>{record.currency} {record.orderAmount}</span></p>
                        <p><span className="shopee-order-tablelist-span3">卖家实收金额：</span><span>{record.currency} {record.sellerIncomeAmount}</span></p>
                    </div>
                )
            }
        },

        {
            title: '日期',
            key: 'orderTime',
            align: 'left',
            width: 150,
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span className="shopee-order-tablelist-span3">下单时间：</span><span>{record.orderTime}</span></p>
                        <p><span className="shopee-order-tablelist-span3">抓单时间：</span><span>{record.grapTime}</span></p>
                        <p><span className="shopee-order-tablelist-span3">付款时间：</span><span>{record.payTime}</span></p>
                        <p><span className="shopee-order-tablelist-span3">发货截至日期：</span><span>{record.deliveryDeadline}</span></p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 60,
            render: (text, record, index) => {
                const pathname = location.pathname;
                const url = `${pathname}detail/?orderNumber=${record.platformOrderNumber}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000007-004">
                                <a onClick={() => this.props.openModal('2', record.platformOrderNumber)}>
                                    标记跟踪号
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000007-005">
                                <a onClick={() => PopConfirm('同步订单',
                                    '确定同步订单吗？',
                                    () => this.synchronizeOrder(record.platformOrderNumber))}>
                                    同步订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <Functions {...this.props} functionkey="001-000001-000007-002">
                            <Link target="_blank" to={url} style={{ display: 'inline-block', marginRight: 10 }}>
                                查看
                            </Link>
                        </Functions>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            }
        },
    ];

    state = {
        selectedRowKeys: [],
    }

    synchronizeOrder = (orderNumber) => {
        fetchPost(SUBMIT_SHOPEE_SYNC, { data: { platformOrderNumber: orderNumber } }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.getList();
                }
            })
    }

    getList = (pageNumber, pageData) => {
        const { getList, getParams } = this.props;
        this.setState({
            selectedRowKeys: []
        })
        let params = getParams()
        if (pageNumber) {
            params.pageNumber = pageNumber
            params.pageData = pageData
        }
        getList(params)
    }

    /**
     * 订单导出
     */
    exportOrderList = () => {
        const { getParams } = this.props;
        const params = getParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/exportShopeeOrder', { data: params }, 1)
            .then(res => {
                if(res.state === '000001') {
                    location.href = '/order/basicdata/importexportrecords/';
                }
            })
    }

    render() {
        const { total, list, pageNumber, pageData, loading, openModal } = this.props;
        const rowSelection = {
            columnWidth: 20,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                })
            },
            hideDefaultSelections: true,
        };
        return (
            <div className="shopee-order-tablelist">
                <div className="shopee-order-addBtn">
                    <Functions {...this.props} functionkey="001-000001-000007-003">
                        <Button icon="download" onClick={() => openModal('1')}>订单抓取</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="001-000001-000007-003">
                        <Button icon="upload"  onClick={() => PopConfirm('订单导出',
                                    '确定导出当前搜索条件下所有订单数据吗？',
                                    () => this.exportOrderList())}>订单导出</Button>
                    </Functions>
                </div>
                <div className="shopee-order-table table-fixed">
                    <Spin spinning={loading}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                            rowKey={(record, index) => record.key}
                            rowSelection={rowSelection}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}        // 是否可以快速跳转至某页
                        total={total}                               // 数据总数
                        pageSize={pageData}                         // 每页条数
                        onChange={this.getList}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={this.getList}             // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        )
    }
}