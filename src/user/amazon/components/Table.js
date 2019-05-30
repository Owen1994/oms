import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    Switch,
} from 'antd'
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from '@/util/fetch';
import { Review_Switch_Amazon_Authorization_Api } from '../constants/Api';
import Functions from "@/components/functions";

export default class TableComponent extends React.Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'number',
            render: (text, record, index) => {
                const { pageNumber, pageData } = this.props;
                return (pageNumber === 1 ? 0 : pageNumber - 1) * pageData  + (index + 1);
            }
        },
        {
            title: '销售账号',
            dataIndex: 'sellerAccount',
            render: (text, record) => {
                let showWillDue = null;
                if (record.isWillDue === 0) {
                    showWillDue = (<span className="amazon-authorization-will-due-span">已到期</span>);
                } else if (record.isWillDue === 1) {
                    showWillDue = (<span className="amazon-authorization-will-due-span">即将到期</span>);
                } else {
                    showWillDue = null;
                }
                return (
                    <div>
                        <span>{record.sellerAccount}</span>
                        {showWillDue}
                    </div>
                )
            }
        },
        {
            title: '站点',
            dataIndex: 'site',
        },
        {
            title: '授权状态',
            dataIndex: 'authorizeState',
            render: (text, record) => {
                return (
                    <Switch checked={text === 1} onChange={() => this.handleSwitchAuthorization(text, record.key)} />
                )
            }
        },
        {
            title: '密钥有效期',
            dataIndex: 'validityOfSecretKey',
            render: (text, record) => (
                <div>
                    {record.validityOfSecretKey[0]}&nbsp;&nbsp;至&nbsp;&nbsp;{record.validityOfSecretKey[1]}
                </div>
            ),
        },
        {
            title: '操作人',
            dataIndex: 'operator',
        },
        {
            title: '操作时间',
            dataIndex: 'operateTime',
        },
        {
            title: '操作人',
            dataIndex: 'options',
            width: 150,
            render: (text, record) => {
                return (
                    <div>
                        <div>
                            <Functions
                                {...this.props}
                                functionkey="004-000002-000005-003"
                            >
                                <a
                                    onClick={this.props.showModal.bind(null, true, true, record.key)}
                                >
                                    修改
                                </a>
                            </Functions>

                            <Functions
                                {...this.props}
                                functionkey="004-000002-000005-004"
                            >
                                <a
                                    className="padding-ss-left"
                                    onClick={() => PopConfirm('删除确认',
                                        '删除后无法恢复，确认要删除？',
                                        () => this.props.deleteAuthorization(record.key))}>
                                    删除
                                </a>
                            </Functions>
                        </div>
                    </div>
                )
            },
        },
    ];

    /**
     * Http请求 切换授权状态
     */
    handleSwitchAuthorization = (authorizeState, key) => {
        const data = {
            data: {
                authorizeState: authorizeState === 1 ? 0 : 1,
                key,
            },
        };
        fetchPost(Review_Switch_Amazon_Authorization_Api, data, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.loadData();
                }
            });
    };

    render() {
        const {
            amazonAuthorizationData,
            amazonAuthorizationLoadingState,
            pageNumber,
            pageData,
            loadData,
            showModal,
        } = this.props;

        const total = amazonAuthorizationData.total;

        return (
            <div className="amazon-authorization-table">
                <Functions
                    {...this.props}
                    functionkey="004-000002-000005-002"
                >
                    <div className="top-container">
                        <div className="top-right-wrap">
                            <Button onClick={() => showModal(true, false, '')}>+ 新增授权</Button>
                        </div>
                    </div>
                </Functions>
                <Spin spinning={amazonAuthorizationLoadingState.loadingState} delay={500} tip="Loading...">
                    <Table
                        rowKey={record => record.key}
                        columns={this.columns}
                        dataSource={amazonAuthorizationData.list}
                        size="small"
                        pagination={false}
                        bordered
                    />
                    <Pagination
                        showSizeChanger
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}
                        total={total}
                        pageSize={pageData}
                        onChange={loadData}
                        onShowSizeChange={loadData}
                        defaultCurrent={1}
                        defaultPageSize={20}
                    />
                </Spin>
            </div>
        )
    }
}
