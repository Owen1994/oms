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
import LogModal from './Log';
import Functions from '@/components/functions';
import {delShopeeAccountAuth,getShopeeAuthLog,shopeeAuthorizationEnabledDisable} from '../constants/Api'
export default class Tablelist extends React.Component {
    state = {
        visible: false,
        logModalVisible: false,
        sellerId: ''
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
            title: '账号',
            key: 'sellerId',
            dataIndex: 'sellerId',
            align: 'center',
        },
        {
            title: '站点',
            dataIndex: 'siteCode',
            key: 'siteCode',
            align: 'center',
        },
        {
            title: 'shop_id',
            dataIndex: 'shopId',
            key: 'shopId',
            align: 'center',
        },
        {
            title: '状态',
            key: 'authState',
            dataIndex: 'authState',
            align: 'center',
            render: (text, record, index) => {
                const checked = text === 1
                return (
                    <Switch onChange={() => this.handleAuthStateChange(record.sellerId, checked)} checked={checked} />
                )
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
            dataIndex: 'operateTime',
            key: 'operateTime',
            render: (text) => text ? timestampFromat(text, 2) : "--"
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                    {
                        // <Menu.Item>
                        //     <Functions
                        //         {...this.props}
                        //         functionkey="004-000002-000004-004"
                        //     >
                        //         <a onClick={() => PopConfirm('删除确认',
                        //             '删除后无法恢复，确认要删除？',
                        //             () => this.delRule(record.key))}
                        //         >
                        //             删除
                        //         </a>
                        //     </Functions>
                        // </Menu.Item>
                    }
                        <Menu.Item> 
                            <a onClick={() => PopConfirm('删除确认',
                                '删除后无法恢复，确认要删除？',
                                () => this.delRule(record.sellerId))}
                            >
                                删除
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={() => this.viewDetial({
                                    sellerId:record.sellerId,
                                    logModalVisible:true
                                })}
                            >
                                查看日志
                            </a>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <a onClick={() => this.viewDetial({
                            visible: true,
                            sellerId:record.sellerId
                        })}
                            style={{ display: 'inline-block', marginRight: 10 }}
                        >
                            修改
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
    delRule = (sellerId) => {
        fetchPost(delShopeeAccountAuth, { data: { sellerId } }, 1)
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

    //切换授权状态
    handleAuthStateChange = (sellerId, checked) => {
        fetchPost(shopeeAuthorizationEnabledDisable,
            {
                data: {
                    authState: checked ? 0 : 1,
                    sellerId
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
    viewDetial = (params) => {
        this.setState(params)
    }

    render() {
        const { getTableList } = this;
        const { visible, logModalVisible, sellerId } = this.state;
        const { authorizations,getShopeeDetailsAsync } = this.props;
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
                    {
                    //     <Functions
                    //     {...this.props}
                    //     functionkey="004-000002-000004-002"
                    // >
                    }
                        <Button type="primary" icon="plus" onClick={() => this.setState({ visible: true })}>新增授权</Button>
                   {
                    // </Functions>
                   }

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
                    sellerId={sellerId}
                    getTableList={getTableList}
                    getShopeeDetailsAsync={getShopeeDetailsAsync}
                    closeModal={() => this.setState({ sellerId:"",visible: false })}
                />
                <LogModal
                    visible={logModalVisible}
                    sellerId={sellerId}
                    closeModal={() => this.setState({ sellerId:"",logModalVisible: false })}
                />
                
            </div>
        )
    }
}
// getShopeeAuthLog