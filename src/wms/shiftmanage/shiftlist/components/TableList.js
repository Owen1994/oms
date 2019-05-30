import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Functions from '../../../../components/functions';
import CreateShiftModal from './model/CreateShiftModal';
import PopConfirm from '../../../../common/components/confirm';
import { downlodFile, fetchPost } from '../../../../util/fetch';
import { CANCEL_MOVE_TASK, EXPORT_MOVE_TASKLIST } from '../constants/Api';

class TableList extends Component {
    state = {
        showCreateShiftModal: false,
    };

    columns = [
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
            width: 100,
        },
        {
            title: '移位编码',
            dataIndex: 'shiftNumber',
            width: 100,
        },
        {
            title: '移位类型',
            dataIndex: 'shiftType',
            width: 100,
        },
        {
            title: '移位状态',
            dataIndex: 'shiftStatus',
            width: 100,
        },
        {
            title: '创建时间',
            dataIndex: 'creator',
            width: 100,
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 100,
        },

        {
            title: '操作',
            width: 100,
            render: (text, record) => (
                record.shiftStatus === '已完成' || record.shiftStatus === '取消' ? null : (
                    <Functions {...this.props} functionkey="012-000009-000001-002">
                        <a onClick={() => this.cancel(record.key)}>
                            取消
                        </a>
                    </Functions>
                )
            ),
        },
    ];


    expandsColumns = (recode) => {
        const columns = [
            {
                title: '序号',
                key: 'index',
                width: 60,
                render: (text, record, index) => <div>{index + 1}</div>,
            },
            {
                title: 'SKU',
                width: 80,
                dataIndex: 'sku',
            },
            {
                title: '中文名称',
                dataIndex: 'cnName',
            },
            {
                title: '移位数量',
                width: 80,
                dataIndex: 'number',
            },
            {
                title: '原始储位',
                width: 120,
                dataIndex: 'originalStorage',
            },
            {
                title: '目标储位',
                width: 120,
                dataIndex: 'shiftStorage',
            },
            {
                title: '操作人',
                width: 100,
                dataIndex: 'operator',
            },
            {
                title: '完成时间',
                width: 150,
                dataIndex: 'overTime',
            },
        ];

        return (
            <Table
                size="small"
                columns={columns}
                dataSource={recode.skuInfo}
                pagination={false}
            />
        );
    };

    cancel = (key) => {
        PopConfirm('取消', '确定取消吗?', () => {
            fetchPost(CANCEL_MOVE_TASK, {
                data: {
                    key,
                },
            }, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.props.onChangeListener();
                    }
                });
        });
    };

    uploadExcel = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    warehouseCode,
                    shiftTime,
                } = values;
                fetchPost(EXPORT_MOVE_TASKLIST, {
                    data: {
                        ...values,
                        warehouseCode: warehouseCode && warehouseCode[0],
                        shiftTime: shiftTime && shiftTime.map(item => item.valueOf()),
                    },
                }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            downlodFile(result.data.fileUrl);
                        }
                    });
            }
        });
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top wms-expanded-table">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div className="wms-addBtn">
                        <Functions {...this.props} functionkey="012-000009-000001-004">
                            <Button
                                icon="plus"
                                onClick={() => {
                                    this.setState({
                                        showCreateShiftModal: true,
                                    });
                                }}
                            >
                                创建移位
                            </Button>
                        </Functions>
                        <Functions {...this.props} functionkey="012-000009-000001-003">
                            <Button
                                icon="upload"
                                onClick={this.uploadExcel}
                            >
                                导出Excel
                            </Button>
                        </Functions>
                    </div>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        expandedRowRender={this.expandsColumns}
                        dataSource={partList.list}
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
                        onChange={onChangeListener}
                    />
                </Spin>
                <CreateShiftModal
                    cancel={() => this.setState({
                        showCreateShiftModal: false,
                    })}
                    ok={() => onChangeListener(pageNumber, pageData)}
                    visible={this.state.showCreateShiftModal}
                />
            </div>
        );
    }
}

export default TableList;
