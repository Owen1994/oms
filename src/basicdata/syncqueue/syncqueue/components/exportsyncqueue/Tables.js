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
                    <span className="name ">导出人员：</span>
                    <span>{record.userName}</span>
                </div>
                <div>
                    <span className="name">导出时间：</span>
                    <span>{record.downloadTime}</span>
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
                <div className="overflow-hidden">
                    <span className="name ">处理状态：</span>
                    {
                        record.downloadState === 0 ? (
                            <span>{record.downloadStateDescribe}</span>
                        ) : null
                    }
                    {
                        record.downloadState === 1 ? (
                            <span className="syncqueue-orange">{record.downloadStateDescribe}</span>
                        ) : null
                    }
                    {
                        (record.downloadState === 2 || record.downloadState === 3) ? (
                            <span className="syncqueue-greey">{record.downloadStateDescribe}</span>
                        ) : null
                    }
                </div>
                <div>
                    <span className="name">完成时间：</span>
                    <span>{record.finishTime}</span>
                </div>
            </div>
        ),
    }, {
        title: '结果信息',
        dataIndex: 'account',
        key: 'account',
        render: (value, record) => (
            <div>
                {
                    (record.downloadState === 2 || record.downloadState === 3) ? (
                        <div className="logistics_info text-left">
                            <div className="overflow-hidden">
                                <span className="name">成功：</span>
                                <span>{record.successNum}</span>
                            </div>
                            {
                                record.causesFailureType ? (
                                    <div className="overflow-hidden">
                                        <span className="name">失败原因：</span>
                                        <span>{record.causesFailure}</span>
                                    </div>
                                ) : null
                            }
                            <div className="text-center">
                                <span><a href={record.fileUrl} download="文件下载">点击下载</a></span>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        ),
    }];

    render() {
        const {
            procurementData,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = procurementData.total;
        const { pageNumber, pageSize } = this.props.paginationData;
        return (
            <div className="padding-sm bgcfff bgcfff padding-md-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={procurementData.list}
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
