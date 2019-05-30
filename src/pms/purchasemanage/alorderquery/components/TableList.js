import React from 'react';
import {
    Button,
    Pagination,
    Spin,
    Table,
    Menu,
    Dropdown,
    Icon,
    message, Tooltip,
} from 'antd';
import { Link } from "react-router-dom";
import Functions from '../../../../components/functions';
import PopConfirm from '@/common/components/confirm';

/**
 * 我收到的消息列表
 */
export default class TableList extends React.Component {
    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: '采购单号',
            dataIndex: 'poNumber',
            render: (text, record) => {
                const checkUrl = `/pms/purchasemanage/orderquery/detail/?orderNumber=${record.poNumber}`;
                return (
                    <Link to={checkUrl}>
                        {text}
                    </Link>
                )
            },
        },
        {
            title: '阿里订单号',
            dataIndex: 'alOrderNumber',
            render: (text, record) => {
                const checkUrl = `/pms/purchasemanage/alorderquery/detail/?alKey=${record.key}&alOrderNumber=${record.alOrderNumber}`;
                return (
                    <Link to={checkUrl} target="_blank">
                        {text}
                    </Link>
                )
            },
        },
        {
            title: '金额',
            dataIndex: 'money',
            width: 200,
            render: (text, record) => (
                <div className="al_money_div">
                    <p>
                        <span className="info-span">实际采购金额:</span>
                        <span>{record.actualMoney}</span>
                    </p>
                    <p>
                        <span className="info-span">应付金额:</span>
                        <span>{record.accountReceivable}</span>
                    </p>
                    <p>
                        <span className="info-span">阿里订单金额:</span>
                        <span>{record.alOrderMoney}</span>
                    </p>
                    <p>
                        <span className="info-span">运费:</span>
                        <span>{record.freight}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '时间',
            dataIndex: 'time',
            render: (text, record) => (
                <div className="al_time_div">
                    <p>
                        <span className="info-span">采购下单时间:</span>
                        <span>{record.poOrdersTime}</span>
                    </p>
                    <p>
                        <span className="info-span">采购单打印时间:</span>
                        <span>{record.poPrintTime}</span>
                    </p>
                    <p>
                        <span className="info-span">阿里订单下单时间:</span>
                        <span>{record.alOrdersTime}</span>
                    </p>
                    <p>
                        <span className="info-span">付款时间:</span>
                        <span>{record.payType}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '人员',
            dataIndex: 'people',
            render: (text, record) => (
                <div className="al_people_div">
                    <p>
                        <span className="info-span">订货员:</span>
                        <span>{record.opEmployee}</span>
                    </p>
                    <p>
                        <span className="info-span">跟单员:</span>
                        <span>{record.merchandiser}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => (
                <div className="al_status_div">
                    <p>
                        <span className="info-span">采购单状态:</span>
                        <span>{record.poStatus}</span>
                    </p>
                    <p>
                        <span className="info-span">阿里订单状态:</span>
                        <span>{record.alOrderStatus}</span>
                    </p>
                </div>
            ),
        },
        {
            title: '检测状态',
            dataIndex: 'testStatusValue',
            render: (text, record) => {
                if (record.testStatusCode === 20) {
                    return (
                        <div className="al_testStatus_green">
                            {text}
                        </div>
                    )
                } else {
                    return (
                        <div className="al_testStatus_red">
                            {text}
                        </div>
                    )
                }
            },
        },
        {
            title: '未通过原因',
            dataIndex: 'reasonsFailure',
            render: (value) => {
                let showMore = false;
                let keyWord = '';
                if (value.length > 10) {
                    showMore = true;
                    keyWord = value.substring(0, 10);
                    keyWord = keyWord + '...';
                }
                return showMore ? (
                    <div>
                        <span>
                            <Tooltip placement={"top"} title={value} overlayStyle={{overflowY:'scroll'}}>
                                {keyWord}
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span>{value}</span>
                    </div>
                )
            },
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
        },
        {
            title: '操作',
            dataIndex: 'options',
            width: 120,
            render: (text, record) => {
                const checkUrl = `/pms/purchasemanage/alorderquery/detail/?alKey=${record.key}&alOrderNumber=${record.alOrderNumber}`;

                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="010-000003-000006-008"
                            >
                                <a onClick={
                                    () => this.props.httpUpdateOrder([record.alOrderNumber])}
                                >
                                    更新订单
                                </a>
                            </Functions>
                        </Menu.Item>

                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="010-000003-000006-009"
                            >
                                <a onClick={
                                    () => PopConfirm(
                                        '解除订单',
                                        '解除采购单与阿里订单绑定关系，解绑后将删除阿里订单及物流轨迹',
                                        () => this.props.httpDissolutionOrder(record.key))}
                                >
                                    解除订单
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <div>
                        <a href={checkUrl} target="_blank">详情</a>

                        <Dropdown overlay={menu}>
                            <a className="padding-ss-left">
                                更多
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            },
        }];

    state = {
        selectedRowKeys: [],
        selectedRows: [],
    };

    /**
     * 处理批量更新
     */
    handleBatchUpdate = () => {
        const rows = this.state.selectedRows;
        const keys = [];
        if (rows.length === 0) {
            message.info('请勾选需要进行更新的订单');
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            keys.push(rows[i]['alOrderNumber']);
        }

        this.props.httpBatchUpdate(keys);
    };

    /**
     * 批量创建付款计划单
     */
    handleCreatePlanOrder = () => {
        const rows = this.state.selectedRows;
        const keys = [];
        if (rows.length === 0) {
            message.info('请勾选需要进行创建付款计划单的订单');
            return;
        }
        for (let i = 0; i < rows.length; i++) {
            keys.push(rows[i]['poNumber']);
        }

        this.props.httpCreatePlanOrder(keys);
    };


    render() {
        const {
            list,
            total,
        } = this.props.mainDataList;

        const {
            pageNumber,
            pageSize,
            loadData,
            httpExportOrder,
            httpExportLogisticsInfo,
        } = this.props;


        /**
         * table选中回调
         */
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            },
        };

        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000006-005"
                    >
                        <a onClick={this.handleBatchUpdate}>批量更新订单</a>
                    </Functions>
                </Menu.Item>

                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000006-006"
                    >
                        <a onClick={this.handleCreatePlanOrder}>批量创建付款计划单</a>
                    </Functions>
                </Menu.Item>
            </Menu>
        );

        return (
            <Spin spinning={this.props.orderLoading} delay={500} tip="Loading...">
                <div className="yks-erp-table">
                    <div className="top-container">
                        <div className="top-left-wrap">
                            <Dropdown overlay={menu}>
                                <Button>批量操作<Icon type="down" theme="outlined" /></Button>
                            </Dropdown>
                        </div>

                        <div className="top-right-wrap">
                            <Functions
                                {...this.props}
                                functionkey="010-000003-000006-004"
                            >
                                <Button
                                    icon="upload"
                                    className='margin-ss-right'
                                    onClick={httpExportOrder}
                                >
                                    订单导出
                                </Button>
                            </Functions>

                            <Functions
                                {...this.props}
                                functionkey="010-000003-000006-007"
                            >
                                <Button
                                    icon="upload"
                                    onClick={httpExportLogisticsInfo}
                                >
                                    导出物流信息
                                </Button>
                            </Functions>

                        </div>
                    </div>
                    <Spin spinning={this.props.isLoading} delay={500} tip="Loading...">
                        <Table
                            rowKey={record => record.key}
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={list}
                            size="small"
                            pagination={false}
                            bordered
                        />
                        <Pagination
                            showTotal={() => `共 ${total} 条`}
                            current={pageNumber}
                            showQuickJumper={{ goButton: true }}
                            total={total}
                            pageSize={pageSize}
                            onChange={loadData}
                        />
                    </Spin>
                </div>
            </Spin>    
        );
    }
}

