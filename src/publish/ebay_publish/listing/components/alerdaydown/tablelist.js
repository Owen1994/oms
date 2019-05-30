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
import { isPassBatchCopy } from '../../selector/selling';
import ExportsModel from '../exportsModel'

export default class Tablelist extends React.Component {
    state = {
        plsStateId: 4,
        selectedRowKeys: [],
        items: [],
        exportsModelVisible: false,
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
        {
            title: '销售信息',
            width: 150,
            dataIndex: 'hitCount',
            key: 'hitCount',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        {record.isChildren ? null : <p><span className={"span-4"}>浏览量</span>：<span>{record.hitCount}</span></p>}
                        <p><span className={"span-4"}>销量</span>：{record.quantitySold}</p>
                    </div>
                )
            }
        },
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
                        <p><span className={"span-4"}>销售账号</span>：{record.saleAccountStr}</p>
                        <p><span className={"span-4"}>站点</span>：{record.site}</p>
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
                            <Functions {...this.props} functionkey="008-000001-000001-025">
                                <span>
                                    <Link
                                        to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.state.plsStateId}&type=copy`} target="_blank">复制</Link>
                                </span>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-030">
                                <span onClick={() => this.props.showModal('logModalVisible', 'item', record)}>日志</span>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div className="pls-table_btns">
                        <Functions {...this.props} functionkey="008-000001-000001-026">
                            <a className="margin-ss-right" onClick={() => this.handleConfirm([record.listingId])}>
                                上架
                            </a>
                        </Functions>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多
                                <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>)
            },
        }];
    // 批量上架
    handleConfirm = (listingId) => {
        fetchPost(Apis.TABLE_BTN_ACTION, { type: 4, listingId }, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.draftData;
        const prevDatas = this.props.draftData;
        if (datas !== prevDatas) {
            this.setState({
                selectedRowKeys: [],
                items: [],
            });
        }
    }

    createTopelement = () => {
        const items = this.state.items;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-024">
                        <span onClick={() => {
                            const listingIds = this.state.selectedRowKeys
                            if (listingIds.length < 1) {
                                message.warning('请选择操作项')
                                return
                            }
                            PopConfirm('上架提示', `需要上架的listing共计 ${listingIds.length} 条，确认是否上架？
                        `, () => this.handleConfirm(listingIds))
                        }}>批量上架</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    {/* <Functions {...this.props} functionkey="008-000001-000001-036"> */}
                    <span onClick={() => {
                        if (items.length > 0) {
                            const result = isPassBatchCopy(items);
                            if (!result.flag) {
                                return message.warning(result.msg);
                            }
                            this.props.showModal('copyModalVisible', 'items', items);
                        } else {
                            const { total } = this.props.tablemodel;
                            //没有勾选项时，判断当前搜索条件下列表数据
                            let allItems = this.props.tablemodel.lst;
                            let result2 = isPassBatchCopy(allItems);
                            if (!result2.flag) {
                                return message.warning(result2.msg);
                            }
                            if (total > 3000) {
                                return message.warning('当前搜索条件数据大于3000，无法进行批量复制');
                            }
                            this.props.showModal('copyModalVisible', 'items', []);
                        }
                    }}>批量复制</span>
                    {/* </Functions> */}
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    <Functions {...this.props} functionkey="008-000001-000001-023">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon
                            type="plus" />新增Listing</Link>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000001-000001-038">
                        <Button className="margin-md-left" onClick={() => this.setState({ exportsModelVisible: true })} icon="upload">数据导出</Button>
                    </Functions>
                </div>
                <div className="pull-left">
                    <Dropdown overlay={menu}>
                        <Button>批量操作<Icon type="down" /></Button>
                    </Dropdown>
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
        const { exportsModelVisible, expandedAllKeys } = this.state;
        const { onSearch, pageNumber, pageData, searchParams } = this.props;
        const { lst, total, loading } = this.props.tablemodel;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                const arrs = [];
                this.setState({
                    selectedRowKeys
                });
                selectedRowKeys.map(item => {
                    lst.map(item2 => {
                        if (item === item2.key) {
                            arrs.push(item2);
                        }
                    })
                });
                this.setState({ items: arrs });
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
                <ExportsModel
                    title="数据导出"
                    ptype={4}
                    total={total}
                    // getParmas={this.props.getParams}
                    searchParams={searchParams}
                    ids={this.state.selectedRowKeys}
                    visible={exportsModelVisible}
                    onCancel={() => this.setState({ exportsModelVisible: false })}
                />
            </div>
        )
    }
}
