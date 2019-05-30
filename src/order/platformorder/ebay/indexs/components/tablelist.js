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
import { downloadUrl } from 'util/baseTool';
import {SUBMIT_EBAY_SYNC, EXPORT_EBAY_ORDER} from '../constants/Api'
import Functions from '@/components/functions';
import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '订单信息',
            key: 'orderinfo',
            align: 'center',
            render: (text, record, index) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                
                return (
                    <div className="ebayorder-tablelist-info">
                        <p><span className="ebayorder-tablelist-span">ebay订单号：</span><span style={{display: 'inline-flex', width: '50%'}}>{record.orderNumber}</span></p>
                        <p><span className="ebayorder-tablelist-span">YKS单号：</span><Link style={{display: 'inline-flex', width: '50%'}} to={url} target="_blank">{record.companyOrdersId}</Link></p>
                        <p><span className="ebayorder-tablelist-span">销售记录号：</span><span style={{display: 'inline-flex', width: '50%'}}>{record.sellRecordNumber}</span></p>
                        <p><span className="ebayorder-tablelist-span">账号：</span><span style={{display: 'inline-flex', width: '50%'}}>{record.account}</span></p>
                        <p><span className="ebayorder-tablelist-span">买家ID：</span><span style={{display: 'inline-flex', width: '50%'}}>{record.buyerId}</span></p>
                    </div>
                )
            }
        },
        {
            title: '商品信息',
            key: 'goodsdetail',
            render: (text, record, index) => {
                const gd = record.goods_detail ? record.goods_detail : [];
                return (
                    <div className="ebayorder-tablelist-goodsdetail">
                        {
                            gd.map((item,i)=>{
                                return (
                                    <Row key={i}>
                                        <Col span={8}><div className="ebayorder-tablelist-orderdetail">{<img src={item.picture} />}</div></Col>
                                        <Col span={16} style={{textAlign: 'left'}}>
                                            <p>
                                                <span className="ebayorder-tablelist-span2">商品名称：</span>
                                                <Tooltip title={item.productName}>
                                                    <span className="ebayorder-tablelist-ellipsis">{item.productName}</span>
                                                </Tooltip>
                                            </p>
                                            <p><span className="ebayorder-tablelist-span2">item ID：</span><span>{item.itemId}</span></p>
                                            <p><span className="ebayorder-tablelist-span2">平台SKU：</span><span>{item.sku}</span></p>
                                            <p style={{color: 'red', paddingLeft: 8}}>{record.currency} {item.price}*{item.quantity}</p>
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
            title: '日期',
            key: 'timeinfo',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span>下单时间：</span><span>{record.orderTime}</span></p>
                        <p><span>付款时间：</span><span>{record.payTime}</span></p>
                        <p><span>抓单时间：</span><span>{record.orderCacheTime}</span></p>
                    </div>
                )
            }
        },
        {
            title: '订单状态',
            dataIndex: 'orderState',
            key: 'orderState',
            align: 'center',
        },
        {
            title: '金额',
            key: 'amount',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span className="ebayorder-tablelist-span2">订单总额：</span><span>{record.currency} {record.totalAmount}</span></p>
                        <p><span className="ebayorder-tablelist-span2">运费：</span><span>{record.currency} {record.translateAmount}</span></p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 100,
            render: (text, record, index) => {
                const pathname = location.pathname;
                const url = `${pathname}detail/?orderNumber=${record.orderNumber}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000004-004">
                                <a onClick={() => this.props.openModal('2', record.orderNumber)}>
                                    标记跟踪号
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000004-005">
                                <a onClick={() => PopConfirm('同步订单', 
                                                            '确定同步订单吗？', 
                                                            ()=>this.synchronizeOrder(record.orderNumber))}>
                                    同步订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <Functions {...this.props} functionkey="001-000001-000004-006">
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
        batchMarkVisible: false,
    }
    synchronizeOrder = (orderNumber) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(SUBMIT_EBAY_SYNC, {data: {orderNumber}}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit(pageNumber, pageData);
                }
            })
    }
    // 订单导出
    handleExport =() => {
        const { filterSearchParams } = this.props;
        const params = filterSearchParams();
        delete params.pageData;
        delete params.pageNumber;
        fetchPost(EXPORT_EBAY_ORDER, {data: params}, 1)
            .then(result => {
                if(result.state === '000001') {
                    location.href = '/order/basicdata/importexportrecords/';
                }
            })
    }
    render() {
        const { data, pageNumber, pageData, handleSubmit, loadingState, openModal } = this.props;
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
        const { batchMarkVisible } = this.state;
        const menu = (
            <Menu>
                {/* <Functions {...this.props} functionkey="001-000001-000004-007"> */}
                    <Menu.Item>
                            <a onClick={() => this.setState({ batchMarkVisible: true })}>批量标记</a>
                    </Menu.Item>
                {/* </Functions> */}
            </Menu>);
        return (
            <div className="ebayorder-tablelist">
                <div className="ebayorder-addBtn">
                    <Dropdown overlay={menu}>
                        <Button style={{ float: 'left' }}>批量操作<Icon type="down" /></Button>
                    </Dropdown>
                    <Functions {...this.props} functionkey="001-000001-000004-002">
                        <Button icon="download" onClick={() => openModal('1')}>订单抓取</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="001-000001-000004-003">
                        <Button icon="upload" onClick={this.handleExport}>订单导出</Button>
                    </Functions>
                </div>
                <div className="ebayorder-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.list}
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
                        onChange={handleSubmit}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit}             // pageSize 变化的回调
                        // size="small"
                    />
                </div>
                <BatchOptionModal
                    title="批量标记"
                    visible={batchMarkVisible}
                    closeModal={() => {
                        this.setState({ batchMarkVisible: false })
                    }}
                    url="/oms/order/manage/motan/service/api/IOrderManageService/ebayBatchMarking"
                    templateUrl={downloadUrl('/download/oms/ebay-batchmark-template.xlsx')}
                    fileSize={2}
                    maxCount={10000}
                />
            </div>
        )
    }
}