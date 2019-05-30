import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../components/Tableitem';
import Functions from '../../../../components/functions';
import { downlodFile, fetchPost } from '../../../../util/fetch';
import { EXPORT_OUTBOUND_SPECIALCASE } from '../constants/Api';


class TableList extends Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => (
                (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
            ),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
        },
        {
            title: '异常单据',
            dataIndex: 'exceptionCoding',
        },
        {
            title: '异常类型',
            dataIndex: 'exceptionType',
        },
        {
            title: '订单类型',
            dataIndex: 'orderType',
        },
    ];

    expandsColumns = (recode) => {
        const data = recode.errorInfo || [];
        const columns = [
            {
                title: 'SKU',
                dataIndex: 'sku',
            },
            {
                title: '名称',
                dataIndex: 'name',
            },
            {
                title: '数量',
                dataIndex: 'quantity',
            },
            {
                title: '拣货储位',
                dataIndex: 'pickingStorage',
            },
            {
                title: '处理状态',
                dataIndex: 'manageStates',
            },
            {
                title: '关联操作记录',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={100}
                            right={120}
                            title="异常生成人"
                            content={record.exceptionCreator}
                        />
                        <Tableitem
                            left={100}
                            right={120}
                            title="异常生成时间"
                            content={record.exceptionCreateTime}
                        />
                        <Tableitem
                            left={100}
                            right={120}
                            title="处理人"
                            content={record.processedBy}
                        />
                        <Tableitem
                            left={100}
                            right={120}
                            title="处理时间"
                            content={record.processingTime}
                        />
                    </div>
                ),
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

    errorExport = () => {
        const values = this.props.form.getFieldsValue();
        const { queryTimeline } = values;
        fetchPost(EXPORT_OUTBOUND_SPECIALCASE, {
            data: {
                ...values,
                queryTimeline: queryTimeline && queryTimeline.map(t => t.valueOf()),
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
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
            <div className="breadcrumb padding-sm margin-sm-top wms-expanded-table">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000003-000003-002">
                        <Button
                            icon="upload"
                            onClick={this.errorExport}
                        >
                            导出
                        </Button>
                    </Functions>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        expandedRowRender={this.expandsColumns}
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
                        onChange={onChangeListener}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
