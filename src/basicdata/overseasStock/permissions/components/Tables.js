import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Menu,
    Dropdown,
    Button,
    Icon,
    message,
} from 'antd';
import { fetchPost } from '@/util/fetch';
import PopConfirm from '../../../../common/components/confirm';
import { DELETE_DATA_PERMISSION } from '../constants/Apis';
import Functions from '../../../../components/functions';


export default class Tables extends React.Component {
    state = {
        selectedRowKeys: [],
    }

    columns = [
        {
            title: '人员名称',
            dataIndex: 'userName',
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
        },
        {
            title: '创建时间',
            dataIndex: 'createDate',

        },
        // {
        //     title: '最后编辑时间',
        //     dataIndex: 'modifyDate',
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (<div><Functions {...this.props} functionkey="011-000002-000003-000001-002"><span className="text-warning" onClick={() => PopConfirm('是否确认要删除？', '', () => this.onConfirm(record))}>删除</span></Functions></div>
            ),
        },
    ];

    // 删除
    onConfirm = (record) => {
        let keyArr = this.state.selectedRowKeys;
        if (record.id === null || record.id === undefined) {
            if (keyArr.length === 0) {
                message.warning('请先选择数据！');
                return false;
            }
        }
        keyArr = record.id ? [record.id] : keyArr;
        fetchPost(DELETE_DATA_PERMISSION, { data: { id: keyArr } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.onSearch();
                }
            });
    }

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        const total = data.total;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };

        const menu = (
            <Menu>
                <Menu.Item>
                    <span
                        onClick={
                            () => {
                                PopConfirm('是否确认要删除？', '', () => this.onConfirm({ purchaseId: null }));
                            }
                        }
                    >删除
                    </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-left">
                        <Functions {...this.props} functionkey="011-000002-000003-000001-002">
                            <Dropdown overlay={menu}>
                                <Button>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                        </Functions>
                    </div>
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="011-000002-000003-000001-003">
                            <Button onClick={() => this.props.showAddUpdateModal()} className="margin-ss-right">
                                <Icon type="plus" />
                                新增数据权限
                            </Button>
                        </Functions>
                    </div>
                </div>

                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            size="small"
                            bordered
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={num => `共 ${num} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageData}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
