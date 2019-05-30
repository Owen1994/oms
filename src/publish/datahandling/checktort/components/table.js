import React from 'react'
import { Link } from 'react-router-dom'
import {
    Spin,
    Table,
    Pagination,
    Icon,
    Input,
    Dropdown,
    Menu,
    Tooltip,
    message,
    Button,
    Modal
} from 'antd'
import { linkMap } from '../constants/index'
import Shunt from './shunt'
import ViewModal from './viewModal'
import PopConfirm from "@/common/components/confirm";
import Functions from '@/components/functions'
import {
    functions,
    timestampFromat,
} from '@/util/baseTool';

const confirm = Modal.confirm;

const style = {
    menuItem: {
        color: "#4d7bfe",
        fontSize: "12px",
        crusor: "pointer"
    }

}

export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        visible: false,
        data: undefined,
    }

    // 刊登中
    columns = [
        {
            title: 'SKU信息',
            dataIndex: 'asin',
            key: 'asin',
            width: 130,
            render: (t, r, i) => {
                let asin = <a target="_blank" href={`${linkMap[r.siteId]}${r.asin}`}>{r.asin}</a>
                return (<div>
                    <Shunt title='ASIN' content={asin} right={3} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={3} />
                </div>)
            }
        },
        {
            title: '销售信息',
            dataIndex: 'orderQuantity',
            key: 'orderQuantity',
            width: 100,
            render: (t, r, i) => (<div>
                <Shunt title='出单量' content={r.orderQuantity} right={3} />
                <Shunt title='销售额' content={`${r.currency} ${r.salesVolume}`} right={3} />
                <Shunt title='销售数' content={r.saleQuantity} right={3} />
            </div>)
        },
        {
            title: '销售账号',
            dataIndex: 'currency',
            key: 'currency',
            width: 100,
            render: (t, r, i) => (<div>
                <Shunt title='销售账号' content={r.sellerAccount} right={3} />
                <Shunt title='站点' content={r.siteId} right={3} />
                <Shunt title='平台' content={r.platform} right={3} />
            </div>)
        },
        {
            title: '侵权描述',
            dataIndex: 'sensitiveLevels',
            key: 'sensitiveLevels',
            width: 100,
            render: (t, r, i) => (<div>
                {
                    t && t.map((v, i) => <p key={i}>{v}</p>)
                }
            </div>)
        },
        {
            title: '检测时间',
            dataIndex: 'detectionTime',
            key: 'detectionTime',
            width: 100,
            render: (t) => timestampFromat(t, 2)
        },
        {
            title: '操作',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 70,
            render: (t, r, i) => {
                const list = [];
                if (functions(this, "008-000006-000002-002")) {
                    list.push(
                        <Menu.Item>
                            <span
                                style={style.menuItem}
                                onClick={() => confirm({
                                    title: '确认删除当前项？',
                                    content: '',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => this.delModal([r.id]),
                                })}
                            > 删除</span>
                        </Menu.Item>
                    )
                }
                if (functions(this, "008-000006-000002-003")) {
                    list.push(
                        <Menu.Item>
                            <span
                                style={style.menuItem}
                                onClick={() => confirm({
                                    title: '确认检验当前项为特批销售？',
                                    content: '',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => this.checkModal([r.id]),
                                })}>特批销售</span>
                        </Menu.Item>
                    )
                }
                const menu = (
                    <Menu>
                        {list}
                    </Menu>
                );
                return <div className="blue">
                    <span className="pointer" style={{ marginRight: "10px" }} onClick={() => this.viewShow(r)}>查看</span>
                    {
                        list.length ? (
                            <Dropdown overlay={menu}>
                                <span className="blue">更多 <Icon type="down" /></span>
                            </Dropdown>
                        ) : null
                    }
                </div>
            }
        },
    ]

    //  新增或编辑
    viewShow = (r) => {
        this.setState({
            visible: true,
            data: r
        })
    }


    delModal = (ids) => {
        const { delAsync, getList } = this.props;
        return delAsync({
            ids
        })
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList && getList()
                }
            })
    }

    delSome = () => {
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys || !selectedRowKeys.length) return message.warning("请选择删除项")
        PopConfirm('是否确认批量删除？', '', () => {
            this.delModal(selectedRowKeys)
                .then(() => {
                    this.setState({
                        selectedRowKeys: []
                    })
                })
        })
    }

    checkModal = (ids) => {
        const { checkAccount, getList } = this.props;
        return checkAccount({
            ids
        })
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList && getList()
                }
            })
    }

    checkSome = () => {
        const { selectedRowKeys } = this.state;
        if (!selectedRowKeys || !selectedRowKeys.length) return message.warning("请先选择需要处理的数据")
        PopConfirm('是否批量核实当前为特批销售？', '', () => {
            this.checkModal(selectedRowKeys)
                .then(() => {
                    this.setState({
                        selectedRowKeys: []
                    })
                })
        })
    }

    rowSelectionOnChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        })
    }

    paginationOnChange = (pageNumber, pageSize) => {
        const { getList } = this.props;
        this.rowSelectionOnChange([])
        getList(pageNumber, pageSize)
    }

    render() {
        const {
            visible,
            data,
            selectedRowKeys,
        } = this.state;
        const {
            getViewListAsync,
            listData,
        } = this.props;
        const {
            list,
            total,
            loading,
            params,
        } = listData;
        const {
            pageNumber,
            pageData,
        } = params;

        const rowSelection = {
            selectedRowKeys,
            columnWidth: 30,
            onChange: this.rowSelectionOnChange
        };


        const menulist = [];
        if (functions(this, "008-000006-000002-002")) {
            menulist.push(
                <Menu.Item>
                    <span onClick={this.delSome}>批量删除</span>
                </Menu.Item>
            )
        }

        if (functions(this, "008-000006-000002-003")) {
            menulist.push(
                <Menu.Item>
                    <span onClick={this.checkSome}>特批销售</span>
                </Menu.Item>
            )
        }
        const menu = (
            <Menu>
                {menulist}
            </Menu>
        );
        return (
            <div className="padding-sm bgcfff">
                {
                    menulist.length ? (

                        <div className="margin-ss-bottom">
                            <Dropdown overlay={menu}>
                                <Button>批量操作 <Icon type="down" /></Button>
                            </Dropdown>
                        </div>
                    ) : null
                }
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={list}
                        pagination={false}
                        bordered={true}
                        size="small"
                        indentSize={0}
                        rowKey={record => record.id}
                    />
                </Spin>
                <Pagination
                    showTotal={total => `共 ${total} 条`}
                    pageSizeOptions={['20', '30', '40', '50']}
                    showSizeChanger
                    showQuickJumper={{ goButton: true }}
                    current={pageNumber}
                    defaultCurrent={1}
                    onShowSizeChange={this.paginationOnChange}
                    total={total}
                    pageSize={pageData}
                    onChange={this.paginationOnChange}
                />
                <ViewModal
                    visible={visible}
                    data={data}
                    onCancel={() => this.setState({ visible: false, data: undefined })}
                    getViewListAsync={getViewListAsync}
                />
            </div>
        )
    }
}
