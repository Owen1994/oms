/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
    Pagination,
} from 'antd';


export default class table extends React.Component {
    state = {
        selectedRowKeys: [],
    }

    columns = [{
        title: '供应商ID',
        dataIndex: 'supplierId',
        key: 'supplierId',
    }, {
        title: '供应商名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
    }, {
        title: '跟单员ID',
        dataIndex: 'merchandiserId',
        key: 'merchandiserId',
    }, {
        title: '跟单员',
        dataIndex: 'merchandiser',
        key: 'merchandiser',
    }, {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
    }, {
        title: '业务线',
        dataIndex: 'businessLine',
        key: 'businessLine',
    }, {
        title: '联系方式',
        dataIndex: 'contact',
        key: 'contact',
    }];
    // , {
    //     title: '创建时间',
    //     dataIndex: 'createTime',
    //     key: 'createTime',
    // }


    render() {
        const {
            supplierData,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = supplierData.total;
        const { pageNumber, pageSize } = this.props;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };
        return (
            <div className="gallery-table breadcrumb padding-sm">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={supplierData.list}
                            onChange={this.props.sorter}
                            pagination={false}
                            size="small"
                            bordered
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={totalNum}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
