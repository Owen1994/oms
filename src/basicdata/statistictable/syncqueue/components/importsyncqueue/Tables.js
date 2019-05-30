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
        title: '序号',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '文件名',
        dataIndex: 'fileName',
        key: 'fileName',
    }, {
        title: '同步信息',
        dataIndex: 'roleType',
        key: 'roleType',
        render: (value, record) => (
            <div className="logistics_info text-left">
                <div className="overflow-hidden">
                    <span className="name ">导入人员：</span>
                    <span>{record.operator}</span>
                </div>
                <div>
                    <span className="name">导入时间：</span>
                    <span>{record.importTime}</span>
                </div>
            </div>
        ),
    }, {
        title: '功能模块',
        dataIndex: 'warehouseType',
        key: 'warehouseType',
        render: (value, record) => (<div>{record.warehouseDescribe}</div>),
    }, {
        title: '处理信息',
        dataIndex: 'purchaseUserName',
        key: 'purchaseUserName',
        render: (value, record) => (
            <div className="logistics_info text-left">
                {
                    record.importState === 1 ? (
                        <div>
                            <div className="overflow-hidden">
                                <span className="name">处理状态：</span>
                                <span className="syncqueue-orange">{record.importStateDescribe}</span>
                            </div>
                            <div>
                                <span className="name">完成时间：</span>
                                <span>{record.finishTime}</span>
                            </div>
                        </div>
                    ) : null
                }
                {
                    record.importState === 0 ? (
                        <div>
                            <div className="overflow-hidden">
                                <span className="name">处理状态：</span>
                                <span className="syncqueue-greey">{record.importStateDescribe}</span>
                            </div>
                            <div>
                                <span className="name">完成时间：</span>
                                <span>{record.finishTime}</span>
                            </div>
                        </div>
                    ) : null
                }
                {
                    (record.importState === 2 || record.importState === 3) ? (
                        <div>
                            <div className="overflow-hidden">
                                <span className="name">处理状态：</span>
                                <span className="syncqueue-greey">{record.importStateDescribe}</span>
                            </div>
                            <div>
                                <span className="name">完成时间：</span>
                                <span>{record.finishTime}</span>
                            </div>
                        </div>
                    ) : null
                }

            </div>
        ),
    }, {
        title: '结果信息',
        dataIndex: 'account',
        key: 'account',
        render: (value, record) => (
            <div>
                {
                    (record.importState === 2 || record.importState === 3) ? (
                        <div className="logistics_info text-left">
                            <div className="overflow-hidden">
                                <span className="name">成功：</span>
                                <span>{record.successNum}</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="name red">失败：</span>
                                <span className="red">{record.failureNum}</span>
                            </div>
                            {
                                record.failureNum === 0 ? null : (
                                    <div className="overflow-hidden">
                                        <span className="name">失败原因：</span>
                                        <span><a href={record.errorPath} download="文件下载">点击下载</a></span>
                                    </div>
                                )
                            }
                        </div>
                    ) : null
                }
            </div>
        ),
    }];

    render() {
        const {
            supplierData,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = supplierData.total;
        const { pageNumber, pageSize } = this.props.paginationData;
        return (
            <div className="padding-sm bgcfff padding-md-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={supplierData.list}
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
        );
    }
}
