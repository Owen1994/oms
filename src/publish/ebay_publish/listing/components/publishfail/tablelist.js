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
import itemIdLink from "../../constants/ItemIdLink";
import { defaultImg } from '../../../../../compliance/configs/config'

export default class Tablelist extends React.Component {
    state = {
        plsStateId: 2,
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
            // width: 140,
            dataIndex: 'sellerSkuStr',
            key: 'sellerSkuStr',
            render: (text, record) => {
                const itemId = record.itemIdStr;
                const itemIdUrl = `${itemIdLink[record.site]}${itemId}`;
                return (
                    <div>
                        {record.listingId ? <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Listing ID</span>：{record.listingId}</p> : null}
                        {itemId ?
                            <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Item ID</span>: <a href={itemIdUrl} target={"_blank"}>{itemId}</a></p>
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
            width: 230,
            dataIndex: 'basicInfo',
            key: 'basicInfo',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-4"}>标题</span>：<span className={"span-content"} style={{ width: 150 }}>{record.titleStr}</span></p>
                        <p><span className={"span-4"}>一级分类</span>：<span className={"span-content"} style={{ width: 150 }}>{record.oneClass}</span></p>
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
            width: 140,
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
            width: 160,
            dataIndex: 'creates',
            key: 'creates',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p style={{ wordBreak: 'break-all', maxWidth: 140 }}><span className={"span-4"}>销售账号</span>：{record.saleAccountStr}</p>
                        <p><span className={"span-4"}>站点</span>：{record.site}</p>
                        <p><span className={"span-4"}>队列类型</span>：{record.queueType}</p>
                    </div>
                )
            }
        },
        {
            title: '失败信息',
            dataIndex: 'failedInfo',
            key: 'failedInfo',
            width: 190,
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-4"}>失败时间</span>：{record.failureTime}</p>
                        <Tooltip placement={"top"} title={record.failure}>
                            <p className="hover-show-all"><span className={"span-4"}>失败原因</span>：{record.failure}</p>
                        </Tooltip>
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
                return (
                    <div className="pls-table_btns" style={{ minWidth: 60 }}>
                        <span className="margin-ss-right">
                            <Link
                                to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.state.plsStateId}&type=edit`} target="_blank">编辑</Link>
                        </span>
                        <span onClick={() => this.props.showLogModal(record)}>日志</span>
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
        const params = { type: 2, listingId: item.listingId }
        fetchPost(Apis.TABLE_BTN_ACTION, params, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.publishFailData
        const prevDatas = this.props.publishFailData
        if (datas !== prevDatas) {
            this.setState({
                selectedRowKeys: []
            })
        }
    }

    createTopelement = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-011">
                        <span onClick={() => PopConfirm('是否确认要批量刊登？', '', () => this.handleConfirm(1))}>批量刊登</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-012">
                        <span onClick={() => PopConfirm('是否确认要批量删除？', '', () => this.handleConfirm(2))}>批量删除</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    <Functions {...this.props} functionkey="008-000001-000001-010">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon
                            type="plus" />新增Listing</Link>
                    </Functions>
                </div>
                <div className="pull-left">
                    {/* <Functions {...this.props} functionkey={["008-000001-000001-011", "008-000001-000001-012"]}> */}
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
        const { lst, total, loading } = this.props.tablemodel
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
