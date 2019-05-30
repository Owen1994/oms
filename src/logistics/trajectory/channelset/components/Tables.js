import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Switch, Tooltip,
} from 'antd';

export default class Tables extends React.Component {
    columns =[
        {
            title: '序号',
            dataIndex: 'sno',
            width: 50,
            render: (value, record, index) => (
                (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
            ),
        },
        {
            title: '物流服务商',
            dataIndex: 'logisticsService',
            width: 100,
        },
        {
            title: '物流渠道',
            dataIndex: 'logisticsChannel',
            width: 300,
            render: (value, item) => {
                let showMore = false;
                let keyWord = '';
                if (value.length > 120) {
                    showMore = true;
                    keyWord = value.substring(0, 120);
                }
                return showMore ? (
                    <div>
                        <span>
                            <Tooltip placement={"top"} title={value} overlayStyle={{overflowY:'scroll', }}>
                                {keyWord}
                                <a>{" >>"}</a>
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span>{value}</span>
                    </div>
                )
            },
        },
        {
            title: '渠道编码',
            dataIndex: 'ChannelNumber',
            width: 100,
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
            width: 300,
            render: (value, item) => {
                let showMore = false;
                let keyWord = '';
                if (value.length > 120) {
                    showMore = true;
                    keyWord = value.substring(0, 120);
                }
                return showMore ? (
                    <div>
                        <span>
                            <Tooltip placement={"top"} title={value} overlayStyle={{overflowY:'scroll'}}>
                                {keyWord}
                                <a>{" >>"}</a>
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span>{value}</span>
                    </div>
                )
            },
        },
        {
            title: '启用状态',
            dataIndex: 'state',
            width: 80,
            render: (value, record) => {
                return (
                    <Switch checked={value===1} onChange={(checked) => {
                        this.props.onUpdateState(record, checked ? 1 : 0)
                    }}/>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'key',
            width: 100,
            render: (value, item) => {
                return (
                    <div>
                        <a onClick={() => this.props.showModal('settingModalVisible', item)}>设置</a>
                        <a className={"margin-ss-left"} onClick={() => this.props.showModal('logModalVisible', item)}>日志</a>
                    </div>
                )
            },
        }
    ];

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="margin-ss-top">
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
            </div>
        );
    }
}
