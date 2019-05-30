import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Button,
} from 'antd';
import Functions from '@/components/functions';

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
            width: 60,
            render: (text, record, index) => {
                const pNum = this.props.pageNumber;
                const pData = this.props.pageData;
                return (
                    <div>
                        {pNum > 1 ? (pNum - 1) * pData + (index + 1) : index + 1}
                    </div>
                );
            },
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
            key: 'warehouseName',
            width: 100,
            align: 'center',
        },
        {
            title: 'sku',
            dataIndex: 'sku',
            key: 'sku',
            width: 120,
            align: 'center',
        },
        {
            title: '中文名称',
            dataIndex: 'chineseName',
            key: 'chineseName',
            align: 'center',
        },
        {
            title: '储位编码',
            dataIndex: 'storageCode',
            key: 'storageCode',
            width: 100,
            align: 'center',
        },
        {
            title: '储位库存',
            dataIndex: 'storageStock',
            key: 'storageStock',
            width: 100,
            align: 'center',
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            width: 120,
            align: 'center',
        },
        {
            title: '操作日期',
            dataIndex: 'operationTime',
            key: 'operationTime',
            width: 180,
            align: 'center',
        },
    ];

    render() {
        const {
            dataInventory,
            pageNumber,
            pageData,
            handleSubmit,
            loadingState,
            openModal,
        } = this.props;
        const total = dataInventory.total;

        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000005-000001-006">
                        <Button icon="plus" onClick={() => openModal('1')}>添加SKU库存</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="012-000005-000001-007">
                        <Button icon="download" onClick={() => openModal('2')}>导入</Button>
                    </Functions>
                </div>

                <div className="wms-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={dataInventory.list}
                            pagination={false}
                            rowKey={(record, index) => index}
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
                        total={total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit} // pageSize 变化的回调
                        size="small"
                        pageSizeOptions={['10', '30', '50', '100']}
                    />
                </div>
            </div>
        );
    }
}
