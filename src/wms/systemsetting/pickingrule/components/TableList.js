import React, { Component } from 'react';
import {
    Pagination, Spin, Table, Button, Switch, Icon, Tooltip,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
// import PopConfirm from '../../../../common/components/confirm';
import { SWITCH_RULE, SWITCH_PRIORITY } from '../constants/Api';
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
            title: '优先级名称',
            dataIndex: 'priorityName',
            key: 'priorityName',
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            render: (text, record) => (
                <div>
                    <span>{parseInt(text, 10) === 1 ? '高' : '普通'}</span>
                    <Functions {...this.props} functionkey="012-000005-000009-005">
                        <Tooltip title="点击切换优先级">
                            <Icon className="wms-pickingrule-arrow" type={parseInt(text, 10) === 1 ? 'arrow-down' : 'arrow-up'} onClick={() => this.handlePriorityChange(text, record.key)} />
                        </Tooltip>
                    </Functions>
                </div>
            ),
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (text, record) => (
                <Functions {...this.props} functionkey="012-000005-000009-004">
                    <Switch checked={Boolean(parseInt(text, 10))} onChange={() => this.handleStateChange(text, record.key)} />
                </Functions>
            ),
        },
        {
            title: '操作',
            key: 'option',
            render: (text, record) => (
                <Functions {...this.props} functionkey="012-000005-000009-003">
                    <a onClick={() => { this.props.openModal(record.priorityName); }}>设置</a>
                </Functions>
            ),
        },
    ];

    // 切换状态
    handleStateChange = (text, key) => {
        const { pageNumber, pageData, handleSubmit } = this.props;
        fetchPost(SWITCH_RULE, { data: { key, state: text === '1' ? '0' : '1' } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    handleSubmit(pageNumber, pageData);
                }
            });
    }

    // 切换优先级
    handlePriorityChange = (text, key) => {
        const { pageNumber, pageData, handleSubmit } = this.props;
        fetchPost(SWITCH_PRIORITY, { data: { key, priority: parseInt(text, 10) === 1 ? 2 : 1 } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    handleSubmit(pageNumber, pageData);
                }
            });
    }

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
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000005-000009-002">
                        <Button icon="plus" onClick={() => this.props.openModal()}>新增优先级</Button>
                    </Functions>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                        rowKey={record => record.key}
                    />
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={(pn, pd) => {
                            handleSubmit(pn, pd);
                        }}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
