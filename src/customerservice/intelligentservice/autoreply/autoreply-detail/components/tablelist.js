import React from 'react';
import {
    Button,
    Spin,
    Table,
    Pagination,
    Menu,
    Dropdown,
    Icon,
    Tooltip,
    Modal,
    message,
} from 'antd';
import { page } from '@/constants/page';
import { fetchPost } from '../../../../../util/fetch';
import Shunt from '../../common/shunt';
import ContentModal from './contentModal';
import DetailModal from '../../common/detailModal';
import Functions from '@/components/functions';

const confirm = Modal.confirm;

export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        detailModalVisible: false,
        visible: false,
        record: {},
    }

    columns = [
        {
            title: '订单信息',
            key: 'platform',
            dataIndex: 'platform',
            width: 120,
            align: 'center',
            render: (t, r) => {
                const {
                    internalNumber,
                    platformOrderNumber,
                    orderTrackingCode,
                    warehouse,
                } = r;
                return (
                    <div>
                        <Shunt right={2} title="内单号" content={internalNumber} />
                        <Shunt right={2} title="平台订单号" content={platformOrderNumber} />
                        <Shunt right={2} title="订单跟踪码" content={orderTrackingCode} />
                        <Shunt right={2} title="仓别及仓库" content={warehouse} />
                    </div>
                );
            },
        },
        {
            title: '渠道信息',
            key: 'ruleName',
            dataIndex: 'ruleName',
            width: 120,
            align: 'center',
            render: (t, r) => {
                const {
                    shippingMethod,
                    // provider,
                    channel,
                    trajectoryState,
                    packageState,
                    deliveryTime,
                } = r;
                return (
                    <div>
                        <Shunt left={1} right={3} title="邮寄方式" content={shippingMethod} />
                        {/* <Shunt left={2} right={3} title="物流服务商" content={provider} /> */}
                        <Shunt left={1} right={3} title="物流渠道" content={channel} />
                        <Shunt left={1} right={3} title="轨迹状态" content={trajectoryState} />
                        <Shunt left={1} right={3} title="包裹状态" content={packageState} />
                        <Shunt left={1} right={3} title="发货时间" content={deliveryTime} />
                    </div>
                );
            },
        },
        {
            title: '发送信息',
            key: 'plateName',
            dataIndex: 'plateName',
            width: 110,
            align: 'center',
            // width: 200,
            render: (t, r) => {
                const {
                    ruleName,
                    sendingState,
                    sendType,
                    sendingTime,
                    sendingStateErrorInfo,
                } = r;
                let send;
                if (sendingState === '未发送') {
                    send = (<span className="red">待发送</span>);
                } else if (sendingState === '已经发送') {
                    send = (<span className="green">已发送</span>);
                } else if (sendingState === '发送失败') {
                    send = (
                        <div>
                            <span className="red">发送失败</span>
                            <Tooltip placement="top" title={sendingStateErrorInfo || '失败原因为空'}>
                                <span className="margin-sm-left"><Icon type="exclamation-circle" /></span>
                            </Tooltip>
                        </div>
                    );
                }

                return (
                    <div>
                        <Shunt left={1} right={3} title="规则名称" content={ruleName} />
                        <Shunt left={1} right={3} title="发送状态" content={send} />
                        <Shunt left={1} right={3} title="发送方式" content={sendType} />
                        <Shunt left={1} right={3} title="发送时间" content={sendingTime} />
                    </div>
                );
            },
        },
        {
            title: '平台账号信息',
            dataIndex: 'sendType',
            key: 'sendType',
            width: 90,
            align: 'center',
            render: (t, r) => {
                const {
                    platform,
                    sellerAccount,
                } = r;
                return (
                    <div>
                        <Shunt left={2} right={3} title="平台" content={platform} />
                        <Shunt left={2} right={3} title="卖家账号" content={sellerAccount} />
                    </div>
                );
            },
        },
        {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 40,
            render: (text, record) => {
                // 发送失败
                const { sendingState, key } = record;
                const children = [];
                if (sendingState === '已经发送') {
                    children.push(
                        <Functions key="1" {...this.props} functionkey="009-000005-000001-006">
                            <span onClick={() => this.showModal(record)} className="autoreply-detail-btn blue">查看</span>
                        </Functions>,
                        <Functions key="2" {...this.props} functionkey="009-000005-000001-002">
                            <span onClick={() => this.showDetailModal(record)} className="autoreply-detail-btn blue">规则</span>
                        </Functions>,
                    );
                } else if (sendingState === '发送失败') {
                    children.push(
                        <Functions key="3" {...this.props} functionkey="009-000005-000001-007">
                            <span key="3" onClick={() => this.useSendAsync([key])} className="autoreply-detail-btn blue">发送</span>
                        </Functions>,
                    );
                }
                return (
                    <div>
                        {children}
                    </div>
                );
            },
        },
    ];

    synchronizeOrder = (orderNumber) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(SUBMIT_EBAY_SYNC, { data: { orderNumber } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.handleSubmit(pageNumber, pageData);
                }
            });
    }

    rowSelectionChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys,
        });
    }

    getCheckboxProps = (record) => {
        const obj = {};
        // disabled: true,
        if (record.sendingState === '未发送' || record.sendingState === '已经发送') {
            obj.disabled = true;
        }
        return obj;
    }

    batchUseSend = (keys) => {
        if (!keys || !keys.length) return message.warning('请先选择项');
        this.useSendAsync(keys);
    }

    // send
    useSendAsync = (keys) => {
        if (!keys || !keys.length) return;
        const len = keys.length;
        const { sendAsync } = this.props;
        confirm({
            title: '提示',
            content: `是否确认发送这${len}项`,
            onOk: () => {
                sendAsync({ key: keys });
                // 发送后取消勾选
                this.setState({
                    selectedRowKeys: [],
                });
            },
        });
    }

    // 查看弹窗
    showModal = (record) => {
        this.setState({
            record,
            visible: true,
        });
    }

    // 查看弹窗
    showDetailModal = (record) => {
        this.setState({
            record,
            detailModalVisible: true,
        });
    }

    handleCancel = () => {
        this.setState({
            record: {},
            visible: false,
            detailModalVisible: false,
        });
    }

    render() {
        const {
            selectedRowKeys, visible, record, detailModalVisible,
        } = this.state;
        const {
            list, total,
            pageNumber, pageData,
            handleSubmit, loading,
            getSendDetialAsync, getDetailAsync,
        } = this.props;

        const menuChilrden = [];
        menuChilrden.push(
            <Menu.Item key="1">
                <Functions {...this.props} functionkey="009-000005-000001-007">
                    <div onClick={() => this.batchUseSend(selectedRowKeys)}>
                        批量发送
                    </div>
                </Functions>
            </Menu.Item>,
        );

        const menu = (
            <Menu>
                {menuChilrden}
            </Menu>
        );
        const rowSelection = {
            selectedRowKeys,
            rowSelection: 30,
            onChange: this.rowSelectionChange,
            getCheckboxProps: this.getCheckboxProps,
        };
        return (
            <div className="autoreply-set-tablelist">
                <div className="leftBtn padding-sm-bottom">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>批量操作<Icon type="caret-down" /></Button>
                    </Dropdown>
                </div>
                <div className="ebayorder-table">
                    <Spin spinning={loading}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                            rowKey={r => r.key}
                            rowSelection={rowSelection}
                        />
                    </Spin>
                </div>
                <Pagination
                    showTotal={t => `共 ${t} 条`}
                    pageSizeOptions={page.pageSizeOptions}
                    showSizeChanger // 是否可以改变 pageSize
                    current={pageNumber}
                    showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                    total={total} // 数据总数
                    pageSize={pageData} // 每页条数
                    onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                    onShowSizeChange={handleSubmit} // pageSize 变化的回调
                    size="small"
                />
                <ContentModal
                    visible={visible}
                    id={record.key}
                    handleCancel={this.handleCancel}
                    getSendDetialAsync={getSendDetialAsync}
                />
                <DetailModal
                    visible={detailModalVisible}
                    record={record}
                    closeModal={this.handleCancel}
                    getDetailAsync={getDetailAsync}
                />
            </div>
        );
    }
}
