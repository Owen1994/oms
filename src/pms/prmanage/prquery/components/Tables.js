/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Checkbox,
    Button,
    message,
    Tooltip,
} from 'antd';
import PopConfirm from '@/common/components/confirm';
import { timestampFromat } from '../../../../util/baseTool';
import { UPDATE_ORDERS_DOCUMENTATION } from '../constants';
import {
    fetchPost,
} from '@/util/fetch';
import { EXPORTPURCHASEPLAN } from '../constants';
import { parseStrToArray } from '../../../../util/StrUtil';
import Functions from '../../../../components/functions';

export default class table extends React.Component {
    state = {
        checkedList: [], // 所有单选存放key
        checkAll: false, // 判断是否全选
        indeterminate: false, // 判断是否全选样式
    };

    // 单选
    handleOnChange = (value, row) => {
        this.setState((prevState) => {
            const checkedList = prevState.checkedList;
            const position = checkedList.indexOf(row.key);
            if (position >= 0) {
                checkedList.splice(position, 1);
            } else {
                checkedList.push(row.key);
            }
            const checkAll = checkedList.length === this.props.data.list.length;
            const indeterminate = checkedList.length > 0;
            return {
                checkedList: [...checkedList],
                checkAll,
                indeterminate,
            };
        });
    };

    // 全选
    handleToggleChecked = () => {
        const checkAll = this.state.checkAll;
        if (checkAll) {
            this.setState({
                checkAll: false,
                checkedList: [],
            });
        } else {
            this.setState({
                checkAll: true,
                checkedList: this.props.data.list.map(item => item.key),
                indeterminate: false,
            });
        }
    };

    handleTabChange = (pagination, filters, sorter) => {
        const params = { ...sorter };
        if (params.field === 'planUploadTime') {
            params.field = 'planUploadTimeNumber';
        } else if (params.field === 'demandTime') {
            params.field = 'demandTimeNumber';
        }
        this.props.sortFieldsList(params);
    };

    // 是否确定更新订货及跟单
    handleOrder = () => {
        PopConfirm('是否确定更新订货及跟单？', '', () => {
                this.updateOrdersDocumentation();
                this.props.onSearch();
            }
        );
    };
    updateOrdersDocumentation = () => {
        const params = {};
        fetchPost(UPDATE_ORDERS_DOCUMENTATION, params, 2)
            .then((result) => {
                if (result.state === '000001') {
                    message.success(result.msg);
                }
            });
    };

    // 数据导出
    handleExport = () => {
        const params = {};
        const data = { ...this.props.form.getFieldsValue() };
        data.purchaseState = Number.parseInt(data.purchaseState, 10);
        data.prState = Number.parseInt(data.prState, 10);
        data.warehouse = Number.parseInt(data.warehouse, 10);
        data.searchContents = parseStrToArray(data.searchContents);
        if (data.searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        if (data.demandTimes) {
            data.demandTimes = (data.demandTimes).map(item => (
                item.valueOf()
            ));
        }
        if (data.planUploadTimes) {
            const firstTime = (data.planUploadTimes[0]).valueOf();
            const secondTime = (data.planUploadTimes[1]).valueOf();
            const middleTime = 90 * 24 * 60 * 60 * 1000;
            if (secondTime - firstTime >= middleTime) {
                message.warning('计划上传时间不能超过90天');
                return false;
            }
            data.planUploadTimes = (data.planUploadTimes).map(item => (
                item.valueOf()
            ));
        }
        params.data = data;
        this.onConfirm(params);
    };

    // 确认弹窗
    onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(EXPORTPURCHASEPLAN, params, 2)
            .then((result) => {
                this.setState({ exportLoading: false });
                if (result.state === '000001') {
                    message.success(result.msg);
                    setTimeout(() => {
                        window.open('/pms/importexportmanage/importexportlist/', '_blank');
                    }, 1000);
                }
            });
    };

