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
    columns = [{
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
    }, {
        title: '操作时间',
        dataIndex: 'operateTime',
        key: 'operateTime',
    }, {
        title: '修改字段',
        dataIndex: 'editFields',
        key: 'editFields',
    }, {
        title: '修改前',
        dataIndex: 'editBefore',
        key: 'editBefore',
    }, {
        title: '修改后',
        dataIndex: 'editAfter',
        key: 'editAfter',
    }];


    render() {
        const {
            data,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = data.total;
        const { pageNumber, pageSize } = this.props.paginationData;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-left">
                      变更历史
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            onChange={this.props.sorter}
                            pagination={false}
                            size="small"
                            bordered
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
