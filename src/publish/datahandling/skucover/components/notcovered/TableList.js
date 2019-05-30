import React from 'react';
import {
    Button,
    Pagination,
    Spin,
    Table,
} from 'antd';
import Functions from '@/components/functions';

/**
 * 我收到的消息列表
 */
export default class TableList extends React.Component {

    state = {
        selectedRowKeys: [],
        selectedRows: [],
    };

    /**
     * 列表头标签
     * @type {[]}
     */
    columns = [
        {
            title: 'SKU',
            dataIndex: 'skuCode',
            width: 120,
        },
        {
            title: 'SKU状态',
            dataIndex: 'todayState',
            width: 120,
        },
        {
            title: '未覆盖平台',
            dataIndex: 'platform',
            width: 120,
        },
        {
            title: '未覆盖站点',
            dataIndex: 'siteCode',
            width: 200,
        },
        {
            title: '最新更新时间',
            dataIndex: 'modifyDate',
            width: 200,
        }];


    showExportModal = () => {
        this.props.showExportModal(this.state.selectedRows);
    };

    render() {
        const {
            list,
            total,
        } = this.props.NotListData;

        const {
            pageNumber,
            pageSize,
            loadData,
        } = this.props;

        if (this.props.NotLoading) {
            this.state.selectedRowKeys = [];
            this.state.selectedRows = [];
        }

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


        return (
            <div className="yks-erp-table">
                <Spin spinning={this.props.NotLoading} delay={500} tip="Loading...">
                    <div className="top-container">
                        <div className="top-right-wrap">
                            <Functions
                                {...this.props}
                                functionkey="008-000006-000003-005"
                            >
                                <Button
                                    icon="upload"
                                    onClick={this.showExportModal}
                                >
                                    数据导出
                                </Button>
                            </Functions>
                        </div>
                    </div>
                    <Table
                        rowKey={record => record.id}
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
                        pageSizeOptions={['20', '30', '50', '100', '150', '200']}
                        showSizeChanger
                        defaultPageSize={20}
                        onShowSizeChange={loadData}
                    />
                </Spin>

            </div>
        );
    }
}
