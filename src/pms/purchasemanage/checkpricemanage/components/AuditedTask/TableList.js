import React from 'react';
import {
    Table,
    Spin,
    Button,
    Dropdown,
    Menu,
    Icon,
    Pagination,
    message,
    Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import AddCom from './AddCom';
import ImportCom from './ImportCom';
import SkuCom from './SkuCom';
import TaskTransfer from './TaskTransfer';

import { levelOptions } from '../../../../../util/options';
import { timestampFromat } from '../../../../../util/baseTool';
import Functions from '../../../../../components/functions';
import PopConfirm from "../../../../../common/components/confirm";
import { fetchPost } from '../../../../../util/fetch';
import { Audite_Task_Export_Api } from '../../constants/Api';
import { deepCopyobject } from '../../../../../util/baseTool';

export default class Tablelist extends React.Component {
    state = {
        sku: {
            visible: false,
            sku: '',
        },
        add: {
            visible: false,
            sku: '',
        },
        importFileVisible: false,
        taskTransfer: {
            visible: false,
            keys: [],
        },
    }

    rowSelection = {
        columnWidth: 30,
        selectedRowKeys: [],
        selectedRows: [],
        onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys;
            this.rowSelection.selectedRows = selectedRows;
            this.setState({});
        },
    }


    columns = [
        {
            title: '核查任务编号',
            width: 70,
            dataIndex: 'taskNumber',
            key: 'taskNumber',
        },
        {
            title: '时间',
            dataIndex: 'supplierLevel',
            width: 130,
            key: 'supplierLevel',
            render: (text, row) => {
                const time = Math.abs(Number.parseInt(Date.now(), 10) - Number.parseInt(row.createTime, 10));
                const duration = this.getDuration(time);
                let color;
                if (duration === 2) {
                    color = '#FF0000';
                } else if (duration === 1) {
                    color = '#F8AA04';
                } else {
                    color = '#4D7BFE';
                }
                return (
                    <div className="text-left">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;任务创建时间:{timestampFromat(Number.parseInt(row.createTime, 10), 2)}</p>
                        <p>已等待核价时长:<span style={{ color }}>{this.getWasteTime(time)}</span></p>
                    </div>
                );
            },
        },
        {
            title: 'SKU',
            dataIndex: 'SKU',
            width: 100,
            key: 'SKU',
            render: (text, row) => (
                <div className="text-left">
                    <p><a href=" javascript:;" onClick={() => this.changeModal('sku', { visible: true, sku: row.sku })}>{row.sku}</a></p>
                    <p>{row.productDesc}</p>
                </div>
            ),
        },
        {
            title: 'PR',
            dataIndex: 'PR',
            width: 100,
            key: 'PR',
            render: (text, row) => (
                <div className="text-left">
                    <p>&nbsp;&nbsp;&nbsp;PR单号:{row.prNumber}</p>
                    <p>预定金额:<span style={{ color: 'FF0000' }}>{row.payAmount}</span></p>
                    <p>预定数量:{row.payCount}</p>
                </div>
            ),
        },
        {
            title: '核价类型',
            dataIndex: 'pricingType',
            width: 100,
            key: 'pricingType',
        },
        {
            title: '日均销量',
            dataIndex: 'averageSales',
            width: 50,
            key: 'averageSales',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: 100,
            key: 'remark',
            render: (value) => (<Tooltip  title={value}>
                <div className="pms-prmanage-remark">{value}</div>
            </Tooltip>),
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: 80,
            key: 'state',
        },
        {
            title: '人员',
            dataIndex: 'user',
            width: 120,
            key: 'user',
            render: (text, row) => (
                <div className="text-left">
                    <p>采购开发:{row.purchaseDeveloper}</p>
                    <p>采购订货:{row.purchaseOrderGoods}</p>
                    <p>采购核价:{row.purchasePricing}</p>
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'handle',
            width: 80,
            key: 'handle',
            render: (Text, r) => (
                <div>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000002-003"
                    >
                        <Link style={{ marginRight: '10px' }} target="_blank" to={`/pms/purchasemanage/checkpricemanage/skucheckpric/?id=${r.key}`}>核价</Link>
                    </Functions>
                    <Functions
                        {...this.props}
                        functionkey="010-000003-000002-004"
                    >
                        <a href=" javascript:;" onClick={() => this.singleTaskTransferCheck(r.key)}>任务转移</a>
                    </Functions>
                </div>
            ),
        },
    ];

    goto = (id) => {
        const { history } = this.props;
        history.push(`/pms/purchasemanage/checkpricemanage/skucheckpric/?id=${id}`);
    }

    // 清除 selectedRowKeys
    clearSelected = () => {
        this.rowSelection.selectedRowKeys = [];
        this.rowSelection.selectedRows = [];
        this.setState({});
    }

    getDuration = (time) => {
        let duration = 0;
        const h = time / (60 * 60 * 1000);
        if (h >= 4) {
            duration = 2;
        } else if (h >= 2 && h < 4) {
            duration = 1;
        }
        return duration;
    }

    getWasteTime = (time) => {
        const h = Math.floor(time / (60 * 60 * 1000));
        time -= (h * 60 * 60 * 1000);
        const m = Math.floor(time / (60 * 1000));
        time -= (m * 60 * 1000);
        const s = Math.floor(time / 1000);
        let str = '';
        if (h) {
            str = `${h}小时`;
        }
        if (m) {
            str += `${m}分`;
        }
        str += `${s}秒`;
        return str;
    }

    Paginatihandle = (page, pageSize) => {
        const { getAuditedTaskAsync, auditedTaskList } = this.props;
        const params = auditedTaskList.params;
        if (page) {
            params.pageNumber = page;
            params.pageData = pageSize;
        }
        getAuditedTaskAsync(params);
    }

    /**
     * 导出
     */
    handleExport = () => {
        PopConfirm('导出', '确认导出文件到导入导出管理列表？', this.httpExport);
    };

    httpExport = () => {
        const { auditedTaskList } = this.props;
        const params = deepCopyobject(auditedTaskList.params);
        delete params['pageNumber'];
        delete params['pageData'];
        fetchPost(Audite_Task_Export_Api, {data: params}, 1).then((result) => {
            if (result.state === '000001') {
                window.open('/pms/importexportmanage/importexportlist/', '_blank');
            }
        });
    };

    createTopelement = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.taskTransferCheck}>批量任务转移</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="audited-task-order-table-btn position-relative text-right padding-sm-right padding-sm-top">
                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-004"
                >
                    <div className="audited-task-order-table-btn-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" theme="outlined" /></Button>
                        </Dropdown>
                    </div>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-006"
                >
                    <Button
                        icon="upload"
                        className="margin-sm-right"
                        onClick={() => this.handleExport()}
                    >
                        导出
                    </Button>
                </Functions>

                <Functions
                    {...this.props}
                    functionkey="010-000003-000002-005"
                >
                    <Button
                        icon="download"
                        className="margin-sm-right"
                        onClick={() => this.changeModal('importFileVisible', true)}
                    >
                        导入核价任务
                    </Button>
                    <Button
                        icon="plus"
                        onClick={() => this.changeModal('add', { visible: true, sku: '' })}
                    >
                        新增核价任务
                    </Button>
                </Functions>
            </div>
        );
    }

    singleTaskTransferCheck = (key) => {
        this.changeModal('taskTransfer', {
            keys: [key],
            visible: true,
        });
    }

    taskTransferCheck = () => {
        const selectedRows = this.rowSelection.selectedRows;
        if (selectedRows.length) {
            const keys = selectedRows.map(v => v.key);
            this.changeModal('taskTransfer', {
                keys,
                visible: true,
            });
        } else {
            message.warning('请先选择项');
        }
    }

    changeModal = (type, params) => {
        this.setState({
            [type]: params,
        });
    }

    render() {
        const {
            auditedTaskList,
            getProcurementRoleAsync,
            getPriceManagementAddNewTaskAsync,
            getpriceManagementImportTaskAsync,
            getPriceManagementTaskAsync,
            skuHistoricalCheckAsync,
        } = this.props;
        const {
            total,
            list,
            params,
            loading,
        } = auditedTaskList;

        const {
            add,
            importFileVisible,
            taskTransfer,
            sku,
        } = this.state;

        const { pageNumber, pageData } = params;
        const table = (
            <Spin spinning={loading} delay={500} tip="Loading...">
                <div className="padding-sm">
                    <Table
                        bordered
                        size="small"
                        dataSource={list}
                        pagination={false}
                        columns={this.columns}
                        rowSelection={this.rowSelection}
                    />
                    <Pagination
                        showTotal={t => `共 ${t} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageData}
                        onChange={this.Paginatihandle}
                    />
                </div>
            </Spin>
        );
        return (
            <div className="unordered-purchase-tablewrap">
                {this.createTopelement()}
                {table}
                <SkuCom
                    visible={sku.visible}
                    data={sku.sku}
                    onCancel={() => this.changeModal('sku', { visible: false, sku: '' })}
                    skuHistoricalCheckAsync={skuHistoricalCheckAsync}

                />
                <AddCom
                    visible={add.visible}
                    onCancel={() => this.changeModal('add', { visible: false, sku: '' })}
                    getProcurementRoleAsync={getProcurementRoleAsync}
                    getPriceManagementAddNewTaskAsync={getPriceManagementAddNewTaskAsync}
                />
                <ImportCom
                    visible={importFileVisible}
                    getpriceManagementImportTaskAsync={getpriceManagementImportTaskAsync}
                    onCancel={() => this.changeModal('importFileVisible', false)}
                    {...this.props}
                />
                <TaskTransfer
                    keys={taskTransfer.keys}
                    visible={taskTransfer.visible}
                    getPriceManagementTaskAsync={getPriceManagementTaskAsync}
                    onCancel={() => this.changeModal('taskTransfer', { visible: false, keys: [] })}
                />

            </div>
        );
    }
}
