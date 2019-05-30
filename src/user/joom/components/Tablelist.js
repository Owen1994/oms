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
import { timestampFromat } from '@/util/baseTool';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import Functions from '@/components/functions';

export default class Tablelist extends React.Component {
    state = {
        visible: false,
        detailModalVisible: false,
        id: ''
    }
    columns = [
        {
            title: '序号',
            key: 'orderNum',
            render: (text, record, index) => {
                const {
                    pageData,
                    pageNumber
                } = this.props.authorizations.params
                return pageNumber === 1 ? index + 1 : pageData * (pageNumber - 1) + index + 1;
            }
        },
        {
            title: '店铺账号',
            key: 'shopName',
            dataIndex: 'shopName',
            align: 'center',
        },
        {
            title: '授权状态',
            key: 'authorizationStatus',
            dataIndex: 'authorizationStatus',
            align: 'center',
            render: (text, record, index) => {
                const checked = text === "1"
                return (
                    <Switch onChange={() => this.handleAuthStateChange(record.key, checked)} checked={checked} />

                )
            }
        },
        {
            title: 'token有效期',
            dataIndex: 'tokenTimePeriod',
            key: 'tokenTimePeriod',
            align: 'center',
            render: (text) => text ? timestampFromat(text, 2) : "--"
        },
        {
            title: 'token生成日期',
            dataIndex: 'tokenTimeGenerate',
            key: 'tokenTimeGenerate',
            align: 'center',
            render: (text) => text ? timestampFromat(text, 2) : "--"
        },
        {
            title: 'token状态',
            dataIndex: 'tokenStatus',
            key: 'tokenStatus',
            align: 'center',
            render: (t,r) => {
                const checked = r.authorizationStatus === "1"
                return checked ? t == "0" ? "授权失败" : "授权成功" : '--';
                // let data = tokenState.find(v => v.code == t);
                // return data ? data.name : "--"
            }
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: '操作时间',
            align: 'center',
            dataIndex: 'operatingTime',
            key: 'operatingTime',
            render: (text) => text ? timestampFromat(text, 2) : "--"
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="004-000002-000004-003"
                            >
                                <a onClick={() => PopConfirm('重新授权',
                                    '确认更新账号Token信息？',
                                    () => this.updateAuthorization(record.key))}
                                >
                                    重新授权
                                </a>
                            </Functions>
                        </Menu.Item>

                        <Menu.Item>
                            <Functions
                                {...this.props}
                                functionkey="004-000002-000004-004"
                            >
                                <a onClick={() => PopConfirm('删除确认',
                                    '删除后无法恢复，确认要删除？',
                                    () => this.delRule(record.key))}
                                >
                                    删除
                                </a>
                            </Functions>
                        </Menu.Item>

                    </Menu>);
                return (
                    <div>
                        <a onClick={() => this.viewDetial(record.key)}
                            style={{ display: 'inline-block', marginRight: 10 }}
                        >
                            查看
                        </a>
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
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/delJoomAccountAuth', { data: { key } }, 1)
            .then(res => {
                if (res.state === "000001") {
                    message.success(res.msg)
                    this.getTableList()
                } else {
                    message.error(res.msg)
                }
            })
    };
    //更新授权
    updateAuthorization = (key) => {
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/JoomupdateAuth', { data: { key } }, 2)
            .then(res => {
                if (res.state === "000001") {
                    message.success(res.msg)
                    this.getTableList()
                } else {
                    message.error(res.msg)
                }
            })
    }

    handleAuthStateChange = (key, checked) => {
        fetchPost(`/oms/order/manage/motan/service/api/IOrderManageService/JoomAuthorizationEnabledDisable`,
            {
                data: {
                    isEnabled: checked ? 2 : 1,
                    key
                }
            })
            .then(res => {
                if (res.state === "000001") {
                    message.success(res.msg)
                    this.getTableList()
                } else {
                    message.error(res.msg)
                }
            })
    }
    getTableList = (page, pageSize) => {
        const { getParams, getList } = this.props;
        const value = getParams();
        if (page) {
            value.pageData = pageSize
            value.pageNumber = page
        }
        getList(value)
    }
    //切换授权状态
    // handleAuthStateChange = (isEnabled, key) => {
    //     this.props.changeLoadingState(true);
    //     fetchPost(IF_ENABLE_EBAY_AUTHORIZATION, { data: { isEnabled: isEnabled === 1 ? 2 : 1, key } }, 1)
    //         .then(result => {
    //             if (result.state === '000001') {
    //                 this.props.handleSubmit();
    //             }
    //         })
    // }

    viewDetial = (id) => {
        this.setState({
            detailModalVisible: true,
            id
        })
    }

    render() {
        const { getTableList } = this;
        const { visible, detailModalVisible, id } = this.state;
        const { authorizations } = this.props;
        const {
            total,
            list,
            loading,
            params
        } = authorizations
        const {
            pageData,
            pageNumber
        } = params
        return (
            <div className="padding-ss bgcfff margin-sm-top">
                <div className="joom-auth-btn text-right margin-ss-bottom">
                    <Functions
                        {...this.props}
                        functionkey="004-000002-000004-002"
                    >
                        <Button type="primary" icon="plus" onClick={() => this.setState({ visible: true })}>新增授权</Button>
                    </Functions>

                </div>
                <div>
                    <Spin spinning={loading}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                    <Pagination
                        className="text-right"
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger                             // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }}        // 是否可以快速跳转至某页
                        total={total}                               // 数据总数
                        pageSize={pageData}                         // 每页条数
                        onChange={getTableList}                     // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={getTableList}             // pageSize 变化的回调
                        // size="small"
                    />
                </div>
                <AddModal
                    visible={visible}
                    closeModal={() => this.setState({ visible: false })}
                />
                <DetailModal
                    id={id}
                    visible={detailModalVisible}
                    closeModal={() => this.setState({ detailModalVisible: false, id: '' })}
                />
            </div>
        )
    }
}
