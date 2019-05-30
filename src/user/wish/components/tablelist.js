import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
    Tooltip,
    Switch,
    Menu,
    Dropdown,
    Icon,
} from 'antd'
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from '@/util/fetch';
import * as API from '../constants/api'
import Functions from '@/components/functions'

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
            key: 'orderNum',
            render: (text, record, index) => {
                const { pageNumber, pageData } = this.props;
                return (pageNumber === 1 ? 0 : pageNumber - 1) * pageData  + (index + 1);
            }
        },
        {
            title: '销售账号',
            dataIndex: 'sellerId',
            align: 'center',
        },
        {
            title: '授权状态',
            dataIndex: 'isEnabled',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <Switch checked={text === 1 ? true : false} onChange={() => this.handleIsEnabledChange(text, record.sellerId)} />
                )
            }
        },
        {
            title: 'Token状态',
            dataIndex: 'refreshRslt',
            align: 'center',
            render: (text, record, index) => {
                return (
                        record.isEnabled === 1 ? text : '\\'
                )
            }
        },
        {
            title: '密钥有效期',
            align: 'center',
            render: (text, record, index) => {
                    {
                        return record.refreshRslt === '授权成功' ? (
                            <div>
                                {record.keyValidityStartTime}
                                <span style={{ display: 'inline-block', margin: '0 4px' }}>至</span>
                                {record.keyValidityEndTime}
                            </div>
                        ) : (
                            <span>\</span>
                        )
                    }
                
            }
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            align: 'center',
        },
        {
            title: '操作时间',
            align: 'center',
            dataIndex: 'operationTime',
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            {/* <Functions {...this.props} functionkey="008-000001-000005-006"> */}
                            <a onClick={() => this.props.openModal(record.sellerId)}>
                                编辑
                                </a>
                            {/* </Functions> */}
                        </Menu.Item>
                        <Menu.Item>
                            {/* <Functions {...this.props} functionkey="008-000001-000005-006"> */}
                            <a onClick={() => PopConfirm('删除确认',
                                '删除后无法恢复，确认要删除？',
                                () => this.delRule(record.sellerId))}>
                                删除
                                </a>
                            {/* </Functions> */}
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        {/* <Functions {...this.props} functionkey="008-000001-000005-005"> */}
                        <a onClick={() => PopConfirm('更新授权',
                            '确认更新账号Token信息？',
                            () => this.updateAuthorization(record.sellerId))}
                            style={{ display: 'inline-block', marginRight: 10 }}>
                            更新授权
                            </a>
                        {/* </Functions> */}
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            }
        },
    ];
    //删除
    delRule = (sellerId) => {
        fetchPost(API.DELETE_WISH_AUTHORIZATION, { sellerId }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    };
    //更新授权
    updateAuthorization = (sellerId) => {
        fetchPost(API.UPDATE_WISH_AUTHORIZATION, { sellerId }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    }
    //切换授权状态
    handleIsEnabledChange = (isEnabled, sellerId) => {
        fetchPost(API.IF_ENABLE_WISH_AUTHORIZATION, { isEnabled: isEnabled === 1 ? 2 : 1, sellerId }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    }

    render() {
        const { data, pageNumber, pageData, handleSubmit, loadingState, openModal } = this.props;
        const total = data.total;
        return (
            <div className="authorization-tablelist breadcrumb">
                <div className="authorization-addBtn">
                    {/* <Functions {...this.props} functionkey="008-000001-000005-002"> */}
                    <Button  type="primary" icon="plus" onClick={() => openModal()}>新增授权</Button>
                    {/* </Functions> */}
                </div>
                <div className="authorization-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}        // 是否可以快速跳转至某页
                        total={total}                               // 数据总数
                        pageSize={pageData}                         // 每页条数
                        onChange={handleSubmit}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit}             // pageSize 变化的回调
                        // size="small"
                    />
                </div>
            </div>
        )
    }
}