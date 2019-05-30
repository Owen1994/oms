import React from 'react'
import {
    Input, Table, Icon, Modal, Button, InputNumber, message
} from 'antd'
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow'
import FixedPriceModal from './fixedPriceModal'
import defaultUrl from '../../../../common/constants/imgs/default.png'
export default class Vlist extends React.Component {
    state = {
        visible: false,
        editTitle: "", // 批量修改的列索引
        editVal: "", // 批量修改的值
        title: "", // 批量操作标题
        precision: 0,
        minNum: 0,
        maxNum: 999999.99,
        fixedPriceVisible: false
    }
    // 多属性列表相关
    addTableItem = () => {
        this.props.addVlistItem()
    }
    delListItem = (index) => {
        const { saveDelVlistItem, delVlistItem, vlist } = this.props
        const item = vlist[index]
        saveDelVlistItem({ payload: item })
        delVlistItem({ index })

    }

    showModal = (editTitle, title) => {
        if (editTitle === "startPrice") {
            this.setState({
                minNum: 0.99,
                maxNum: 999999.99,
                precision: 2
            })
        }
        if (editTitle === "quantity") {
            this.setState({
                minNum: 0,
                maxNum: 999,
                precision: 0
            })
        }
        this.setState({
            editTitle: editTitle,
            visible: true,
            title: title,
        });
    }
    handleEditVal = (e) => {
        let val = null;
        typeof e === "object" ? val = e.target.value : val = e
        this.setState({
            editVal: val
        })
    }
    handleEdits = () => {
        const { editTitle, editVal, title } = this.state;
        if (!editVal && editVal !== 0) {
            message.info(`请输入${title}数量`)
            return
        }
        this.setState({
            visible: false,
            editVal: ""
        });
        this.props.editVlistAll({ key: editTitle, value: editVal });
    }
    columns = [
        {
            title: '图片',
            dataIndex: "images",
            render: (text, record, index) => {
                // let defaultUrl = require('../../../../common/constants/imgs/default.png');
                return (
                    <div>
                        <img src={text ? text : defaultUrl} width={80} height={70} />
                    </div>
                )
            }
        },
        {
            title: 'Seller SKU',
            dataIndex: 'sellerSku',
            render: (text, record, index) => {
                return (
                    <Input
                        onChange={(e) => this.handleChange(e, "sellerSku", index)}
                        type="text"
                        value={text} />
                )
            }
        },
        {
            title: <span onClick={() => this.amendpriceHandle()}>一口价<Icon type="edit" theme="outlined" /></span>,
            dataIndex: 'startPrice',
            render: (text, record, index) => {
                return (
                    <InputNumber
                        onChange={(e) => this.handleChange(e, "startPrice", index)}
                        value={text}
                        max={999999.99}
                        min={0.99}
                        precision={2}
                    />
                )
            }
        },
        {
            title: <span onClick={() => this.showModal("quantity", "库存")}>库存<Icon type="edit" theme="outlined" /></span>,
            dataIndex: 'quantity',
            render: (text, record, index) => {
                const itemId = this.props.itemId;
                return (
                    <InputNumber
                        onChange={(e) => this.handleChange(e, "quantity", index)}
                        value={text}
                        // min={itemId?0:1}
                        min={0}
                        max={999}
                        precision={0}
                    />
                )
            }
        },
        {
            title: '操作',
            render: (text, record, index) => {
                if (index === 0) {
                    return <a style={{ "display": "block", "textAlign": "center" }} onClick={this.addTableItem}>新增</a>
                }
                return <a style={{ "display": "block", "textAlign": "center" }} onClick={() => this.delListItem(index)}>删除</a>
            }
        }
    ]

    // 修改一口价
    amendpriceHandle = () => {
        const { vlist, site } = this.props
        if (!site) return message.warning("请选择站点")
        if (vlist && vlist.length) {
            const index = vlist.findIndex(v => !v.sellerSku)
            if (index === -1) {
                this.setState({ fixedPriceVisible: true })
            }
        } else {
            message.warning("SKU参数错误，请正确填写Seller SKU")
        }
    }


    handleChange = (e, key, index) => {
        let val = null;
        typeof e === "object" ? val = e.target.value : val = e;
        this.props.editVlistItem({ index, value: val, key })
    }
    handleChangeColumns = (data, upcOrEan) => {
        let uniqueArr = [];
        let uniqueObj = {};
        let upcEan = {
            title: <span onClick={() => this.showModal(`${upcOrEan}`, `${upcOrEan}`)}>{upcOrEan ? upcOrEan.toUpperCase() : upcOrEan}<Icon type="edit" theme="outlined" /></span>,
            dataIndex: `${upcOrEan}`,
            render: (text, record, index) => {
                return (
                    <Input
                        onChange={(e) => this.handleChange(e, `${upcOrEan}`, index)}
                        type="text" value={text} />
                )
            }
        }
        this.columns.splice(2, this.columns.length - 5);
        if (upcOrEan) {
            let col = this.columns;
            this.columns = [...col]
            this.columns.splice(2, 0, upcEan)
            uniqueObj[upcOrEan.toUpperCase()] = true;
        }
        data.forEach(v => { // 数组对象去重
            if (v.propsName && !uniqueObj[v.propsName.toUpperCase()]) {
                uniqueArr.push(v)
                uniqueObj[v.propsName.toUpperCase()] = true
            }
        })
        uniqueArr.forEach((v, i) => {
            if (v.propsName) {
                this.columns.splice(2, 0, {
                    title: v.propsName,
                    dataIndex: `${v.propsName}`,
                    render: (text, record, index) => {
                        return (
                            <Input
                                onChange={(e) => this.handleChange(e, v.propsName, index)}
                                type="text"
                                value={text}
                            />
                        )
                    }
                })
            }
        })
    }
    componentWillMount() {
        const { data, upcOrEan } = this.props.vrelationship;
        this.handleChangeColumns(data, upcOrEan)
    }
    componentWillReceiveProps(nextProps) {
        const pVrelationship = this.props.vrelationship;
        const cVrelationship = nextProps.vrelationship;
        if (cVrelationship !== pVrelationship) {
            this.handleChangeColumns(cVrelationship.data, cVrelationship.upcOrEan)
        }
    }
    render() {
        // basicData
        const {
            vlist,
            editVlistAll,
            editVarListing,
            getDomesticList,
            moreListingComputPriceAction,
            site
        } = this.props;
        console.log(" this.props;", this.props)
        return (
            <div className="auctionInfo_container">
                <StandardFormRow title={"多属性列表："} required={true} className="variation-lists">
                    <Table
                        bordered
                        dataSource={vlist}
                        columns={this.columns}
                        pagination={false}
                        size={"small"}
                    />
                </StandardFormRow>
                <Modal
                    title={`批量修改${this.state.title}`}
                    visible={this.state.visible}
                    onOk={this.handleEdits}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            editVal: ""
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        value={this.state.editVal}
                        type={"text"}
                        onChange={this.handleEditVal}
                        precision={this.state.precision}
                        min={this.state.minNum}
                        max={this.state.maxNum}
                    />
                </Modal>
                <FixedPriceModal
                    site={site}
                    visible={this.state.fixedPriceVisible}
                    vlist={vlist}
                    editVlistAll={editVlistAll}
                    editVarListing={editVarListing}
                    getDomesticList={getDomesticList}
                    moreListingComputPriceAction={moreListingComputPriceAction}
                    // visible={true}
                    onCancel={() => {
                        this.setState({
                            fixedPriceVisible: false,
                        });
                    }}
                />
            </div>
        )
    }
}