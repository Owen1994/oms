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
import Functions from '../../../../../components/functions';

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
            title: '变动储位SKU款数',
            dataIndex: 'changeSkuNumber',
            width: 100,
        },
        {
            title: '变动储位SKU商品PCS数',
            dataIndex: 'changePcsNumber',
            width: 100,
        },
        {
            title: '新增储位数量',
            dataIndex: 'newStorageNumber',
            width: 100,
        },
        {
            title: '删除储位数量',
            dataIndex: 'deleteStorageNumber',
            width: 100,
        },
    ];

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList();
    }

    // 导出Excel
    exportData = () => {
        // const values = this.props.form.getFieldsValue();
        // const { rangeTime } = values;
        // fetchPost(EXPORT_DATA, {
        //     data: {
        //         ...values,
        //         rangeTime: rangeTime && rangeTime.map(t => t.valueOf()),
        //     },
        // }, 1).then((result) => {
        //     if (result.state === '000001') {
        //         downlodFile(result.data.fileUrl);
        //     }
        // });
    };

    render() {
        const {
            data = { list: [], total: 0 },
            pageNumber,
            pageData,

            loadingState,
        } = this.props;
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000004-000001-002">
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
                            dataSource={data.list}
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
                        total={data.total} // 数据总数
                        pageSize={pageData} // 每页条数
                        // size="small"
                        pageSizeOptions={['100']}
                    />
                </div>
            </div>
        );
    }
}
