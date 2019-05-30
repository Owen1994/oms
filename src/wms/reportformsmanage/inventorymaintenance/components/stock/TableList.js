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
    EXPORT_STOCK,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_STOCK_LIST } from '../../constants';

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
            dataIndex: 'warehouse',
            width: 100,
        },
        {
            title: '入库类型',
            dataIndex: 'type',
            width: 100,
        },
        {
            title: '入库SKU款数',
            dataIndex: 'skuStyles',
            width: 100,
        },
        {
            title: '入库商品PCS数',
            dataIndex: 'pcs',
            width: 100,
        },
        {
            title: '退件不良SKU款数',
            dataIndex: 'returnSku',
            width: 100,
        },
        {
            title: '退件不良PCS数',
            dataIndex: 'returnPcs',
            width: 100,
        },
        {
            title: '入库箱数',
            dataIndex: 'box',
            width: 100,
        },
        {
            title: '统计时间',
            dataIndex: 'statisticalTime',
            width: 100,
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_STOCK_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_STOCK, {
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
        const storageType = this.props.form.getFieldValue('storageType');
        const columns = this.columns.filter((t) => {
            if (['box'].indexOf(t.dataIndex) !== -1 && storageType !== 10) { // 采购入库
                // 只有storageType=1的时候才显示入库箱数.
                return false;
            }
            if (['returnPcs', 'returnSku'].indexOf(t.dataIndex) !== -1 && storageType !== 60) { // 销售订单回库
                // 只有storageType=3的时候才显示returnPcs returnSku;
                return false;
            }
            return true;
        });
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000010-000002-002">
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
