import React from 'react'
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
import {Link} from 'react-router-dom';
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from 'util/fetch';
import {ASYNC_ORDER, EXPORT_MYMALL_ORDER} from '../constants/Api'
import Functions from '@/components/functions';

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '订单信息',
            key: 'orderinfo',
            render: (text, record, index) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                return (
                    <div className="mymallorder-tablelist-info">
                        <p><span className="mymallorder-tablelist-span">销售账号：</span><span className="mymallorder-flex">{record.sellerId}</span></p>
                        <p><span className="mymallorder-tablelist-span">交易号：</span><span className="mymallorder-flex">{record.transactionNumber}</span></p>
                        <p><span className="mymallorder-tablelist-span">平台单号：</span><span className="mymallorder-flex">{record.platformOrderNumber}</span></p>
                        <p><span className="mymallorder-tablelist-span">YKS单号：</span><Link className="mymallorder-flex" to={url} target="_blank">{record.companyOrdersId}</Link></p>
                        <p><span className="mymallorder-tablelist-span">平台状态：</span><span className="mymallorder-flex">{record.platformState}</span></p>
                        <p><span className="mymallorder-tablelist-span">订单类型：</span><span className="mymallorder-flex">{record.orderType}</span></p>
                    </div>
                )
            }
        },
        {
            title: '产品信息',
            key: 'productinfo',
            render: (text, record, index) => {
                const productInfo = record.productInfo ? record.productInfo : [];
                return (
                    <div>
                        <Row>
                            <Col span={8}><div className="mymallorder-tablelist-orderdetail">{<img src={productInfo.img} />}</div></Col>
                            <Col span={16} style={{textAlign: 'left'}}>
                                <p>
                                    <span className="mymallorder-tablelist-span2">商品名称：</span>
                                    <Tooltip title={productInfo.productName}>
                                        <span className="mymallorder-tablelist-ellipsis">{productInfo.productName}</span>
                                    </Tooltip>
                                </p>
                                <p>
                                    <span className="mymallorder-tablelist-span2">在线SKU：</span>
                                    <Tooltip title={productInfo.sku}>
                                        <span className="mymallorder-tablelist-ellipsis">{productInfo.sku}</span>
                                    </Tooltip>
                                </p>
                                <p><span className="mymallorder-tablelist-span2">颜色：</span><span className="mymallorder-flex">{productInfo.color}</span></p>
                                <p><span className="mymallorder-tablelist-span2">尺寸：</span><span className="mymallorder-flex">{productInfo.size}</span></p>
                                <p style={{color: 'red', paddingLeft: 8}}>{record.currency} {productInfo.price}*{productInfo.quantity}</p>
                            </Col>
                        </Row>
                    </div>
                )
            }
        },
        {
            title: '金额（USD）',
            key: 'amount',
            width: 150,
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span className="mymallorder-tablelist-span">订单总金额：</span><span>{record.orderAmount}</span></p>
                        <p><span className="mymallorder-tablelist-span">运费：</span><span>{record.freight}</span></p>
                        <p><span className="mymallorder-tablelist-span">佣金：</span><span>{record.commission}</span></p>
                    </div>
                )
            }
        },
        {
            title: '日期',
            key: 'timeinfo',
            width: 240,
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span className="mymallorder-tablelist-span3">下单时间：</span><span>{record.orderTime}</span></p>
                        <p><span className="mymallorder-tablelist-span3">抓单时间：</span><span>{record.grapTime}</span></p>
                        <p><span className="mymallorder-tablelist-span3">实际发货时间：</span><span>{record.realDeliverTime}</span></p>
                        <p><span className="mymallorder-tablelist-span3">标记时间：</span><span>{record.markTime}</span></p>
                        <p><span className="mymallorder-tablelist-span3">到期时间：</span><span>{record.expireTime}</span></p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            key: 'options',
            width: 100,
            align: 'center',
            render: (text, record, index) => {
                const pathname = location.pathname;
                const url = `${pathname}detail/?platformOrderNumber=${record.platformOrderNumber}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000008-004">
                                <a onClick={() => this.props.openModal('2', record.platformOrderNumber)}>
                                    标记跟踪号
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000008-005">
                                <a onClick={() => PopConfirm('同步订单', 
                                                            '确定同步订单吗？', 
                                                            ()=>this.synchronizeOrder(record.platformOrderNumber))}>
                                    同步订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <Functions {...this.props} functionkey="001-000001-000008-002">
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
    // 同步订单
    synchronizeOrder = (orderId) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(ASYNC_ORDER, {data: {orderId}}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch(pageNumber, pageData);
                }
            })
    }
    // 订单导出
    handleExport =() => {
        const { filterSearchParams } = this.props;
        const params = filterSearchParams();
        delete params.pageNumber;
        delete params.pageData;
        fetchPost(EXPORT_MYMALL_ORDER, {data: params}, 1)
            .then(result => {
                if(result.state === '000001') {
                    location.href = '/order/basicdata/importexportrecords/';
                }
            })
    }
    render() {
        const { data, pageNumber, pageData, onSearch, loadingState, openModal } = this.props;
        const total = data.total;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                })
            },
            hideDefaultSelections: true,
        };
        return (
            <div className="mymallorder-tablelist">
                <div className="mymallorder-addBtn">
                    <Functions {...this.props} functionkey="001-000001-000008-003">
                            <Button icon="download" onClick={() => openModal('1')}>订单抓取</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="001-000001-000008-006">
                        <Button icon="upload" onClick={this.handleExport}>订单导出</Button>
                    </Functions>
                </div>
                <div className="mymallorder-table">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
                            pagination={false}
                            // rowKey={(record, index) => record.sellerId}
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
                        onChange={onSearch}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={onSearch}             // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        )
    }
}