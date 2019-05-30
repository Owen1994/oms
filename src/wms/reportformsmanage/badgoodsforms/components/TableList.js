import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    // Tooltip,
    Button,
} from 'antd';
import PopConfirm from '../../../../common/components/confirm';
import {
    fetchPost,
    downlodFile,
} from '../../../../util/fetch';
import {
    EXPORT_DATA,
} from '../constants/Api';
import Functions from '../../../../components/functions';
import { IN_ERROR_TYPE, RETURN_ERROR_TYPE, WAREHOUSE_ERROR_TYPE } from '../constants';
import Tableitem from '../../../../components/Tableitem';

export default class TableList extends React.Component {
    columnsList = [
        {
            type: IN_ERROR_TYPE,
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '采购信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                title="日期"
                                content={record.date}
                            />
                            <Tableitem
                                left={80}
                                title="采购单号"
                                content={record.purchaseNumber}
                            />
                            <Tableitem
                                left={80}
                                title="供应商"
                                content={record.supplier}
                            />
                            <Tableitem
                                left={80}
                                title="采购员"
                                content={record.purchaser}
                            />
                        </div>
                    ),
                },
                {
                    title: '产品信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="SKU"
                                content={record.sku}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="中文名称"
                                content={record.cnName}
                            />
                        </div>
                    ),
                },
                {
                    title: '不合格数量',
                    dataIndex: 'unqualifiedQuantity',
                    width: 80,
                },
                {
                    title: '质检不合格原因',
                    dataIndex: 'qualityInspectionReason',
                    width: 80,
                },
                {
                    title: '对图员',
                    dataIndex: 'comparePersonnel',
                    width: 80,
                },
                {
                    title: '质检员',
                    dataIndex: 'qualityInspector',
                    width: 80,
                },
                {
                    title: '质检时间',
                    dataIndex: 'qualityInspectionTime',
                    width: 80,
                },
                {
                    title: '处理状态',
                    dataIndex: 'manageStates',
                    width: 80,
                },
                {
                    title: '处理时间',
                    dataIndex: 'processingTime',
                    width: 80,
                },
                {
                    title: '系统不良品时长',
                    dataIndex: 'systemBadGoodsDuration',
                    width: 80,
                },
            ],
        },
        {
            type: WAREHOUSE_ERROR_TYPE,
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '采购信息',
                    width: 180,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="日期"
                                content={record.date}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="采购单号"
                                content={record.purchaseNumber}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="采购员"
                                content={record.purchaser}
                            />
                        </div>
                    ),
                },
                {
                    title: '产品信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="SKU"
                                content={record.sku}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="中文名称"
                                content={record.cnName}
                            />
                        </div>
                    ),
                },
                {
                    title: '不合格信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={120}
                                title="不合格数量"
                                content={record.unqualifiedQuantity}
                            />
                            <Tableitem
                                left={120}
                                title="对图员"
                                content={record.comparePersonnel}
                            />
                            <Tableitem
                                left={120}
                                title="质检员"
                                content={record.qualityInspector}
                            />
                            <Tableitem
                                left={120}
                                title="入库时间"
                                content={record.inTime}
                            />
                            <Tableitem
                                left={120}
                                title="出库时间"
                                content={record.outTime}
                            />
                        </div>
                    ),
                },
                {
                    title: '仓退原因',
                    dataIndex: 'warehouseReturnReason',
                    width: 80,
                },
                {
                    title: '处理时间',
                    dataIndex: 'processingTime',
                    width: 80,
                },
                {
                    title: '状态',
                    dataIndex: 'manageStates',
                    width: 80,
                },
                {
                    title: '仓库处理人',
                    dataIndex: 'warehouseHandler',
                    width: 80,
                },
                {
                    title: '系统不良品时长',
                    dataIndex: 'systemBadGoodsDuration',
                    width: 80,
                },
            ],
        },
        {
            type: RETURN_ERROR_TYPE,
            columns: [
                {
                    title: '序号',
                    key: 'index',
                    width: 60,
                    render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                },
                {
                    title: '采购信息',
                    width: 180,
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="日期"
                                content={record.date}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="订单号"
                                content={record.orderNumber}
                            />
                            <Tableitem
                                left={80}
                                right={80}
                                title="采购员"
                                content={record.purchaser}
                            />
                        </div>
                    ),
                },
                {
                    title: '产品信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={80}
                                right={80}
                                title="SKU"
                                content={record.sku}
                            />
                            <Tableitem
                                left={80}
                                title="中文名称"
                                content={record.cnName}
                            />
                        </div>
                    ),
                },
                {
                    title: '不合格信息',
                    render: (text, record) => (
                        <div>
                            <Tableitem
                                left={120}
                                title="不合格数量"
                                content={record.unqualifiedQuantity}
                            />
                            <Tableitem
                                left={120}
                                title="对图员"
                                content={record.comparePersonnel}
                            />
                            <Tableitem
                                left={120}
                                title="质检员"
                                content={record.qualityInspector}
                            />
                            <Tableitem
                                left={120}
                                title="入库时间"
                                content={record.inTime}
                            />
                            <Tableitem
                                left={120}
                                title="出库时间"
                                content={record.outTime}
                            />
                        </div>
                    ),
                },
                {
                    title: '退件原因',
                    dataIndex: 'returnReason',
                    width: 80,
                },
                {
                    title: '处理时间',
                    dataIndex: 'processingTime',
                    width: 80,
                },
                {
                    title: '状态',
                    dataIndex: 'manageStates',
                    width: 80,
                },
                {
                    title: '仓库处理人',
                    dataIndex: 'warehouseHandler',
                    width: 80,
                },
                {
                    title: '系统不良品时长',
                    dataIndex: 'systemBadGoodsDuration',
                    width: 80,
                },
            ],
        },
    ];

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList();
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_DATA, {
            data: {
                ...values,
                rangeTime: rangeTime && rangeTime.map(t => t.valueOf()),
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
            pageNumber,
            pageData,
            loadingState,
        } = this.props;
        const errorType = this.props.form.getFieldValue('errorType');
        const filterData = this.columnsList.filter(t => t.type === errorType)[0];
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000010-000003-002">
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
                            columns={filterData && filterData.columns}
                            dataSource={partList.list}
                            pagination={false}
                            rowKey={record => record.key}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination
                        className="pull-right"
                        showTotal={total2 => `共 ${total2} 条`}
                        showSizeChanger // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={partList.total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={this.props.onChangeListener}
                        size="small"
                        pageSizeOptions={['100']}
                    />
                </div>
            </div>
        );
    }
}
