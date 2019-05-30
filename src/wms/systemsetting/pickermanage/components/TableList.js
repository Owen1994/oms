import React, { Component } from 'react';
import {
    Pagination, Spin, Table,
} from 'antd';
import Functions from '@/components/functions';

class TableList extends Component {
    columns = [
        {
            title: '序号',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
            key: 'warehouseName',
        },
        {
            title: '工号',
            dataIndex: 'jobNumber',
            key: 'jobNumber',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所属拣货组',
            dataIndex: 'affiliatedPickingGroup',
            key: 'affiliatedPickingGroup',
        },
        {
            title: '操作',
            key: 'option',
            render: (text, record) => (
                <Functions {...this.props} functionkey="012-000005-000003-002">
                    <a onClick={() => this.props.onSetting(record)}>设置</a>
                </Functions>
            ),
        },
    ];


    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            handleSubmit,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={handleSubmit}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
