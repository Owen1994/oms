import React, { Component } from 'react';
import {
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../components/Tableitem';

const renderContent = (text, record) => {
    const obj = {
        children: text,
        props: {},
    };
    obj.props.rowSpan = record.rowSpanSize || 0;
    return obj;
};

class TableList extends Component {
    columns = [
        {
            title: '序号',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '发货仓库',
            dataIndex: 'shippingWarehouse',
        },
        {
            title: '退货批次号',
            dataIndex: 'returnBatchNumber',
        },
        {
            title: '退货类型',
            dataIndex: 'backType',
        },
    ];

    expandsColumns = (recode) => {
        const data = recode.orderInfo;
        const columns = [
            {
                title: '退货信息',
                render: (text, record) => renderContent(
                    (
                        <div>
                            <Tableitem
                                left={100}
                                right="auto"
                                title="订单号"
                                content={record.orderNumber}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="运单号"
                                content={record.waybillNo}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="物流渠道"
                                content={record.logisticsChannel}
                            />
                        </div>
                    ), record,
                ),
            },
            {
                title: '产品信息',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={100}
                            right="auto"
                            title="SKU"
                            content={record.sku}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="中文名称"
                            content={record.cnName}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="数量"
                            content={record.quantity}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="拣货储位"
                            content={record.pickingStorage}
                        />
                    </div>
                ),
            },
            {
                title: '质检结果',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={100}
                            right="auto"
                            title="实际收货数量"
                            content={record.actualReceiptQuantity}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="合格量"
                            content={record.qualifiedAmount}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="不合格量"
                            content={record.unqualifiedAmount}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="不合格原因"
                            content={record.reason}
                        />
                    </div>
                ),
            },
            {
                title: '操作记录',
                render: (text, record) => renderContent(
                    (
                        <div>
                            <Tableitem
                                left={100}
                                right="auto"
                                title="退件扫描员"
                                content={record.returnScanner}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="扫描时间"
                                content={record.scanTime}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="质检员"
                                content={record.qualityInspector}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="质检时间"
                                content={record.qualityInspectionTime}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="入库员"
                                content={record.sentryClerk}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="入库时间"
                                content={record.storageTime}
                            />
                        </div>
                    ), record,
                ),
            },
        ];

        return (
            <Table
                columns={columns}
                size="small"
                dataSource={data}
                pagination={false}
            />
        );
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
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        expandedRowRender={this.expandsColumns}
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
                        onChange={onChangeListener}
                    />
                </Spin>
            </div>
        );
    }
}

export default TableList;
