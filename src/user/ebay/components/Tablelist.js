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
    Modal,
} from 'antd'
import PopConfirm from '@/common/components/confirm';
import { fetchPost } from '@/util/fetch';
import {
    IF_ENABLE_EBAY_AUTHORIZATION,
    DELETE_EBAY_AUTHORIZATION,
    UPDATE_EBAY_AUTHORIZATION
} from '../constants/Api'
import {
    LOADING_AUTHORIZATION_LIST,
} from '../constants/index'
import Functions from '@/components/functions'

export default class Tablelist extends React.Component {
    state = {
        redirectUrl: ''
    }
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
            dataIndex: 'account',
            align: 'center',
        },
        {
            title: '授权状态',
            dataIndex: 'authState',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <Switch checked={text === 1 ? true : false} onChange={() => this.handleAuthStateChange(text, record.key)} />
                )
            }
        },
        {
            title: 'token有效期',
            dataIndex: 'tokenValidity',
            align: 'center',
        },
        {
            title: 'token授权时间',
            dataIndex: 'tokenAuthTime',
            align: 'center',
        },
        {
            title: 'token状态',
            dataIndex: 'tokenState',
            align: 'center',
            render: (text, record, index) => {
                return (
                    record.authState === 1 ? text : '\\'
                )
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
            dataIndex: 'operateTime',
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            {/* <Functions {...this.props} functionkey="008-000001-000005-006"> */}

                            <a onClick={() => PopConfirm('更新授权',
                                '确认更新账号Token信息？',
                                () => this.updateAuthorization(record.key))}
                            >
                                更新授权
                            </a>
                            {/* </Functions> */}
                        </Menu.Item>
                        <Menu.Item>
                            {/* <Functions {...this.props} functionkey="008-000001-000005-006"> */}
                            <a onClick={() => PopConfirm('删除确认',
                                '删除后无法恢复，确认要删除？',
                                () => this.delRule(record.key))}
                            >
                                删除
                                </a>
                            {/* </Functions> */}
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        {/* <Functions {...this.props} functionkey="008-000001-000005-005"> */}
                        <a onClick={() => this.props.openModal('2', record)}
                            style={{ display: 'inline-block', marginRight: 10 }}
                        >
                            查看
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
    delRule = (key) => {
        fetchPost(DELETE_EBAY_AUTHORIZATION, { data: { key } }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    };
    //更新授权
    updateAuthorization = (key) => {
        fetchPost(UPDATE_EBAY_AUTHORIZATION, { data: { key } }, 2)
            .then(result => {
                if (result.state === '000001') {
                    // window.open(result.data.redirectUrl, '_blank');
                    // this.props.handleSubmit();
                    this.setState({ redirectUrl: result.data.redirectUrl });
                }
            })
    }
    //切换授权状态
    handleAuthStateChange = (isEnabled, key) => {
        this.props.changeLoadingState(true);
        fetchPost(IF_ENABLE_EBAY_AUTHORIZATION, { data: { isEnabled: isEnabled === 1 ? 0 : 1, key } }, 1)
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
                    <Button type="primary" icon="plus" onClick={() => openModal('1')}>新增授权</Button>
                    {/* </Functions> */}
                </div>
                <div className="authorization-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.list}
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
                <Modal
                    visible={!!this.state.redirectUrl}
                    title={'点击跳转'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={() => {
                        this.setState({ redirectUrl: '' });
                        this.props.handleSubmit();
                    }}
                    footer={
                        <Button onClick={() => {
                            this.setState({ redirectUrl: '' });
                            this.props.handleSubmit();
                        }}>关闭</Button>
                    }
                >
                    <p style={{ textAlign: 'center' }}>
                        点击
                                <a target="_blank" href={this.state.redirectUrl} style={{ fontSize: 26, color: 'red' }}>此处</a>
                        完成跳转
                            </p>
                </Modal>
            </div>
        )
    }
}