import React from 'react'
import {Link} from 'react-router-dom';
import {
    Button,
    Spin,
    Table,
    Pagination,
    Row,
    Col,
    Dropdown,
    Icon,
    Menu,
} from 'antd'
import PopConfirm from '@/common/components/confirm';
import { randNum } from 'util/baseTool';
import Functions from "@/components/functions";

export default class TableList extends React.Component {
    columns = [
        {
            title: '产品信息',
            dataIndex: 'productinfo',
            width: 300,
            render: (text, record) => {
                const productView = record.productInfo ? record.productInfo.map((t, i) => {
                    if (i === 0) {
                        return (
                            <Row key={randNum()}>
                                <Col span={9}>
                                    <img
                                        src={t.image}
                                        width="73px"
                                        height="64px"
                                    />
                                </Col>
                                <Col span={15}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div>
                                            <span>ASIN：</span>
                                            <span>{t.asin}</span>
                                        </div>
                                        <div>
                                            <span>在线SKU：</span>
                                            <span>{t.sellerSku}</span>
                                        </div>
                                        <div>
                                            <span>商品名称：</span>
                                            <span>{t.productName}</span>
                                        </div>
                                        <div className="amazon-table-red-span">
                                            <span>{t.quantity}</span>
                                            <span>*</span>
                                            <span>{t.price}</span>
                                            <span>{record.currency}&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    } else {
                        return (
                            <Row className="margin-ss-top" key={randNum()}>
                                <Col span={9}>
                                    <img
                                        src={t.image}
                                        width="73px"
                                        height="64px"
                                    />
                                </Col>
                                <Col span={15}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div>
                                            <span>ASIN：</span>
                                            <span>{t.asin}</span>
                                        </div>
                                        <div>
                                            <span>在线SKU：</span>
                                            <span>{t.sellerSku}</span>
                                        </div>
                                        <div>
                                            <span>商品名称：</span>
                                            <span>{t.productName}</span>
                                        </div>
                                        <div className="amazon-table-red-span">
                                            <span>{t.quantity}</span>
                                            <span>*</span>
                                            <span>{t.price}</span>
                                            <span>{record.currency}&nbsp;&nbsp;</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                }) : null;
                return productView;
            },
        },
        {
            title: '订单信息',
            dataIndex: 'orderInfo',
            width: 300,
            render: (text, record) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                return (
                <div className="amazon-table-orderinfo-div">
                    <p>
                        <span className="orderinfo-span">销售店铺：</span>
                        <span>{record.sellerAccount}</span>
                    </p>
                    <p>
                        <span className="orderinfo-span">平台单号：</span>
                        <span>{record.platformOrderNumber}</span>
                    </p>
                    <p>
                        <span className="orderinfo-span">YKS单号：</span>
                        <Link to={url} target="_blank">{record.companyOrdersId}</Link>
                    </p>
                    <p>
                        <span className="orderinfo-span">平台状态：</span>
                        <span>{record.platformState}</span>
                    </p>
                    <p>
                        <span className="orderinfo-span">处理状态：</span>
                        <span>{record.dealState}</span>
                    </p>
                    <p>
                        <span className="orderinfo-span">订单类型：</span>
                        <span>{record.fulfillmentChannel}</span>
                    </p>
                    <p>
                        <span className="orderinfo-span">是否标记：</span>
                        <span>{record.ifMarking}</span>
                    </p>
                </div>
            )}
        },
        {
            title: '总金额',
            dataIndex: 'orderMoney',
            // width: 150,
            render: (text, record) => (
                <div>
                    <span>{record.currency}&nbsp;&nbsp;</span>
                    <span>{record.orderMoney}</span>
                </div>
            ),
        },
        {
            title: '折扣金额',
            dataIndex: 'discountMoney',
            // width: 150,
            render: (text, record) => (
                <div>
                    <span>{record.currency}&nbsp;&nbsp;</span>
                    <span>{record.discountMoney}</span>
                </div>
            ),
        },
        {
            title: '时间信息',
            dataIndex: 'timeinfo',
            width: 300,
            render: (text, record) => (
                <div className="amazon-table-timeinfo-div">
                    <p>
                        <span className="timeinfo-span">建单时间：</span>
                        <span>{record.createOrderTime}</span>
                    </p>
                    <p>
                        <span className="timeinfo-span">抓单时间：</span>
                        <span>{record.grapOrderTime}</span>
                    </p>
                    <p>
                        <span className="timeinfo-span">确认可发货时间：</span>
                        <span>{record.confirmDeliveryTime}</span>
                    </p>
                    <p>
                        <span className="timeinfo-span">实际发货时间：</span>
                        <span>{record.realDeliveryTime}</span>
                    </p>
                    <p>
                        <span className="timeinfo-span">标记时间：</span>
                        <span>{record.markOrderTime}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '配送至',
            dataIndex: 'destination',
            width: 80,
        },
        {
            title: '操作',
            dataIndex: 'options',
            width: 120,
            render: (text, record) => {
                const checkUrl = `/order/platformorder/amazon/detail/?orderNumber=${record.platformOrderNumber}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="001-000001-000006-004"
                            >
                                <a onClick={() => this.props.showTagModal(record.platformOrderNumber)}>
                                    标记跟踪号
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="001-000001-000006-005"
                            >
                                <a onClick={() => PopConfirm('同步订单',
                                    '确定同步订单吗？',
                                    () => this.props.sysOrder(record.platformOrderNumber))}>
                                    同步订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <div>
                            <Functions
                                {...this.props}
                                functionkey="001-000001-000006-006"
                            >
                                <a href={checkUrl} target="_blank">查看</a>
                            </Functions>
                            <Dropdown overlay={menu}>
                                <a className="padding-ss-left">
                                    更多
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                )
            },
        },
    ];

    render() {
        const {
            amazonListData,
            amazonListLoadingState,
            pageNumber,
            pageData,
            loadData,
            showGrabModal,
        } = this.props;

        const total = amazonListData.total;
        return (
            <div className="amazon-this-table">
                <div className="top-container">
                    <div className="top-right-wrap">
                        <Functions
                            {...this.props}
                            functionkey="001-000001-000006-003"
                        >
                            <Button icon="download" onClick={() => showGrabModal(true)}>订单抓取</Button>
                        </Functions>
                    </div>
                </div>
                <Spin spinning={amazonListLoadingState.loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={amazonListData.data}
                        pagination={false}
                        size="small"
                        rowKey={record => record.platformOrderNumber}
                        bordered
                    />
                    <Pagination
                        showSizeChanger
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}
                        total={total}
                        pageSize={pageData}
                        onChange={loadData}
                        onShowSizeChange={loadData}
                        defaultCurrent={1}
                        defaultPageSize={20}
                    />
                </Spin>
            </div>
        )
    }
}
