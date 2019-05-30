import React, { Component } from 'react';
import {
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../../components/Tableitem';

class TableList extends Component {
    columnsMap = [
        {
            type: [10, 20, 30, 40], // 10单品单件 20单品多件(移动) 30多品多件(移动)40多品多件(固定)
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '订单号',
                    dataIndex: 'orderNumber',
                },
                {
                    title: '付款时间',
                    dataIndex: 'timeForPayment',
                },
                {
                    title: '订单状态',
                    dataIndex: 'orderStatus',
                },
                {
                    title: '渠道类别',
                    dataIndex: 'channelCategory',
                },
                {
                    title: '运单号',
                    dataIndex: 'waybillNo',
                },
                {
                    title: '放置容器',
                    dataIndex: 'preventContainer',
                },
                {
                    title: '放置位置编号',
                    dataIndex: 'preventAddress',
                },
            ],
        },
        {
            type: [50], // 样品拣货
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '样品申请编码',
                    dataIndex: 'sampleNumber',
                },
                {
                    title: '拣货状态',
                    dataIndex: 'orderStatus',
                },
                {
                    title: '申请人',
                    dataIndex: 'requester',
                },
                {
                    title: '期望收货日期',
                    dataIndex: 'deliveryTime',
                },
                {
                    title: '申请理由',
                    dataIndex: 'reqeustRemarks',
                },
            ],
        },
    ];

    componentDidMount() {
        this.props.onChangeListener();
    }

    expandsColumns = (record) => {
        const productInfo = record.productInfo;
        return productInfo ? productInfo.map((item, index) => (
            <div style={{ display: 'flex', lineHeight: '39px' }} key={index.toString()}>
                <Tableitem
                    left={80}
                    title="SKU"
                    content={item.sku}
                />
                <Tableitem
                    left={80}
                    right={500}
                    title="中文名称"
                    content={item.name}
                />
                <Tableitem
                    left={80}
                    title="数量"
                    content={item.quantity}
                />
            </div>
        )) : null;
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        const tableTitle = (
            <div style={{ display: 'flex' }} className="margin-ss-bottom">
                <Tableitem
                    left="auto"
                    title="发货仓库"
                    content={partList.warehouseName}
                />
                <Tableitem
                    left={80}
                    title="订单类型"
                    content={partList.orderType}
                />
                <Tableitem
                    left={80}
                    title="拣货量"
                    content={partList.pickingNumber}
                />
                {partList.seedTruckNumber ? (
                    <Tableitem
                        left={80}
                        title="播种车编号"
                        content={partList.seedTruckNumber}
                    />
                ) : null}
                {partList.carNumber ? (
                    <Tableitem
                        left={80}
                        title="大车编号"
                        content={partList.carNumber}
                    />
                ) : null}
            </div>
        );
        const { taskType } = partList;
        const item = this.columnsMap.filter(t => t.type.indexOf(taskType) !== -1)[0];
        const columns = item ? item.columns.filter((t) => {
            if (t.title === '放置容器') { // 移动
                return taskType === 30 || taskType === 10;
            }
            if (t.title === '放置位置编号') { // 固定
                return taskType === 40;
            }
            return true;
        }) : [];
        return (
            <div className="breadcrumb padding-sm margin-ss-top wms-expanded-table">
                {tableTitle}
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={columns}
                        dataSource={partList.list}
                        pagination={false}
                        expandedRowRender={this.expandsColumns}
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
