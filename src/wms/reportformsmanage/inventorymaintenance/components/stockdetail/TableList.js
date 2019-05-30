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
    EXPORT_STOCK_DETAIL,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_STOCK_DETAIL_LIST } from '../../constants';
import Tableitem from '../../../../../components/Tableitem';

export default class TableList extends React.Component {
    columns = [
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
            title: '批次号',
            dataIndex: 'batchNumber',
            width: 100,
        },
        {
            title: '采购单号',
            dataIndex: 'purchaseNumber',
            width: 100,
        },
        {
            title: '入库单号',
            dataIndex: 'inboundOrderNumber',
            width: 100,
        },
        {
            title: '产品信息',
            width: 220,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right={100}
                        title="是否是包材"
                        content={record.isPackage}
                    />
                    <Tableitem
                        left={100}
                        right={100}
                        title="SKU"
                        content={record.sku}
                    />
                    <Tableitem
                        left={100}
                        right={100}
                        title="中文名称"
                        content={record.cnName}
                    />
                    <Tableitem
                        left={100}
                        right={100}
                        title="储位"
                        content={record.bin}
                    />
                </div>
            ),
        },
        {
            title: '入库信息',
            width: 220,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
                        right={100}
                        title="入库量"
                        content={record.storageQuantity}
                    />
                    <Tableitem
                        left={80}
                        right={100}
                        title="供应商"
                        content={record.supplier}
                    />
                    <Tableitem
                        left={80}
                        right={100}
                        title="入库时间"
                        content={record.storageTime}
                    />
                    <Tableitem
                        left={80}
                        right={100}
                        title="入库类型"
                        content={record.type}
                    />
                </div>
            ),
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            width: 100,
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            width: 100,
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_STOCK_DETAIL_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_STOCK_DETAIL, {
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
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000010-000002-004">
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
