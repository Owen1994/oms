import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Button,
} from 'antd';
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
            title: '标识',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: '名称',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: '操作',
            key: 'options',
            render: (text, record) => (
                <div>
                    <Functions {...this.props} functionkey="012-000005-000002-003">
                        <a onClick={() => this.handleOpenModal(record)}>管理</a>
                    </Functions>
                </div>
            ),
        },
    ];

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearBaseList();
    }

    handleOpenModal = (record) => {
        if (record.key === 1) { // 仓库项数据固定id
            this.props.openModal('2', record);
        } else { // 打开主体、采购单状态项窗口
            this.props.openModal('3', record);
        }
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
                    <Functions {...this.props} functionkey="012-000005-000002-002">
                        <Button icon="plus" onClick={() => this.props.openModal('1')}>
                        新增
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
