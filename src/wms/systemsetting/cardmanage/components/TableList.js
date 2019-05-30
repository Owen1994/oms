import React, { Component } from 'react';
import {
    Pagination, Spin, Table, Menu, Dropdown, Button, Icon, message,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import PopConfirm from '../../../../common/components/confirm';
import { DELETE } from '../constants/Api';
import PrintSimpleBarcodeModal from '../../../common/components/modal/PrintSimpleBarcodeModal';
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
            title: '卡板编号',
            dataIndex: 'cardNumber',
            key: 'cardNumber',
        },
        {
            title: '卡板状态',
            dataIndex: 'cardState',
            key: 'cardState',
        },
        {
            title: '操作',
            key: 'option',
            render: (text, record) => (
                <Functions {...this.props} functionkey="012-000005-000005-003">
                    <a
                        onClick={() => PopConfirm('删除', '您确定要删除吗？', () => this.deleteData([record.key.toString()]))}
                    >删除
                    </a>
                </Functions>
            ),
        },
    ];

    state = {
        selectedRowKeys: [],
        showPrintModal: false,
        labels: [],
    };

    // 单项删除
    deleteData = (keys) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(DELETE, { data: { keys } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.handleSubmit(pageNumber, pageData);
                    this.setState({
                        selectedRowKeys: [],
                    });
                }
            });
    }

    // 批量删除
    deleteDataes = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys < 1) {
            return message.info('未选中数据！');
        }
        PopConfirm('批量删除', '您确定要批量删除选中项数据吗？', () => this.deleteData(selectedRowKeys));
    }

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            handleSubmit,
        } = this.props;
        // 多选项配置
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    labels: selectedRows.map(item => item.cardNumber),

                });
            },
            hideDefaultSelections: true,
        };
        // 下拉列表
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="012-000005-000005-003">
                        <a onClick={this.deleteDataes}>
                            批量删除
                        </a>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="012-000005-000005-004">
                        <a onClick={() => {
                            this.setState({
                                showPrintModal: true,
                            });
                        }}
                        >
                            批量打印
                        </a>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <div className="wms-addBtn">
                    <Dropdown overlay={menu}>
                        <Button style={{ float: 'left', marginLeft: 0 }}>批量操作<Icon type="down" /></Button>
                    </Dropdown>
                    <Functions {...this.props} functionkey="012-000005-000005-002">
                        <Button icon="plus" onClick={() => this.props.openModal()}>新增卡板</Button>
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
                        rowSelection={rowSelection}
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
                            this.setState({
                                selectedRowKeys: [],
                            });
                        }}
                    />
                </Spin>
                <PrintSimpleBarcodeModal
                    title="打印卡板编码"
                    visible={this.state.showPrintModal}
                    labels={this.state.labels}
                    cancel={() => {
                        this.setState({
                            showPrintModal: false,
                        });
                    }}
                />
            </div>
        );
    }
}

export default TableList;
