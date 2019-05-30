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

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
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
            key: 'warehouse',
            dataIndex: 'warehouse',
        },
        {
            title: 'SKU',
            key: 'sku',
            dataIndex: 'sku',
        },
        {
            title: '中文名称',
            key: 'productName',
            dataIndex: 'productName',
        },
        {
            title: '所在储位',
            key: 'storagePlace',
            className: 'wms-treatmentplan-td',
            render: (text, record) => {
                const ele = (
                    record.storagePlace.map(v => (
                        <div className="wms-div-flex">
                            {v}
                        </div>
                    ))
                );
                return (
                    <div className="wms-tablecell-flex">
                        {ele}
                    </div>
                );
            },
        },
        {
            title: '储位库存',
            key: 'spCapacity',
            className: 'wms-treatmentplan-td',
            render: (text, record) => {
                const ele = (
                    record.spCapacity.map(v => (
                        <div className="wms-div-flex">
                            {v}
                        </div>
                    ))
                );
                return (
                    <div className="wms-tablecell-flex">
                        {ele}
                    </div>
                );
            },
        },
    ];

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList();
    }

    // 导出Excel
    exportData = (searchCondition) => {
        fetchPost(EXPORT_DATA, { data: searchCondition }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    downlodFile(result.data.url);
                }
            });
    }

    render() {
        const {
            data,
            pageNumber,
            pageData,
            handleSubmit,
            loadingState,
        } = this.props;
        const total = data.total;
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000004-000001-002">
                        <Button icon="upload" onClick={() => PopConfirm('导出Excel', '确定导出当前搜索条件所有数据吗？', () => this.exportData(this.props.searchCondition))}>
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
                        showTotal={total2 => `共 ${total2} 条`}
                        showSizeChanger // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit} // pageSize 变化的回调
                        // size="small"
                        pageSizeOptions={['10', '30', '50', '100']}
                    />
                </div>
            </div>
        );
    }
}
