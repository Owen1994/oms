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
import Shunt from './shunt'
import ToEdit from './toggleToEditCom'
import RevisedPriceModal from './revisedPriceModal'
import ViewModal from './viewModal'
import LogModel from './logModel'
import { linkMap } from '../constants/index'
import Functions from '@/components/functions'
import { functions, autoZeroToString } from '@/util/baseTool'

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
        selectedRowKeys: [],
        items: [],
        expandedRowKeys: [],
        editItem: {
            // currentItem: {},
            // field: '',
            // value: null,
            // type: 0
        },
        visible: false, // 修改价格的弹窗控制器
        priceData: {}, // 修改价格的数据
        viewModalVisible: false,
        logModalVisible: false,
        viewData: undefined,
    }

    columns = [
        {
            title: 'SKU信息',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (t, r, i) => {
                let asin = r.asin ? <a target="_blank" href={`${linkMap[r.siteCode]}${r.asin}`}>{r.asin}</a> : r.asin
                return (<div>
                    <Shunt title='ASIN' content={asin} right={2} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={2} />
                </div>)
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 100,
            render: (t, r, i) => {
                const { editItem } = this.state;
                const {
                    currentItem, field, value
                } = editItem;
                const is = functions(this, "008-000007-000002-003");
                const fn = () => this.showRevisedpriceModal(r);
                const retailPriceStr = `${r._currency} ${r._retailPrice}`
                const discountPriceStr = `${r._currency} ${r._discountPrice}`
                const retailPrice = is ? ToEdit(retailPriceStr, fn) : retailPriceStr
                const discountPrice = is ? ToEdit(discountPriceStr, fn) : discountPriceStr
                return <div>
                    <Shunt title='零售价' content={retailPrice} right={2} />
                    <Shunt title='折后价' content={discountPrice} right={2} />
                    <Shunt title='运费' content={`${r._currency} ${r._postage}`} right={2} />
                    <Shunt title='库存' content={r.quantity} right={2} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'sellerAccount',
            key: 'sellerAccount',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.sellerAccount} right={2} />
                    <Shunt title='站点' content={r.siteCode} right={2} />
                </div>
            }
        },
        {
            title: '跟卖者信息',
            dataIndex: 'belowPriceFlag',
            key: 'belowPriceFlag',
            width: 100,
            render: (t, r, i) => {
                // 0:否 1:是
                const belowPriceFlag = r.belowPriceFlag ? "是" : "否";
                return <div>
                    <Shunt title='是否低于售价' content={belowPriceFlag} left={2} />
                    <Shunt title='跟卖最低价' content={r._followLowestPrice} left={2} />
                    <Shunt title='跟卖者数量' content={r.followerNum} left={2} />
                </div>
            }
        },
        {
            title: '更新信息',
            dataIndex: 'isDelete',
            key: 'isDelete',
            width: 140,
            render: (t, r, i) => {
                // 0：监控中；1：已暂停
                const isDelete = !r.isDelete ?
                    <span className="amazon-followselling-wentdutched-btn">监控中</span>
                    :
                    <span className="amazon-followselling-paused-btn">已暂停</span>

                return <div>
                    <Shunt className="margin-ss-bottom" leftMinWidth={90} title='当前状态' content={isDelete} left={2} right={3} />
                    <Shunt leftMinWidth={90} title='最新更新时间' content={r.latestCrawlTime} left={2} right={3} />
                </div>
            }
        },
        {
            title: '操作',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 60,
            render: (t, r, i) => {
                return <div className="blue">
                    <span className="pointer" onClick={() => this.viewShow(r)}>查看</span>
                    <Functions {...this.props} functionkey="008-000007-000002-002">
                        <span className="margin-sm-left pointer" onClick={() => this.logShow(r)} >日志</span>
                    </Functions>

                </div>
            }
        },
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
    // 编辑保存
    editSave = (currentValue) => {
        const { setAmendAsync } = this.props;
        const { editItem } = this.state;
        const {
            currentItem,
            field,
            value,
            type
        } = editItem;

        if (value === currentValue) {
            message.success("修改成功")
            this.editeClose()
            return
        } else if (currentValue === undefined || currentValue === "") {
            return message.success("当前值不能为空");
        }
        setAmendAsync({
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
                    currentItem[field] = currentValue;
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
            priceData: r
        })
    }

    revisedpriceModalOnOk = (value) => {
        const { setAmendAsync, getList } = this.props;
        const { priceData } = this.state;
        if (
            priceData.quantity === value.quantity &&
            priceData.retailPrice === value.retailPrice &&
            priceData.promotionBeginDate === value.promotionBeginDate &&
            priceData.promotionEndDate === value.promotionEndDate
        ) {
            message.success("修改成功")
            this.revisedpriceModalOnCancel()
            return;

        }
        setAmendAsync({
            data: {
                id: priceData.id,
                asinSite: priceData.asinSite,
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
            priceData: {}
        })
    }

    //  查看
    viewShow = (r) => {
        this.setState({
            viewModalVisible: true,
            viewData: r
        })
    }
    //  日志
    logShow = (r) => {
        this.setState({
            logModalVisible: true,
            viewData: r
        })
    }

    render() {
        const {
            visible,
            priceData,
            viewModalVisible,
            logModalVisible,
            expandedRowKeys,
            viewData
        } = this.state;
        const {
            onSearch,
            listData,
            getViewListAsync,
            getLogAsync,
            getList
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

        // 根据刊登状态控制表格显示内容 end
        return (
            <div className="padding-sm bgcfff">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Table
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
                    onShowSizeChange={getList}
                    total={total}
                    pageSize={pageData}
                    onChange={getList}
                />
                <RevisedPriceModal
                    visible={visible}
                    data={priceData}
                    onOk={this.revisedpriceModalOnOk}
                    onCancel={this.revisedpriceModalOnCancel}
                />
                <ViewModal
                    visible={viewModalVisible}
                    data={viewData}
                    getViewListAsync={getViewListAsync}
                    onCancel={() => this.setState({ viewModalVisible: false, viewData: undefined })}
                />
                <LogModel
                    visible={logModalVisible}
                    data={viewData}
                    getLogAsync={getLogAsync}
                    onCancel={() => this.setState({ logModalVisible: false, viewData: undefined })}
                />
            </div>
        )
    }
}
