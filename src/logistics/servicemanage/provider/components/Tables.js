import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button,
} from 'antd';
import Functions from "../../../../components/functions";

export default class Tables extends React.Component {
    columns =[
        {
            title: '序号',
            dataIndex: 'sno',
            render: (value, record, index) => (
                (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
            ),
        },
        {
            title: '物流服务商',
            dataIndex: 'logisticsService',
        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
        },
        {
            title: '渠道编码',
            dataIndex: 'channelCode',
        },
        {
            title: '渠道状态',
            dataIndex: 'channelState',
        },
        {
            title: '联系方式',
            dataIndex: 'contactInfos',
            render: (array, record) => {
                return array.map(item => (
                    <div key={item.key}>
                        <div className="column-label-wrap">
                            <span className="column-label-wrap_left">{item.label}:</span>
                            {
                                item.type === 'a' ?
                                <a
                                    className="column-label-wrap_right"
                                    target="_blank"
                                    href={record.qqGroupLink ? (record.qqGroupLink.length !== 0 ? record.qqGroupLink : 'javascript:void(0)') : 'javascript:void(0)'}
                                >
                                    {item.value}
                                </a>
                                :
                                <span className="column-label-wrap_right">{item.value}</span>
                            }
                        </div>
                    </div>
                ));
            },
        },
        {
            title: '包裹类型',
            dataIndex: 'packageType',
        },
        {
            title: '追踪类型',
            dataIndex: 'trackType',
        },
        {
            title: '操作',
            dataIndex: 'key',
            render: (value, item) => {
                return (
                    <div>
                        <Functions {...this.props} functionkey="002-000003-000001-002">
                            <a onClick={() => this.props.showModal(item)}>编辑</a>
                        </Functions>
                        <a className="margin-ss-left" onClick={() => this.goQueryPage(item)}>查询轨迹</a>
                    </div>
                )
            }
        },
    ];

    goQueryPage = (item) => {
        const { history } = this.props;
        history.push(`/lgtconfig/trajectory/query/?
                      logisticsChannel=${item.logisticsChannel}&logisticsChannelCode=${item.logisticsChannelCode}&
                      logisticsService=${item.logisticsService}&logisticsServiceCode=${item.logisticsServiceCode}
                      `);
    }

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        return (
            <div className="yks-erp-table">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={data.list}
                        pagination={false}
                        size="small"
                        bordered
                    />
                    <Pagination
                        showTotal={num => `共 ${num} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={data.total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </Spin>
            </div>
        );
    }
}
