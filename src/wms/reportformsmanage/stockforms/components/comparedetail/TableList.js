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
    EXPORT_COMPARE_DETAIL_LIST,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_COMPARE_DETAIL_LIST } from '../../constants';
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
            title: '对图信息',
            width: 220,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
                        title="对图日期"
                        content={record.compareTime}
                    />
                    <Tableitem
                        left={80}
                        title="批次号"
                        content={record.batchNumber}
                    />
                    <Tableitem
                        left={80}
                        title="卡板号"
                        content={record.cardNumber}
                    />
                    <Tableitem
                        left={80}
                        title="采购单号"
                        content={record.purchaseNumber}
                    />
                </div>
            ),
        },
        {
            title: '产品信息',
            width: 220,
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
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
            title: '采购数量',
            dataIndex: 'purchaseQuantity',
            width: 80,
        },
        {
            title: '到货数量',
            dataIndex: 'arrivalQuantity',
            width: 80,
        },
        {
            title: '是否有误',
            dataIndex: 'isError',
            width: 80,
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            width: 100,
        },
        {
            title: '对图员',
            dataIndex: 'comparePersonnel',
            width: 80,
        },
        {
            title: '采购员',
            dataIndex: 'buyer',
            width: 80,
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_COMPARE_DETAIL_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_COMPARE_DETAIL_LIST, {
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
                        functionkey={rangeTime ? '012-000010-000001-006' : '012-000010-000001-008'}
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
                        pageSizeOptions={['100']}
                    />
                </div>
            </div>
        );
    }
}
