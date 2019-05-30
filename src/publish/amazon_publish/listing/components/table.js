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
    Modal,
    Tabs
} from 'antd'
import defaultImg from '@/common/img/default.png'
import Shunt from './shunt'
import ToEdit from './toggleToEditCom'
import ToSave from './toggleToSave'
import RevisedPriceModal from './revisedPriceModal'
import ImportModal from './importModal'
import ExportsModel from './exportsModel'
import { TABS, linkMap } from '../constants'
import Functions from '@/components/functions'
import EditTitleModel from './editTitleModel'
import { functions } from '@/util/baseTool'

const TabPane = Tabs.TabPane
const confirm = Modal.confirm;
const style = {
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
    },
    pr36: {
        paddingRight: '36px'
    }

}

export default class Tablelist extends React.Component {
    state = {
        // selectedRowKeys: [],
        items: [],
        expandedRowKeys: [],
        editItem: {
            // currentItem: {},
            // field: '',
            // value: null,
            // type: 0
        },
        visible: false, // 修改价格的弹窗控制器
        currentData: {}, // 当前选中的数据的数据
        importModalVisible: false,
        exportModalVisible: false,
        editTitleModelVisible: false,
    }

    arrs = [];

    // 刊登中
    columns1 = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            render: (t, r, i) => i + 1
        },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            width: 80,
            render: (t, r) => <img className="imgw74" src={r.mainPicUrl || defaultImg} alt="" />
        },
        {
            title: 'SKU信息',
            dataIndex: 'ASIN',
            key: 'ASIN',
            width: 120,
            render: (t, r, i) => {
                let asin = <a target="_blank" href={`${linkMap[r.siteCode]}${r.asin}`}>{r.asin}</a>
                return <div>
                    <Shunt title='ASIN' content={asin} />
                    <Shunt title='Seller SKU' content={r.sellerSku} />
                </div>
            }
        },
        {
            title: '基本信息',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            render: (t, r, i) => {
                return <div>
                    <Shunt leftMinWidth={40} title='标题' content={r.title} right={10} />
                </div>
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='零售价' content={`${r.currencyCode} ${r._retailPrice}`} right={3} />
                    <Shunt title='折后价' content={`${r.currencyCode} ${r._discountPrice}`} right={3} />
                    <Shunt title='库存' content={r.quantity || 0} right={10} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'siteCode',
            key: 'siteCode',
            width: 110,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.sellerAccount} left={2} right={3} />
                    <Shunt title='站点' content={r.siteCode} left={2} right={3} />
                </div>
            }
        },
        {
            title: '队列信息',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 110,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='队列类型' content={r._queueType} right={2} />
                    <Shunt title='队列时间' content={r.queueTime} right={2} />
                </div>
            }
        },
    ]

    // 刊登失败
    columns2 = [
        {
            title: '图片',
            dataIndex: 'mainPicUrl',
            key: 'mainPicUrl',
            width: 70,
            render: (t, r) => <img className="imgw74" src={r.mainPicUrl || defaultImg} alt="" />
        },
        {
            title: 'SKU信息',
            dataIndex: 'ASIN',
            key: 'ASIN',
            width: 100,
            render: (t, r, i) => {
                let asin = <a target="_blank" href={`${linkMap[r.siteCode]}${r.asin}`}>{r.asin}</a>
                return <div>
                    <Shunt title='ASIN' content={asin} right={10} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={10} />
                </div>
            }
        },
        {
            title: '基本信息',
            dataIndex: 'title',
            key: 'title',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt leftMinWidth={40} title='标题' content={r.title} right={10} />
                </div>
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='零售价' content={`${r.currencyCode} ${r._retailPrice}`} right={3} />
                    <Shunt title='折后价' content={`${r.currencyCode} ${r._discountPrice}`} right={3} />
                    <Shunt title='库存' content={r.quantity || 0} right={10} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'siteCode',
            key: 'siteCode',
            width: 110,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.sellerAccount} right={2} />
                    <Shunt title='站点' content={r.siteCode} right={2} />
                    <Shunt title='队列类型' content={r._queueType} right={2} />
                </div>
            }
        },
        {
            title: '失败信息',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 120,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='失败时间' content={r.failureTime} leftMinWidth={70} right={6} />
                    <div className="wj-shunt">
                        <div style={{ flex: 1, minWidth: 70 }} className="wj-shunt-left">失败原因<span>：</span></div>

                        <Tooltip placement="left" title={r.failureMsg}>
                            <div style={{ flex: 6, maxHeight: '54px', overflow: "hidden", cursor: "default" }} className="wj-shunt-right breakwrod">
                                {r.failureMsg}
                            </div>
                        </Tooltip>
                    </div>
                </div>
            }
        }
    ]

    // 正在销售/已停售
    columns3 = [
        // {
        //     title: '',
        //     dataIndex: 'id',
        //     key: 'id',
        //     width: 100,
        //     render: (t, r, i) => {
        //         return r.children ? '' : '--'
        //     }
        // },
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            width: 80,
            render: (t, r) => <img className="imgw74" src={r.mainPicUrl || defaultImg} alt="" />
        },
        {
            title: 'SKU信息',
            dataIndex: 'ASIN',
            key: 'ASIN',
            width: 120,
            render: (t, r, i) => {
                let asin = <a target="_blank" href={`${linkMap[r.siteCode]}${r.asin}`}>{r.asin}</a>
                return <div>
                    <Shunt title='ASIN' content={asin} right={2} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={2} />
                </div>
            }
        },
        {
            title: '基本信息',
            dataIndex: 'title',
            key: 'title',
            width: 120,
            render: (t, r, i) => {
                const { editItem } = this.state;
                const isCanModify = functions(this, "008-000007-000001-004");
                const {
                    currentItem, field, value
                } = editItem;
                let title;
                if (isCanModify) {
                    title = ToEdit(r.title, () => {
                        this.toggleEditType("title", r.title, r, 3)
                        this.setState({
                            editTitleModelVisible: true
                        })
                    })
                } else {
                    title = value
                }
                // <Shunt title='销售类型' content={r.listingType === 1 ? '单属性' : '多属性'} right={10} />
                return <div>
                    <Shunt leftMinWidth={40} title='标题' content={title} right={10} />
                </div>
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 130,
            render: (t, r, i) => {
                const { editItem } = this.state;
                const isCanModify = functions(this, "008-000007-000001-004");
                const {
                    currentItem, field, value
                } = editItem;
                let quantity;
                if (isCanModify) {
                    if (currentItem === r && field === 'quantity') {
                        quantity = <ToSave
                            value={value}
                            save={this.saveQuantity}
                            close={this.editeClose}
                        />
                    } else {
                        quantity = ToEdit(r.quantity || 0, () => this.toggleEditType("quantity", r.quantity || 0, r, 2))
                    }
                } else {
                    quantity = value
                }
                const fn = () => this.showRevisedpriceModal(r);
                const retailPriceStr = `${r.currencyCode} ${r._retailPrice}`
                const discountPriceStr = `${r.currencyCode} ${r._discountPrice}`
                const retailPrice = isCanModify ? ToEdit(retailPriceStr, fn) : retailPriceStr
                const discountPrice = isCanModify ? ToEdit(discountPriceStr, fn) : discountPriceStr
                return <div>
                    <Shunt title='零售价' content={retailPrice} right={2} />
                    <Shunt title='折后价' content={discountPrice} right={2} />
                    <Shunt title='库存' content={quantity} right={2} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'siteCode',
            key: 'siteCode',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.sellerAccount} right={2} />
                    <Shunt title='站点' content={r.siteCode} right={2} />
                    <Shunt title='上架时间' content={r._listTime} right={2} />
                </div>
            }
        },
        {
            title: '操作',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 50,
            render: (t, r, i) => {
                const delHandle = () => confirm({
                    title: '提示',
                    content: '是否确定删除？',
                    onOk: () => {
                        this.delItem(r)
                    }
                })
                // const go = () => {
                //     const { history } = this.props;
                //     history.push()
                // }
                const href = `/publish/amazonlisting/list/detail/?id=${r.id}&listingStatus=${r.listingStatus}`
                return <div className="blue">

                    <Functions {...this.props} functionkey="008-000007-000001-004">
                        <a className="pointer" target="_blank" href={href}>编辑</a>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000007-000001-005">
                        <span className="margin-sm-left pointer" onClick={delHandle}>删除</span>
                    </Functions>
                </div>
            }
        },
    ]

    // 已删除
    columns4 = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            width: 100,
            render: (t, r) => <img className="imgw74" src={r.mainPicUrl || defaultImg} alt="" />
        },
        {
            title: 'SKU信息',
            dataIndex: 'ASIN',
            key: 'ASIN',
            width: 100,
            render: (t, r, i) => {
                let asin = <a target="_blank" href={`${linkMap[r.siteCode]}${r.asin}`}>{r.asin}</a>
                return <div>
                    <Shunt title='ASIN' content={asin} right={10} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={10} />
                </div>
            }
        },
        {
            title: '基本信息',
            dataIndex: 'title',
            key: 'title',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt leftMinWidth={40} title='标题' content={r.title} right={10} />
                </div>
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='零售价' content={`${r.currencyCode} ${r._retailPrice}`} right={2} />
                    <Shunt title='折后价' content={`${r.currencyCode} ${r._discountPrice}`} right={2} />
                    <Shunt title='库存' content={r.quantity || 0} right={2} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'siteCode',
            key: 'siteCode',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.sellerAccount} right={2} />
                    <Shunt title='站点' content={r.siteCode} right={2} />
                    {/*<Shunt title='队列类型' content={r._queueType} right={2} />*/}
                </div>
            }
        },
        {
            title: '删除信息',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='删除人员' content={r.deleteUser} right={2} />
                    <Shunt title='删除时间' content={r.deleteTime} right={2} />
                </div>
            }
        }
    ]


    toggleEditType = (field, value, record, type) => {
        const p = {
            currentItem: record,
            field,
            value,
            type
        }
        this.setState({
            editItem: p
        })
    }
    // 编辑框编辑
    inputChange = (e) => {
        const { editItem } = this.state
        this.setState({
            editItem: {
                ...editItem,
                value: e.target.value
            }
        })
    }
    // 库存保存
    saveQuantity = (currentValue) => {
        const str = currentValue.toString()
        if (!/^\d+$/.test(str)) return message.warning("库存需为正整数，请修改")
        if (currentValue < 0 || currentValue > 2000) return message.warning("库存的范围为 0 - 2000 ，请修改")
        this.editSave(currentValue)
    }
    // 编辑保存
    editSave = (currentValue) => {
        const { setAmendAsync, getList } = this.props;
        const { editItem } = this.state;
        const {
            currentItem,
            field,
            value,
            type
        } = editItem;
        let promise = Promise.resolve()
        if (value === currentValue) {
            message.success("修改成功")
            this.editeClose()
            return promise
        } else if (currentValue === undefined || currentValue === "") {
            message.success("当前值不能为空");
            return promise
        }
        return setAmendAsync({
            data: {
                id: currentItem.id,
                asinSite: currentItem.asinSite,
                [field]: currentValue,
                type
            }
        })
            .then(result => {
                if (result) {
                    message.success(result.msg || "修改成功")
                    getList()
                    this.editeClose()
                }
            })
    }

    editeClose = () => {
        this.setState({
            editItem: {}
        })
    }

    showRevisedpriceModal = (r) => {
        this.setState({
            visible: true,
            currentData: r
        })
    }

    revisedpriceModalOnOk = (value) => {
        const { setAmendAsync, getList } = this.props;
        const { currentData } = this.state;
        if (
            currentData.quantity === value.quantity &&
            currentData.retailPrice === value.retailPrice &&
            currentData.promotionBeginDate === value.promotionBeginDate &&
            currentData.promotionEndDate === value.promotionEndDate
        ) {
            message.success("修改成功")
            this.revisedpriceModalOnCancel()
            return;

        }
        setAmendAsync({
            data: {
                id: currentData.id,
                asinSite: currentData.asinSite,
                quantity: value.quantity,
                retailPrice: value.retailPrice,
                promotionBeginDate: value.promotionBeginDate,
                promotionEndDate: value.promotionEndDate,
                discountPrice: value.discountPrice,
                type: 1
            }
        })
            .then(result => {
                if (result) {
                    message.success(result.msg || "修改成功")
                    getList()
                    this.revisedpriceModalOnCancel()
                }
            })
    }

    revisedpriceModalOnCancel = () => {
        this.setState({
            visible: false,
            currentData: {}
        })
    }

    rowSelection = {
        columnWidth: 30,
        selectedRowKeys: [],
        onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.setState({})
        },
    };

    //  删除
    delItem = (r) => {
        const { setAmendAsync, getList } = this.props;
        setAmendAsync({
            data: {
                asinSite: r.asinSite,
                id: r.id,
                sellerSku: r.sellerSku,
                type: 4
            }
        })
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList()
                }
            })
    }

    getColumns = (type = 1) => {
        switch (type) {
            case "1":
                return this.columns1;
            case "2":
                return this.columns2;
            case "3":
            case "4":
                return this.columns3;
            case "5":
                return this.columns4;
        }
    }
    handleTabChange = (activeKey) => {
        const { handleTabChange } = this.props;
        this.clearRowSelection()
        handleTabChange && handleTabChange(activeKey)
    }
    // 是否有导入按钮
    hasImportBtn = () => {

        const {
            activeKey
        } = this.props;
        return functions(this, "008-000007-000001-002") && ["3", "4"].includes(activeKey)
    }

    // 是否有导出按钮
    hasExportBtn = () => {
        const {
            activeKey,
        } = this.props;
        return functions(this, "008-000007-000001-003") && ["2", "3", "4"].includes(activeKey)
    }

    clearRowSelection = () => {
        this.rowSelection.selectedRowKeys = []
        this.setState({})
    }
    hasRowSelection = () => {
        const {
            activeKey,
        } = this.props;
        return ['2', '3', '4'].includes(activeKey)
    }

    render() {
        const {
            visible,
            currentData,
            importModalVisible,
            exportModalVisible,
            expandedRowKeys,
            editItem,
            editTitleModelVisible
        } = this.state;
        const {
            getList,
            getParams,
            listData,
            activeKey,
            uploadAsync,
            setAmendAsync
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
        const rowSelection = this.hasRowSelection() ? this.rowSelection : null;
        const hasImportBtn = this.hasImportBtn();
        const hasExportBtn = this.hasExportBtn();
        const ids = rowSelection ? rowSelection.selectedRowKeys : null
        // 根据刊登状态控制表格显示内容 end
        return (
            <div className="bgcfff">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Tabs activeKey={activeKey} type="card" onChange={this.handleTabChange}>
                        {
                            TABS.slice(1).map(v => (<TabPane tab={v.name} key={v.id} />))
                        }
                    </Tabs>
                    <div className="padding-sm table-fixed">
                        <div className="text-right margin-ss-bottom">
                            {
                                hasImportBtn ? <Button icon="download" onClick={() => this.setState({ importModalVisible: true })}>数据导入</Button> : null
                            }
                            {
                                hasExportBtn ? <Button icon="upload" className="margin-ss-left" onClick={() => this.setState({ exportModalVisible: true })}>数据导出</Button> : null
                            }
                        </div>
                        <Table
                            columns={this.getColumns(activeKey)}
                            dataSource={list}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                            indentSize={0}
                            rowKey={record => record.id}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={getList}
                            total={total}
                            pageSize={pageData}
                            onChange={getList}
                        />
                    </div>
                </Spin>
                <RevisedPriceModal
                    visible={visible}
                    data={currentData}
                    onOk={this.revisedpriceModalOnOk}
                    onCancel={this.revisedpriceModalOnCancel}
                />
                <EditTitleModel
                    visible={editTitleModelVisible}
                    data={editItem}
                    editSave={this.editSave}
                    onCancel={() => this.setState({ editTitleModelVisible: false, currentData: {} })}
                />
                <ImportModal
                    visible={importModalVisible}
                    uploadAsync={uploadAsync}
                    onCancel={() => this.setState({ importModalVisible: false })}
                />
                <ExportsModel
                    visible={exportModalVisible}
                    ids={ids}
                    activeKey={activeKey}
                    getParams={getParams}
                    onCancel={() => this.setState({ exportModalVisible: false })}
                />

            </div>
        )
    }
}
