import React from 'react';
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
} from 'antd';
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from 'util/fetch';
import * as API from '../constants/api';
import Functions from '@/components/functions';
// import { downloadUrl } from 'util/baseTool';
// import BatchOptionModal from '@/components/BatchOptionModal/BatchOptionModal.js';

export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        batchMarkVisible: false,
    }
    columns = [
        {
            title: '产品信息',
            // dataIndex: 'sellerId',
            // align: 'left',
            key: 'productinfo',
            render: (text, record, index) => {
                const url = record.isException ?
                `/order/exceptionorderlist/exceptionorderdetail/?orderId=${record.companyOrdersId}`
                : `/order/orderlist/orderdetail/?orderId=${record.companyOrdersId}`;
                return (
                    <div className="wishorder-tablelist-info">
                        <p><span className="wishorder-tablelist-span">销售账号：</span><span>{record.sellerId}</span></p>
                        <p><span className="wishorder-tablelist-span">平台单号：</span><span>{record.orderId}</span></p>
                        <p><span className="wishorder-tablelist-span">YKS单号：</span><Link to={url} target="_blank">{record.companyOrdersId}</Link></p>
                        <p><span className="wishorder-tablelist-span">交易号：</span><span>{record.transactionId}</span></p>
                        <p><span className="wishorder-tablelist-span">平台状态：</span><span className="wishorder-span-bg">{record.platformOrderState}</span></p>
                    </div>
                )
            }
        },
        {
            title: '订单明细',
            // dataIndex: 'isEnabled',
            // align: 'center',
            key: 'orderdetail',
            render: (text, record, index) => {
                return (
                    <div style={{ maxWidth: 260, margin: '0 auto' }}>
                        <Row>
                            <Col span={8}><div className="wishorder-tablelist-orderdetail">{<img src={record.skuPicture} />}</div></Col>
                            <Col span={16}>
                                <div style={{ textAlign: 'left' }}>
                                    <p>{record.productId}</p>
                                    <p>({record.sellerSku})</p>
                                    {record.color ? <p>color: {record.color}</p> : null}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} style={{textAlign: 'left'}}><span>数量：*{record.quantity}</span></Col>
                            <Col span={10}><span>销售：{record.price}</span></Col>
                            <Col span={8}><span>客付运费：{record.shipping}</span></Col>
                        </Row>
                        <Row>
                            <Col span={10} style={{textAlign: 'left'}}><div className="wishorder-span-bg">{record.requiresDeliveryConfirmation}</div></Col>
                            {
                                record.daysToFulfill ?
                                    <Col span={14}>
                                        <div style={{textAlign: 'right'}}>剩余天数：<span className="wishorder-span-bg">{record.daysToFulfill}天</span></div>
                                    </Col>
                                    : null
                            }
                        </Row>
                    </div>
                )
            }
        },
        {
            title: '总金额 USD',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            align: 'center',
        },
        {
            title: '折扣金额 USD',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
            align: 'center',
        },
        {
            title: '时间信息',
            key: 'timeinfo',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        <p><span>付款时间：</span><span>{record.paymentTime}</span></p>
                        <p><span>抓单时间：</span><span>{record.grabTime}</span></p>
                    </div>
                )
            }
        },
        {
            title: '配送至',
            dataIndex: 'buyerCountryName',
            key: 'buyerCountryName',
            align: 'center',
        },
        {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 100,
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000003-005">
                                <a onClick={() => this.props.openModal('2', record.orderId)}>
                                    标记跟踪号
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="001-000001-000003-006">
                                <a onClick={() => PopConfirm('同步订单',
                                                            '确定同步订单吗？',
                                                            ()=>this.synchronizeOrder(record.orderId))}>
                                    同步订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <Functions {...this.props} functionkey="001-000001-000003-001">
                        <a  onClick={()=>this.props.openModal('3', record.orderId)}
                            style={{ display: 'inline-block', marginRight: 10 }}>
                            查看
                            </a>
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
    synchronizeOrder = (orderId) => {
        fetchPost(API.SUBMIT_WISH_SYNC, {orderId}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    }
    render() {
        const { data, pageNumber, pageData, handleSubmit, loadingState, openModal } = this.props;
        const { batchMarkVisible, selectedRowKeys } = this.state;
        const total = data.total;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                })
            },
            hideDefaultSelections: true,
        };
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <Functions {...this.props} functionkey="001-000001-000003-002">
        //                 <a onClick={() => this.setState({ batchMarkVisible: true })}>批量标记</a>
        //             </Functions>
        //         </Menu.Item>
        //     </Menu>);
        return (
            <div className="wishorder-tablelist">
                <div className="wishorder-addBtn">
                    {/* <Dropdown overlay={menu}>
                        <Button style={{ float: 'left', marginLeft: 0 }}>批量操作<Icon type="down" /></Button>
                    </Dropdown> */}
                    <Functions {...this.props} functionkey="001-000001-000003-003">
                        <Button icon="download" onClick={() => openModal('1')}>订单抓取</Button>
                    </Functions>
                    {/* <Functions {...this.props} functionkey="001-000001-000003-004"> */}
                    {/* <Button type="primary" icon="upload">订单导出</Button>  后期实现 */}
                    {/* </Functions> */}
                </div>
                <div className="wishorder-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
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
                {/* <BatchOptionModal
                    title="批量标记"
                    visible={batchMarkVisible}
                    closeModal={() => {
                        this.setState({ batchMarkVisible: false })
                    }}
                    url="/oms/order/manage/motan/service/api/IOrderManageService/batchMarkWish"
                    templateUrl={downloadUrl('/download/oms/wish-batchmark-template.xlsx')}
                    fileSize={2}
                    maxCount={10000}
                /> */}
            </div>
        )
    }
}