    columns = [
        {
            title: (
                <div>
                    <Checkbox
                        onChange={e => this.handleToggleChecked(e)}
                        checked={this.state.checkAll}
                        indeterminate={this.state.indeterminate}
                    />
                </div>
            ),
            dataIndex: 'checked',
            render: (value, row, index) => ({
                children: <Checkbox
                    onChange={() => this.handleOnChange(value, row, index)}
                    checked={this.state.checkedList.indexOf(row.key) >= 0}
                />,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: 'PR单号',
            dataIndex: 'prNumber',
            key: 'prNumber',
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '请购数量',
            dataIndex: 'purchaseCount',
            key: 'purchaseCount',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '待执行数量',
            dataIndex: 'pendingQuantity',
            key: 'pendingQuantity',
            sorter: true,
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        // {
        //     title: '计划取消PR数量',
        //     dataIndex: 'planCancelQuantity',
        //     key: 'planCancelQuantity',
        //     render: (value, row) => ({
        //         children: value,
        //         props: { rowSpan: row.rows },
        //     }),
        // },
        {
            title: '业务线',
            dataIndex: 'businessLine',
            key: 'businessLine',
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '仓库',
            dataIndex: 'wareHouse',
            key: 'wareHouse',
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '角色',
            dataIndex: 'planRole',
            width: 170,
            key: 'planRole',
            render: (value, record) => ({
                children:
                    <div className="text-left">
                        <p>
                            <span className="span-4">
                                计划员:
                            </span>
                            <span className="span-content">
                                {value}
                            </span>
                        </p>
                        <p>
                            <span className="span-4">
                                订货员:
                            </span>
                            <span className="span-content">
                                {record.purchaseRole}
                                </span>
                        </p>
                        <p>
                            <span className="span-4">
                                跟单员:
                            </span>
                            <span className="span-content">
                                {record.followRole}
                            </span>
                        </p>
                    </div>,
                props: { rowSpan: record.rows },
            }),
        },
        {
            title: '计划上传时间',
            dataIndex: 'planUploadTime',
            key: 'planUploadTime',
            sorter: true,
            render: (value, row) => ({
                children: <span>{timestampFromat(value, 2)}</span>,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '需求日期',
            dataIndex: 'demandTime',
            key: 'demandTime',
            sorter: true,
            render: (value, row) => ({
                children: <span>{timestampFromat(value, 2)}</span>,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: 'PR执行状态',
            dataIndex: 'prState',
            key: 'prState',
            render: (value, row) => ({
                children: value,
                props: { rowSpan: row.rows },
            }),
        },
        {
            title: '采购单号',
            dataIndex: 'purchaseNumbers',
            key: 'purchaseNumbers',
        },
        {
            title: '订单数量',
            dataIndex: 'orderNumbers',
            key: 'orderNumbers',
        },
        {
            title: '入库数量',
            dataIndex: 'wareQuantity',
            key: 'wareQuantity',
        },
        {
            title: '采购单价',
            dataIndex: 'skuPrice',
            key: 'skuPrice',
        },
        // {
        //     title: '采购取消PR数量',
        //     dataIndex: 'purchaseCancelQuantity',
        //     key: 'purchaseCancelQuantity',
        // },
        {
            title: '订单SKU状态',
            dataIndex: 'skuState',
            key: 'skuState',
        },
        {
            title: '打印时间',
            dataIndex: 'printTimes',
            key: 'printTimes',
        },
        {
            title: '供应商',
            dataIndex: 'suppliers',
            key: 'suppliers',
        },
        {
            title: '计划备注',
            dataIndex: 'remark',
            key: 'remark',
            render: (value) => (
                <Tooltip title={value}>
                    <div>{value}</div>
                </Tooltip>
            ),
        }
    ];


    render() {
        const {
            data,
            onSearch,
            loadingState,
        } = this.props;

        const totalNum = data.total;
        const pageNumber = this.props.pageNumber;
        const pageSize = this.props.pageSize;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions
                            {...this.props}
                            functionkey="010-000002-000001-003"
                        >
                            <Button
                                type="button"
                                onClick={this.handleOrder}
                                className="margin-ss-right"
                                icon="sync"
                            >
                                更新订货及跟单
                            </Button>
                        </Functions>
                        <Functions
                            {...this.props}
                            functionkey="010-000002-000001-002"
                        >
                            <Button onClick={this.handleExport} icon="upload">
                                数据导出
                            </Button>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            onChange={this.handleTabChange}
                            pagination={false}
                            size="small"
                            bordered
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={totalNum}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
