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
    Modal,
} from 'antd'
import Functions from '../../../../../components/functions'
import PopConfirm from '../../../../../common/components/confirm'
import { fetchPost } from '../../../../../util/fetch'
import Apis from '../../constants/Api'
import EditTableCell from '../../../../../common/components/editable/EditableCell'
import { strTrim } from '../../../../../util/baseTool'
import { isPassBatchParams, isPassBatchCopy } from '../../selector/selling'
import itemIdLink from "../../constants/ItemIdLink";
import ExportsModel from '../exportsModel'
import ImportModal from './importModal'
import AutoAdjustment from './autoAdjustment'
import SynchronizeDataModal from './synchronizeData'
import Shunt from '@/components/stateless/shunt'
import { defaultImg } from '../../../../../compliance/configs/config'
const confirm = Modal.confirm;

export default class Tablelist extends React.Component {
    state = {
        plsStateId: 3,
        selectedRowKeys: [],
        items: [],
        expandedRowKeys: [],
        expandedAllKeys: [],
        exportsModelVisible: false,
        importModelVisible: false,
        synchronizeDataModalVisible: false,
        synchronizeDataModalVisible: false,
        checkRepeatState: false,
        sortObj: undefined,
        autoAdjustmentVisible: false
    }

    arrs = [];
    columns = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            width: 70,
            render: (text, record) => (
                <img src={text ? text : defaultImg} width={58} height={50} />
            )
        },
        {
            title: 'SKU信息',
            dataIndex: 'sellerSkuStr',
            key: 'sellerSkuStr',
            width: 170,
            render: (text, record) => {
                let itemId, itemIdUrl;
                if (record.children) {
                    itemId = record.itemIdStr;
                    itemIdUrl = `${itemIdLink[record.site]}${itemId}`;
                } else {
                    this.props.sellingData.lst.map(item => {
                        if (item.itemIdStr === record.itemIdStr) {
                            itemId = record.itemIdStr;
                            itemIdUrl = `${itemIdLink[item['site']]}${itemId}`;
                        }
                    })
                }
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
            width: 200,
            dataIndex: 'basicInfo',
            key: 'basicInfo',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <Shunt title='标题' content={record.titleStr} right={2} />
                        <Shunt title='一级分类' content={record.oneClass} right={2} />
                        <Shunt title='销售类型' content={record.saleTypeStr} right={2} />
                    </div>
                )
            }
        },
        {
            title: '销售信息',
            width: 120,
            dataIndex: 'id',
            key: 'id',
            filters: [{
                text: '销量',
                value: 'quantitySold',
            }, {
                text: '浏览量',
                value: 'hitCount',
            }],
            // filteredValue:["quantitySold"],
            // defaultSortOrder: 'descend',
            filterMultiple: false,
            sorter: true,
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => {
                return (
                    <div className="text-left">
                        {
                            record.isChildren ? null : <p><span className={"span-4"}>浏览量</span>：<span>{record.hitCount}</span></p>
                        }
                        <p><span className={"span-4"}>销量</span>：{record.quantitySold}</p>
                    </div>
                )
            }
        },
        {
            title: '价格库存',
            dataIndex: 'priceStock',
            key: 'priceStock',
            width: 160,
            render: (text, record) => {
                if (record.children || record.saleType === '0') {
                    return (
                        <div>
                            <div className="overflow-hidden">
                                <span className="pull-left"><span className={"span-3"}>零售价</span>：{record.currencyCode}  {record.retailPrice}</span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="pull-left"><span className={"span-3"}>库存</span>： {record.stockStr}</span>
                            </div>
                        </div>
                    )
                }
                return (
                    <div>
                        <div className="overflow-hidden">
                            <span className="pull-left"><span className={"span-3"}>零售价</span>：{record.currencyCode}</span>
                            <EditTableCell
                                {...this.props}
                                type={'number'}
                                name="retailPrice"
                                className="pull-left"
                                value={record.retailPrice}
                                onChange={(value) => this.onCellChange(value, record, "price")}
                                fkey={"008-000001-000001-033"}
                            />
                        </div>
                        <div className="overflow-hidden">
                            <span className="pull-left"><span className={"span-3"}>库存</span>：</span>
                            <EditTableCell
                                {...this.props}
                                type={'number'}
                                name="stock"
                                className="pull-left"
                                value={record.stockStr}
                                onChange={(value) => this.onCellChange(value, record, "stock")}
                                fkey={"008-000001-000001-032"}
                            />
                        </div>
                    </div>
                )
            }
        },
        {
            title: '销售账号',
            dataIndex: 'firstListTime',
            sorter: true,
            width: 180,
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-6"}>销售账号</span>：{record.saleAccountStr}</p>
                        <p><span className={"span-6"}>站点</span>：{record.site}</p>
                        <p><span className={"span-6"}>首次刊登时间</span>：{record.firstListTime}</p>
                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 80,
            render: (text, record) => {
                if (record.isChildren) {
                    return '--'
                }
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-020">
                                <span>
                                    <Link to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.state.plsStateId}&type=copy`} target="_blank">复制</Link>
                                </span>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-030">
                                <span onClick={() => this.props.showModal('logModalVisible', 'item', record)}>日志</span>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="008-000001-000001-035">
                                <span onClick={() => this.handleSyncPlatformData(record)}>同步</span>
                            </Functions>
                        </Menu.Item>
                        {record.children && record.children.length > 0 ?
                            <Menu.Item>
                                <span onClick={() => {
                                    this.handleUpdateExpandedRowKeys(record)
                                }}>{this.state.expandedRowKeys.indexOf(record.key) >= 0 ? '隐藏' : '展开'}</span>
                            </Menu.Item>
                            :
                            null
                        }
                    </Menu>);
                return (
                    <div className="pls-table_btns">
                        <Functions {...this.props} functionkey="008-000001-000001-021">
                            <span className="margin-ss-right">
                                <Link to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.state.plsStateId}&type=edit`} target="_blank">编辑</Link>
                            </span>
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

    // 同步
    handleSyncPlatformData = (record) => {
        const params = {};
        const data = {}
        data.itemids = [record.itemIdStr];
        data.sites = [record.site];
        data.accounts = [record.saleAccountStr];
        data.type = 1;
        params.data = data;
        fetchPost(Apis.SYNC_PLATFORM, params, 2)
            .then(result => {
                if (result.state === '000001') {
                    message.success(result.msg);
                }
            })

    }
    handleUpdateExpandedRowKeys = (record) => {
        this.setState(prevState => {
            const expandedRowKeys = prevState.expandedRowKeys;
            const index = expandedRowKeys.indexOf(record.key);
            if (index >= 0) {
                expandedRowKeys.splice(index, 1);
            } else {
                expandedRowKeys.push(record.key);
            }
            const expandedAllKeys = [...expandedRowKeys];
            record.children.forEach((item) => {
                expandedAllKeys.push(item.key);
            });
            return {
                expandedRowKeys,
                expandedAllKeys,
            }
        })
    }
    // 批量下架
    handleConfirm = (type) => {
        const { getParams } = this.props
        const params = { type }
        const listingIds = this.state.selectedRowKeys
        if (!listingIds || !listingIds.length) {
            params.params = getParams()
        } else {
            params.listingIds = listingIds
        }
        fetchPost(Apis.TABLE_BTN_ACTION, params, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    handleBatchShelves = (type, cpId) => {
        const { getParams } = this.props
        const params = { type }
        const listingIds = this.state.selectedRowKeys
        if (!listingIds || !listingIds.length) {
            params.params = getParams()
            if (cpId) {
                params.params.cpId = cpId
            }
        } else {
            params.listingIds = listingIds
        }
        fetchPost(Apis.TABLE_BTN_ACTION, params, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                }
            })

    }

    // 自动调价
    autoAdjustmentHandle = () => {
        let loading;
        const { getNumberofSearch, getParams, sellingData } = this.props
        const cpId = sellingData && sellingData.params && sellingData.params.cpId
        const listingIds = this.state.selectedRowKeys
        // const { total } = this.props.tablemodel
        let promiseInstance;
        if (listingIds.length) {
            promiseInstance = Promise.resolve(listingIds.length)
        } else {
            loading = message.loading("正在获取自动调价数量")
            const p = {
                type: 3,
                params: getParams()
            }
            if (cpId) {
                p.params.cpId = cpId
            }
            promiseInstance = getNumberofSearch(p)
        }
        promiseInstance.then(num => {
            if (loading) {
                loading()
            }
            if (num > 3000) return message.warning("单次操作listing上限为3000条")
            if (num <= 0) return message.warning("请选择需要自动调价的Listing")
            this.setState({
                autoAdjustmentVisible: true
            })
        })
            .catch(err => {
                if (loading) {
                    loading()
                }
            })

    }

    // 表格行单元内容编辑
    onCellChange = (value, record, type) => {
        let params = {};
        params["listType"] = this.state.plsStateId.toString();
        params["itemId"] = [record.itemIdStr];
        params['type'] = [record.saleType]
        // if (record.isChildren) {
        params['skus'] = [record.sellerSkuStr]
        // }
        let url = ''
        if (type === "price") {
            url = Apis.EDIT_PRICE
            params["editType"] = 1;
            params["price"] = value;
            if (!strTrim(value)) {
                message.warning("价格不能为空！")
                return false
            }
            if (Number(strTrim(value)) < 0.99) {
                message.warning("价格不能小于0.99！")
                return false
            }
            if (Number(strTrim(value)) > 999999.99) {
                message.warning("价格不能大于999999.99！")
                return false
            }
        }
        if (type === "stock") {
            url = Apis.EDIT_STOCK
            params["stock"] = value;
            if (!strTrim(value)) {
                message.warning("库存不能为空！")
                return false
            }
            if (Number(strTrim(value)) < 0) {
                message.warning("库存不能为小于0！")
                return false
            }
            if (Number(strTrim(value)) > 999) {
                message.warning("库存不能为大于999！")
                return false
            }
        }
        fetchPost(url, params, 1).then(res => {
            if (res.state === '000001') {
                // this.props.onSearch();
            } else {
                return false;
            }
        })
    }

    // 同步订单接口
    synchronizeDataPost = (params) => {
        return fetchPost('API.SUBMIT_SHOPEE_GRAB', { data: params }, 1)
    }

    // 单个同步
    singleSynchronizeData = (id) => {
        confirm({
            title: '提示',
            content: '是否同步订单？',
            onOk: () => {
                synchronizeDataPost({
                    data: {
                        ids: [id],
                        type: 2
                    }
                })
            }
        });
    }

    // 检测重复
    checkRepetition = () => {
        const { getParams, checkrepeatAsync } = this.props;
        const value = getParams();
        if (!value.saleAccount || !value.saleAccount.length) {
            return message.warning("请先选择销售账号")
        }
        value.pageNumber = 1
        checkrepeatAsync(value)
    }

    componentWillReceiveProps(nextProps) {
        const datas = nextProps.tablemodel
        const prevDatas = this.props.tablemodel
        if (datas !== prevDatas) {
            this.setState({
                selectedRowKeys: [],
                items: [],
                expandedRowKeys: []
            })
        }
    }

    handleCheckRepeat = () => {
        const fields = this.props.getParmas();
        if (!fields.saleAccount || fields.saleAccount.length === 0) {
            message.warning("请先选择销售账号");
            return;
        }
        if (fields.saleAccount.length > 10) {
            message.warning("选择的销售账号数量不能超过10个");
            return;
        }
        this.setState({ checkRepeatState: true });
        fetchPost('/pls/ebay/motan/service/api/IEbayService/exportRepeatTilteData', { ...fields, state: 3 }, 1)
            .then(() => {
                setTimeout(() => {
                    this.setState({ checkRepeatState: false });
                }, 3000);
            });
    }

    createTopelement = () => {
        const { checkRepeatState, items } = this.state;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-015">
                        <span onClick={
                            () => {
                                const result = isPassBatchParams(items)
                                if (!result.flag) {
                                    return message.warning(result.msg)
                                }
                                this.props.showModal('editPriceVisible', 'items', items)
                            }
                        }>修改价格</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-016">
                        <span onClick={() => {
                            const result = isPassBatchParams(items)
                            if (!result.flag) {
                                return message.warning(result.msg)
                            }
                            this.props.showModal('editStockVisible', 'items', items)
                        }
                        }>修改库存</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-017">
                        <span onClick={() => {
                            let loading;
                            const { getNumberofSearch, getParams, sellingData } = this.props
                            const cpId = sellingData && sellingData.params && sellingData.params.cpId
                            const listingIds = this.state.selectedRowKeys
                            // const { total } = this.props.tablemodel
                            let promiseInstance;
                            if (listingIds.length) {
                                promiseInstance = Promise.resolve(listingIds.length)
                            } else {
                                loading = message.loading("正在获取下架数量")

                                const p = {
                                    type: 3,
                                    params: getParams()
                                }
                                if (cpId) {
                                    p.params.cpId = cpId
                                }
                                promiseInstance = getNumberofSearch(p)
                            }
                            promiseInstance.then(num => {
                                if (loading) {
                                    loading()
                                }
                                if (num > 50000) return message.warning("下架Listing数量不得超过 5W 条")
                                if (num <= 0) return message.warning("请选择需要下架的Listing")
                                PopConfirm(`当前下架listing数为${num}条，是否确认要批量下架？`, '', () => {
                                    PopConfirm(`请再次确认您真的需要下架${num}条listing吗？`, '', () => this.handleBatchShelves(3, cpId))
                                })
                            })

                        }
                        }>批量下架</span>
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-018">
                        <span onClick={() => {
                            if (items.length > 0) {
                                const result = isPassBatchCopy(items);
                                if (!result.flag) {
                                    return message.warning(result.msg);
                                }
                                this.props.showModal('copyModalVisible', 'items', items);
                            } else {
                                const { total } = this.props.sellingData;
                                //没有勾选项时，判断当前搜索条件下列表数据
                                let allItems = this.props.sellingData.lst;
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
                    </Functions>
                </Menu.Item>
                <Menu.Item>
                    {/* <Functions {...this.props} functionkey="008-000001-000001-017">*/}
                    <span onClick={this.autoAdjustmentHandle}>自动调价</span>
                    {/* </Functions>*/}
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    {
                        // <Functions {...this.props} functionkey="008-000001-000001-0200">
                        // <Button onClick={this.checkRepetition }>重复刊登检测</Button>
                        // </Functions>
                    }
                    <Functions {...this.props} functionkey="008-000001-000001-037">
                        <Button className="margin-md-left" onClick={this.handleCheckRepeat} loading={checkRepeatState}>重复检测</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000001-000001-034">
                        <Button className="margin-md-left" onClick={() => this.props.showModal('syncPlatformVisible')} icon="sync">同步数据</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000001-000001-0200">
                        <Button className="margin-md-left" onClick={() => this.setState({ importModelVisible: true })} icon="download">数据导入</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000001-000001-019">
                        <Button className="margin-md-left" onClick={() => this.setState({ exportsModelVisible: true })} icon="upload">数据导出</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000001-000001-014">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon type="plus" icon="plus" />新增Listing</Link>
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

    onChange = (pagination, filters, sorter) => {
        // const { total } = this.props.tablemodel
        const { onSearch, pageNumber, pageData } = this.props;
        if (sorter.field === 'firstListTime' && sorter.order) {
            let sortOrder = sorter.order.slice(0);
            sortOrder.replace(/end$/g, '');
            const sortObj = {
                sortField: sorter.field,
                sortOrder: sortOrder,
                // total,
            }
            this.setState({ sortObj });
            onSearch(pageNumber, pageData, sortObj);
        } else if (sorter.order) {
            let sortOrder = sorter.order.slice(0);
            sortOrder.replace(/end$/g, '');
            const sortObj = {
                sortField: filters.id[0],
                sortOrder: sortOrder,
                // total,
            }
            this.setState({ sortObj });
            onSearch(pageNumber, pageData, sortObj);
        }
    }

    render() {
        const { synchronizeDataPost } = this;

        const { onSearch, searchParams, pageNumber, pageData, getParams, autoAdjustAsync, sellingData } = this.props
        const cpId = sellingData && sellingData.params && sellingData.params.cpId
        const { lst, total, loading } = this.props.tablemodel
        const {
            expandedRowKeys,
            expandedAllKeys,
            exportsModelVisible,
            importModelVisible,
            synchronizeDataModalVisible,
            sortObj,
            autoAdjustmentVisible
        } = this.state
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.arrs = [];
                this.setState({
                    selectedRowKeys,
                })
                selectedRowKeys.map(item => {
                    lst.map(item2 => {
                        if (item === item2.key) {
                            this.arrs.push(item2);
                        }
                    })
                })
                this.setState({ items: this.arrs });
            },
            getCheckboxProps: record => ({
                disabled: record.isChildren, // Column configuration not to be checked
                name: '--',
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
                            onChange={this.onChange}
                            columns={this.columns}
                            dataSource={lst}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                            indentSize={0}
                            rowClassName={(record, index) => {
                                if (expandedAllKeys.indexOf(record.key) >= 0) {
                                    return "table-row-select"
                                }
                                return ""
                            }}
                            expandRowByClick={false}
                            expandedRowKeys={expandedRowKeys}
                            onExpand={(expanded, record) => this.handleUpdateExpandedRowKeys(record)}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={(p1, p2) => onSearch(p1, p2, sortObj)}
                        total={total}
                        pageSize={pageData}
                        onChange={(p1, p2) => onSearch(p1, p2, sortObj)} />
                </div>
                <ExportsModel
                    title="价格库存导出"
                    ptype={3}
                    total={total}
                    searchParams={searchParams}
                    // getParmas={this.props.getParmas}
                    ids={this.state.selectedRowKeys}
                    visible={exportsModelVisible}
                    onCancel={() => this.setState({ exportsModelVisible: false })}
                />
                <ImportModal
                    onCancel={() => this.setState({ importModelVisible: false })}
                    visible={importModelVisible}
                />
                <SynchronizeDataModal
                    onCancel={() => this.setState({ synchronizeDataModalVisible: false })}
                    selectedRowKeys={this.state.selectedRowKeys}
                    visible={synchronizeDataModalVisible}
                    getParams={getParams}
                    keys={this.state.selectedRowKeys}
                    synchronizeDataPost={synchronizeDataPost}
                />
                <AutoAdjustment
                    visible={autoAdjustmentVisible}
                    onCancel={() => this.setState({
                        autoAdjustmentVisible: false
                    })}
                    cpId={cpId}
                    selectedRowKeys={this.state.selectedRowKeys}
                    getParams={getParams}
                    autoAdjustAsync={autoAdjustAsync}
                />
            </div>
        )
    }
}
