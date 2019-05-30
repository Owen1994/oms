import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    // Tooltip,
    Button,
} from 'antd';
import PopConfirm from '../../../../../common/components/confirm';
import {
    fetchPost,
    downlodFile,
} from '../../../../../util/fetch';
import {
    EXPORT_INVENTORY,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_INVENTORY_LIST } from '../../constants';

export default class TableList extends React.Component {
    columnsList = [
        {
            type: '10',
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouseName',
                    width: 100,
                },
                {
                    title: '盘点结果',
                    dataIndex: 'countingResults',
                    width: 100,
                },
                {
                    title: '盘点SKU总款数',
                    dataIndex: 'skuStyles',
                    width: 100,
                },
                {
                    title: '盘盈',
                    dataIndex: 'inventoryProfit',
                    width: 100,
                },
                {
                    title: '盘亏',
                    dataIndex: 'inventoryLoss',
                    width: 100,
                },
                {
                    title: '总差异',
                    dataIndex: 'totalDifference',
                    width: 100,
                },
                {
                    title: 'SKU准确率',
                    dataIndex: 'skuAccuracy',
                    width: 100,
                },
            ],
        },
        {
            type: '20',
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouseName',
                    width: 100,
                },
                {
                    title: '盘点结果',
                    dataIndex: 'countingResults',
                    width: 100,
                },
                {
                    title: '盘点总数',
                    dataIndex: 'inventoryPcsTotal',
                    width: 100,
                },
                {
                    title: '盘盈',
                    dataIndex: 'inventoryProfit',
                    width: 100,
                },
                {
                    title: '盘亏',
                    dataIndex: 'inventoryLoss',
                    width: 100,
                },
                {
                    title: '总差异',
                    dataIndex: 'totalDifference',
                    width: 100,
                },
                {
                    title: '库存准确率',
                    dataIndex: 'stockAccuracy',
                    width: 100,
                },
            ],
        },
        {
            type: '30',
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '仓库名称',
                    dataIndex: 'warehouseName',
                    width: 100,
                },
                {
                    title: '盘点结果',
                    dataIndex: 'countingResults',
                    width: 100,
                },
                {
                    title: '盘点总金额',
                    dataIndex: 'inventoryAmountTotal',
                    width: 100,
                },
                {
                    title: '盘盈金额',
                    dataIndex: 'inventoryProfitAmount',
                    width: 100,
                },
                {
                    title: '盘亏金额',
                    dataIndex: 'inventoryLossAmount',
                    width: 100,
                },
                {
                    title: '总金额差',
                    dataIndex: 'totalDifference',
                    width: 100,
                },
                {
                    title: '盘点金额准确率',
                    dataIndex: 'amountAccuracy',
                    width: 100,
                },
            ],
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_INVENTORY_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_INVENTORY, {
            data: {
                ...values,
                rangeTime: rangeTime && rangeTime.map(t => t.valueOf()),
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
            }
        });
    }

    render() {
        const {
            partList = { list: [], total: 0 },
            pageNumber,
            pageData,
            loadingState,
        } = this.props;
        const inventoryResult = this.props.form.getFieldValue('inventoryResult');
        const columns = this.columnsList.filter(t => t.type === inventoryResult)[0].columns;
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000010-000002-010">
                        <Button
                            icon="upload"
                            onClick={() => PopConfirm('导出Excel', '确定导出当前搜索条件所有数据吗？', () => this.exportData())}
                        >
                            导出Excel
                        </Button>
                    </Functions>
                </div>
                <div className="wms-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={columns}
                            dataSource={partList.list}
                            pagination={false}
                            rowKey={record => record.key}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination
                        className="pull-right"
                        showTotal={t => `共 ${t} 条`}
                        showSizeChanger // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={partList.total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={this.props.onChangeListener}
                        // size="small"
                        pageSizeOptions={['100']}
                    />
                </div>
            </div>
        );
    }
}
