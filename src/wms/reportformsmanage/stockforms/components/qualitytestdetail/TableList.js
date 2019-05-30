import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Button,
} from 'antd';
import PopConfirm from '../../../../../common/components/confirm';
import {
    fetchPost,
    downlodFile,
} from '../../../../../util/fetch';
import {
    EXPORT_QUALITYTEST_DETAIL_LIST,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_QUALITYTEST_DETAIL_LIST } from '../../constants';
import Tableitem from '../../../../../components/Tableitem';

export default class TableList extends React.Component {
    columns = [
        {
            title: '序号',
            key: 'index',
            width: 50,
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '采购信息',
            width: 180,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={60}
                        right={100}
                        title="仓库名称"
                        content={record.warehouseName}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="批次号"
                        content={record.batchNumber}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="卡板号"
                        content={record.cardNumber}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="采购单号"
                        content={record.pond}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="供应商"
                        content={record.supplier}
                    />
                </div>
            ),
        },
        {
            title: '产品信息',
            width: 180,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={60}
                        right={100}
                        title="SKU"
                        content={record.sku}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="中文名称"
                        content={record.cnName}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="优先级"
                        content={record.priority}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="是否裸装"
                        content={record.isBare}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="包材规格"
                        content={record.packageSpecification}
                    />
                    <Tableitem
                        left={60}
                        right={100}
                        title="包材数量"
                        content={record.packageNumber}
                    />
                </div>
            ),
        },
        {
            title: '采购数量',
            dataIndex: 'purchaseQuantity',
            width: 50,
        },
        {
            title: '到货数量',
            dataIndex: 'arrivalQuantity',
            width: 50,
        },
        {
            title: '实际收货数量',
            dataIndex: 'actualReceiptQuantity',
            width: 60,
        },
        {
            title: '总合格量',
            dataIndex: 'totalQualifiedAmount',
            width: 50,
        },
        {
            title: '合格量',
            dataIndex: 'qualifiedAmount',
            width: 50,
        },
        {
            title: '多数合格',
            dataIndex: 'moreQualified',
            width: 50,
        },
        {
            title: '总不合格量',
            dataIndex: 'totalUnqualifiedAmount',
            width: 60,
        },
        {
            title: '不合格量',
            dataIndex: 'unqualifiedAmount',
            width: 50,
        },
        {
            title: '多数不合格',
            dataIndex: 'moreUnqualified',
            width: 60,
        },
        {
            title: '质检信息',
            width: 180,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
                        right={80}
                        title="不合格原因"
                        content={record.reasonForFailure}
                    />
                    <Tableitem
                        left={80}
                        right={80}
                        title="备注"
                        content={record.remarks}
                    />
                    <Tableitem
                        left={80}
                        right={80}
                        title="质检日期"
                        content={record.qualityInspectionDate}
                    />
                    <Tableitem
                        left={80}
                        right={80}
                        title="对图员"
                        content={record.graphicPlayer}
                    />
                    <Tableitem
                        left={80}
                        right={80}
                        title="质检员"
                        content={record.qualityInspector}
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
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_QUALITYTEST_DETAIL_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_QUALITYTEST_DETAIL_LIST, {
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
            partList = { list: [], total: 0 },
            pageNumber,
            pageData,
            loadingState,
        } = this.props;
        const { rangeTime } = this.props;
        return (
            <div className="wms-tablelist breadcrumb wms-ant-table">
                <div className="wms-addBtn">
                    <Functions
                        {...this.props}
                        functionkey={rangeTime ? '012-000010-000001-010' : '012-000010-000001-012'}
                    >
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
                            columns={this.columns}
                            dataSource={partList.list}
                            pagination={false}
                            rowKey={record => record.dataIndex}
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
                        // size="small"
                        pageSizeOptions={['60']}
                    />
                </div>
            </div>
        );
    }
}
