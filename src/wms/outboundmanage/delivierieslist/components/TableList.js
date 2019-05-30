import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../components/Tableitem';

class TableList extends Component {
    columns = [
        {
            title: '订单号',
            dataIndex: 'orderNumber',
        },
        {
            title: '发货仓库',
            dataIndex: 'shippingWarehouse',
        },
        {
            title: '波次号',
            dataIndex: 'waveNumber',
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
    ];

    expandsColumns = (recode) => {
        const columns = [
            {
                title: '产品信息',
                width: 520,
                dataIndex: 'productInformation',
                render: text => (
                    text ? text.map((item, index) => (
                        <div style={{ display: 'flex' }} key={index.toString()}>
                            <Tableitem
                                right="auto"
                                title="SKU"
                                content={item.sku}
                            />
                            <Tableitem
                                left={100}
                                right="auto"
                                title="中文名称"
                                content={item.name}
                            />
                            <Tableitem
                                right="auto"
                                title="数量"
                                content={item.quantity}
                            />
                        </div>
                    )) : null
                ),
            },
            {
                title: '订单信息',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            right="auto"
                            title="订单类型"
                            content={record.orderType}
                        />
                        <Tableitem
                            right="auto"
                            title="平台"
                            content={record.platform}
                        />
                    </div>
                ),
            },
            {
                title: '金额重量',
                render: (text, record) => (
                    <div>
                        <Tableitem
                            left={100}
                            right={60}
                            title="订单总额"
                            content={record.orderTotal}
                        />
                        <Tableitem
                            left={100}
                            right={60}
                            title="包裹重量"
                            content={record.packweight}
                        />
                        <Tableitem
                            left={100}
                            right={60}
                            title="订单理论重量"
                            content={record.collectingLoanWeight}
                        />
                    </div>
                ),
            },
            {
                title: '买家信息',
                render: record => (
                    <div>
                        <Tableitem
                            left={100}
                            right="auto"
                            title="买家账号"
                            content={record.buyerAccount}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="买家姓名"
                            content={record.customerName}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="买家电话"
                            content={record.customerPhone}
                        />
                        <Tableitem
                            left={100}
                            right="auto"
                            title="买家地址"
                            content={record.buyerAddress}
                        />
                    </div>
                ),
            },
        ];

        return (
            <Table
                size="small"
                columns={columns}
                dataSource={[recode]}
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
                    <div className="wms-addBtn display-none">
                        <Button
                            icon="upload"
                        >
                            预报数据导出
                        </Button>
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
            </div>
        );
    }
}

export default TableList;
