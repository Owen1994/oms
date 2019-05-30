import React, { Component } from 'react';
import {
    Button, Menu,
    Dropdown, Icon,
    Spin, Table,
} from 'antd';
import CollectGoodsPrintModal from './model/CollectGoodsPrintModal';
import PopConfirm from '../../../../../common/components/confirm';
import { fetchPost } from '../../../../../util/fetch';
import { COLLECTING_BAG_MERGE, PRINT_COLLECTING_BAG } from '../../constants/Api';
import Functions from '../../../../../components/functions';

class TableList extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        isShowPrintModal: false,
        printData: {},
    };

    columns = [
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
            width: 100,
        },
        {
            title: '集货袋号',
            dataIndex: 'collectingBagNumber',
            width: 100,
        },
        {
            title: '合并前集货袋号',
            dataIndex: 'beforeCollectingBagNumber',
            width: 100,
        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
            width: 100,
        },
        {
            title: '交运状态',
            dataIndex: 'deliveryStatus',
            width: 100,
        },
        {
            title: '是否合并',
            dataIndex: 'iaAggregation',
            width: 100,
        },
        {
            title: '包裹净重(g)',
            dataIndex: 'packageNetWeight',
            width: 100,
        },
        {
            title: '包裹数',
            dataIndex: 'packageCount',
            width: 100,
        },
        {
            title: '结袋时间',
            dataIndex: 'baggingTime',
            width: 100,
        },
        {
            title: '操作',
            width: 100,
            render: (text, record) => (
                <Functions
                    {...this.props}
                    functionkey="012-000006-000004-010"
                >
                    <a onClick={() => this.getPrintData(record)}>打印
                    </a>
                </Functions>
            ),
        },
    ];

    /**
     * 获取打印数据
     */
    getPrintData = (record) => {
        const params = {
            data: {
                key: record.key,
            },
        };
        fetchPost(PRINT_COLLECTING_BAG, params, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        isShowPrintModal: true,
                        printData: {
                            ...result.data,
                            label: record.collectingBagNumber,
                        },
                    });
                }
            });
    };

    expandsColumns = (recode) => {
        const data = recode.orderInfo;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderNumber',
            },
            {
                title: '运单号',
                dataIndex: 'waybillNo',
            },
            {
                title: '理论重量(g)',
                dataIndex: 'theoreticalWeight',
            },
            {
                title: '实际重量(g)',
                dataIndex: 'actualWeight',
            },
        ];

        return (
            <Table
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        );
    };

    mergeItem = () => {
        PopConfirm('合并', '您确定要合并吗？', () => {
            const params = {
                data: {
                    keys: this.state.selectedRowKeys,
                },
            };
            fetchPost(COLLECTING_BAG_MERGE, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.props.loadData();
                    }
                });
        });
    };

    render() {
        const {
            partList,
            loadingState,
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
            getCheckboxProps: () => ({
                disabled: false,
            }),
        };
        // 下拉列表
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions
                        isPage
                        {...this.props}
                        functionkey="012-000006-000004-009"
                    >
                        <a onClick={this.mergeItem}>
                            批量合并
                        </a>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="breadcrumb padding-sm margin-ss-top wms-expanded-table">
                <Dropdown overlay={menu} className="margin-ss-bottom">
                    <Button>
                        <span>批量操作</span> <Icon type="down" />
                    </Button>
                </Dropdown>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        rowSelection={rowSelection}
                        expandedRowRender={this.expandsColumns}
                    />
                </Spin>
                <CollectGoodsPrintModal
                    visible={this.state.isShowPrintModal}
                    cancel={() => {
                        this.setState({
                            isShowPrintModal: false,
                        });
                    }}
                    printData={this.state.printData}
                />
            </div>
        );
    }
}

export default TableList;
