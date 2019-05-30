import React, { Component } from 'react';
import {
    Button, Menu,
    Dropdown, Icon,
    Spin, Table, Pagination,
} from 'antd';
import MergeModal from './modal/MergeModal';
import Functions from '../../../../../components/functions';
import PopConfirm from '../../../../../common/components/confirm';
import { fetchPost } from '../../../../../util/fetch';
import { CHANNEL_TABLE_CANCEL } from '../../constants/Api';

class TableList extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        showMergeModal: false,
    };

    columns = [
        {
            title: '货代名称',
            dataIndex: 'wardingName',
            width: 100,
        },
        {
            title: '渠道编码',
            dataIndex: 'channelCode',
            width: 100,
        },
        {
            title: '渠道名称',
            dataIndex: 'channelNmae',
            width: 100,
        },
        {
            title: '是否可用',
            dataIndex: 'isAvailable',
            width: 100,
        },
        {
            title: '是否合并',
            dataIndex: 'isAggregation',
            width: 100,
        },
        {
            title: '原渠道编码',
            dataIndex: 'oldChannelCode',
            width: 100,
        },
        {
            title: '原渠道名称',
            dataIndex: 'oldChannelName',
            width: 100,
        },
        {
            title: '渠道可发最大重量',
            dataIndex: 'maxWeight',
            width: 100,
        },
        {
            title: '渠道可发最小重量',
            dataIndex: 'minWeight',
            width: 100,
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
            width: 100,
        },
    ];

    expandsColumns = (recode) => {
        const data = recode.countryInfo || [];
        const columns = [
            {
                title: '序号',
                key: 'childIndex',
                render: (text, record, index) => (index + 1),
            },
            {
                title: '国家中文名称',
                dataIndex: 'cnName',
            },
            {
                title: '国家英文名称',
                dataIndex: 'enName',
            },
            {
                title: '最小国家限重',
                dataIndex: 'minWeight',
            },
            {
                title: '最大国家限重',
                dataIndex: 'maxWeight',
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
        this.setState({
            showMergeModal: true,
        });
    };

    cancelItem = () => {
        PopConfirm('取消合并', '您确定要取消合并吗？', () => {
            const params = {
                data: {
                    keys: this.state.selectedRows.map(item => item.id),
                },
            };
            fetchPost(CHANNEL_TABLE_CANCEL, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.props.loadData();
                        this.setState({
                            selectedRowKeys: [],
                            selectedRows: [],
                        });
                    }
                });
        });
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            loadData,
        } = this.props;
        /**
         * table选中回调
         * 二期先不做审核.
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
                        {...this.props}
                        functionkey="012-000006-000004-007"
                    >
                        <a onClick={this.mergeItem}>
                            批量合并
                        </a>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="012-000006-000004-007"
                    >
                        <a onClick={this.cancelItem}>
                            取消合并
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
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={partList.list}
                        expandedRowRender={this.expandsColumns}
                        pagination={false}
                    />
                    <Pagination
                        pageSizeOptions={['50']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={loadData}
                    />
                </Spin>
                <MergeModal
                    {...this.props}
                    cancel={() => {
                        this.setState({
                            showMergeModal: false,
                        });
                    }}
                    ok={this.props.loadData}
                    keys={this.state.selectedRows.map(item => item.id)}
                    visible={this.state.showMergeModal}
                />
            </div>
        );
    }
}

export default TableList;
