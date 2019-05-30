import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Spin,
    Table,
    Pagination,
    Icon,
    Dropdown,
    Menu,
    message,
    Tooltip,
} from 'antd'
import Functions from '../../../../../components/functions'
import PopConfirm from '../../../../../common/components/confirm'
import { fetchPost } from '../../../../../util/fetch'
import Apis from '../../constants/Api'
import { defaultImg } from '../../../../../compliance/configs/config'

export default class Tablelist extends React.Component {
    state = {
        plsStateId: 0,
        selectedRowKeys: [],
        expandedAllKeys: [],
    }
    columns = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render: (text, record) => (
                <img src={text ? text : defaultImg} width={58} height={50} />
            )
        },
        {
            title: 'SKU信息',
            dataIndex: 'sellerSkuStr',
            key: 'sellerSkuStr',
            render: (text, record) => {
                const itemId = record.itemIdStr;
                return (
                    <div>
                        {record.listingId ? <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Listing ID</span>：{record.listingId}</p> : null}
                        {itemId ?
                            <p className="text-center" style={{ maxWidth: 220 }}><span className={"span-5"}>Item ID</span>: {itemId}</p>
                            : null}
                        <Tooltip placement={"top"} title={text}>
                            <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Seller SKU</span>: {text}</p>
                        </Tooltip>
                    </div>
                )
            }
        },
        {
            title: '基本信息',
            width: 300,
            dataIndex: 'basicInfo',
            key: 'basicInfo',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-4"}>标题</span>：<span className={"span-content"}>{record.titleStr}</span></p>
                        <p><span className={"span-4"}>一级分类</span>：{record.oneClass}</p>
                        <p><span className={"span-4"}>销售类型</span>：{record.saleTypeStr}</p>
                    </div>
                )
            }
        },
        // {
        //     title: '销售信息',
        //     width: 150,
        //     dataIndex: 'hitCount',
        //     key: 'hitCount',
        //     render: (text, record) => {
        //         return(
        //             <div className="text-left">
        //                 {                             record.isChildren ? null : <p><span className={"span-4"}>浏览量</span>：<span>{record.hitCount}</span></p>                         }
        //                 <p><span className={"span-4"}>销量</span>：{record.quantitySold}</p>
        //             </div>
        //         )
        //     }
        // },
        {
            title: '价格库存',
            dataIndex: 'priceStock',
            key: 'priceStock',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-3"}>零售价</span>：{record.currencyCode} {record.retailPrice}</p>
                        <p><span className={"span-3"}>库存</span>：{record.stockStr}</p>
                    </div>
                )
            }
        },
        {
            title: '销售账号',
            dataIndex: 'creates',
            key: 'creates',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-7"}>销售账号</span>：{record.saleAccountStr}</p>
                        <p><span className={"span-7"}>站点</span>：{record.site}</p>
                        <p><span className={"span-7"}>必填项是否完整</span>：{record.isCompleteDesc}</p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                if (record.isChildren) {
                    return '--'
                }
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-005">
                                <span onClick={() => PopConfirm('是否确认要删除？', '', () => this.handleConfirmSingle(record))}>
                                    删除
                                </span>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-030">
                                <span onClick={() => this.props.showLogModal(record)}>日志</span>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div className="pls-table_btns">
                        <Functions {...this.props} functionkey="008-000001-000001-006">
                            <span className="margin-ss-right">
                                <Link to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.state.plsStateId}&type=edit`} target="_blank">编辑</Link>
                            </span>
                        </Functions>
                        <Functions {...this.props} functionkey={["008-000001-000001-005", "008-000001-000001-030"]}>
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link">
                                    更多
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Functions>
                    </div>)
            },
        }];
    // 批量刊登、批量删除
    handleConfirm = (type) => {
        const listingIds = this.state.selectedRowKeys
        if (listingIds.length < 1) {
            message.warning('请选择操作项')
            return
        }
        fetchPost(Apis.TABLE_BTN_ACTION, { type, listingId: listingIds }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    /**
     * 删除单条数据
     */
    handleConfirmSingle = (item) => {
        const params = { type: 2, listingId: [item.listingId] }
        fetchPost(Apis.TABLE_BTN_ACTION, params, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.draftData
        const prevDatas = this.props.draftData
        if (datas !== prevDatas) {
            this.setState({
                selectedRowKeys: [],
            })
        }
    }

    createTopelement = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-003">
                        <span onClick={() => PopConfirm('是否确认要批量刊登？', '', () => this.handleConfirm(1))}>批量刊登</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-004">
                        <span onClick={() => PopConfirm('是否确认要批量删除？', '', () => this.handleConfirm(2))}>批量删除</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    <Functions {...this.props} functionkey="008-000001-000001-002">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon type="plus" />新增Listing</Link>
                    </Functions>
                </div>
                <div className="pull-left">
                    {/* <Functions { ...this.props } functionkey={["008-000001-000001-003", "008-000001-000001-004"]}> */}
                    <Dropdown overlay={menu}>
                        <Button>批量操作<Icon type="down" /></Button>
                    </Dropdown>
                    {/* </Functions> */}
                </div>
            </div>
        )
    }
    handleUpdateExpandedRowKeys = (record) => {
        const expandedAllKeys = [record.key];
        record.children.forEach((item) => {
            expandedAllKeys.push(item.key);
        });
        this.setState({
            expandedAllKeys,
        })
    }

    render() {
        const { onSearch, loadingObj, pageNumber, pageData } = this.props
        const { lst, total, loading } = this.props.tablemodel;
        const { expandedAllKeys } = this.state;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
            },
            getCheckboxProps: record => ({
                disabled: record.isChildren, // Column configuration not to be checked
            }),
            hideDefaultSelections: true,
        };
        // 根据刊登状态控制表格显示内容 end
        return (
            <div className="padding-sm">
                {this.createTopelement()}
                <div className="margin-ss-top">
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={lst}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                            onExpand={(expanded, record) => this.handleUpdateExpandedRowKeys(record)}
                            indentSize={0}
                            rowClassName={(record, index) => {
                                if (expandedAllKeys.indexOf(record.key) >= 0) {
                                    return "table-row-select"
                                }
                                return ""
                            }}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageData}
                        onChange={onSearch} />
                </div>
            </div>
        )
    }
}
