import React from 'react';
import {
    Table,
    Spin,
    Tooltip,
} from 'antd';
import Functions from '../../../../components/functions';

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
            title: '轨迹状态',
            dataIndex: 'trajectoryState',
            width: 100,
        },
        {
            title: '匹配关键词',
            dataIndex: 'keyWord',
            width: 400,
            render: (value, item) => {
                let showMore = false;
                let keyWord = '';
                if (value.length > 200) {
                    showMore = true;
                    keyWord = value.substring(0, 200);
                }
                return showMore ? (
                    <div className="channel-state-key-word breakwrod">
                        {keyWord}<a onClick={() => this.props.showKeyWordModal(item)}>{">>"}</a>
                    </div>
                ) : (
                    <div className="breakwrod">{value}</div>
                )
            },
        },
        {
            title: '最近修改人员',
            dataIndex: 'lastModifiedPerson',
            width: 150,
        },
        {
            title: '最近修改时间',
            dataIndex: 'lastModifiedTime',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'key',
            width: 100,
            render: (value, item) => {
                return (
                        <div>
                            <Functions {...this.props} functionkey="002-000002-000003-002">
                                <a onClick={() => this.props.showModal(item)}>设置</a>
                            </Functions>
                            <a className="margin-ss-left" onClick={() => this.props.showLogModal(item)}>日志</a>
                        </div>
                )
            },
        }
    ];

    render() {
        const {
            loadingState,
            data,
        } = this.props;
        return (
            <div className="yks-erp-table">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </Spin>
            </div>
        );
    }
}
