import React from 'react'

import { Link } from 'react-router-dom'
import {
    Button,
    Spin,
    Table,
    Pagination,
    Modal,
    Input,
    Row,
    Col,
    message,
} from 'antd'
const confirm = Modal.confirm
import { datasaddkey, timestampFromat } from '../../../util/baseTool'
import Functions from '../../../components/functions'
import {post} from '../../../util/axios'
import * as types from '../constants/ActionTypes'
import {levelOptions} from '../../../util/options'
export default class Tablelist extends React.Component{

    state = {
        visible: false,
        itemsName: null,
        pageSize: 20,
        pageNumber: 1,
        title: '',
    }
    columns = [
        {
            title: 'SKU',
            dataIndex: 'skuNumber',
            render: (text, record, index) => text
        },
        {
            title: '报关品名',
            dataIndex: 'customsName',
            render: (text, record, index) => text
        },
        {
            title: '海关编码',
            dataIndex: 'hs',
            render: (text, record, index) => text
        },
        {
            title: '税率',
            dataIndex: 'rate',
            render: (text, record, index) =>text
        },
        {
            title: '创建人',
            dataIndex: 'creates',
            render: (text, record, index) => text
        },
        {
            title: '修改人',
            dataIndex: 'edits',
            render: (text, record, index) => text
        },
        {
            title: '修改时间',
            dataIndex: 'editTime',
            render: (text, record, index) => timestampFromat(text, 2),
        },{
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => (
            <div className="lgt-customs_set_btns">
                <Functions {...this.props} functionkey="002-000001-000002-001">
                <span
                    className="margin-ss-right"
                    onClick={() => this.toggleModal({ 
                        visible: true, 
                        id: record.id,
                        type: 2,
                        skuNumber: record.skuNumber,
                        itemsName: record.customsName,
                        hsCode: record.hs,
                        rate: record.rate,
                        title: "修改SKU税率信息"
                    })}
                >
                修改
                </span>
                {/*<span className="margin-ss-left margin-ss-right v-line">|</span>*/}
                <span onClick={() => this.deleteItem(record)}>删除</span>
                </Functions>
            </div>
            ),
        }]
    trim = (str) => {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    Paginatihandle = (page, pageSize)=> {
        this.setState({
            pageNumber: page,
            pageSize: pageSize
        })
        this.props.customSetListFetch(page, pageSize);
    }
    /**
     *作者: pzt
     *时间: 2018/6/12
     *描述: 去除首尾空格
     **/
    strTrim = (str) => {
      return str.replace(/(^\s*)|(\s*$)/g, "")
    }
    /**
     *作者: pzt
     *时间: 2018/6/12
     *描述: handleInputChange 解决antd Input组件设置value值报错的问题,必须添加onChange事件or设置只读属性
     **/
    handleInputChange =(e)=>{
        this.setState({
            skuNumber: this.strTrim(e.target.value)
        })
    }
    /**
     *作者: pzt
     *时间: 2018/6/12
     *描述: handleInputVal 获取Input的值
     **/
    handleInputVal = (e)=> {
        const input = e.target;
        let val = this.strTrim(input.value);
        // console.log(input.id, input.value);
        if (input.id === "skuNumber" && val !== ""){
            post(types.GET_SEARCHINFO_API, { "sku": val}).then(data=>{
                if (data && data.state === "000001") {
                    this.setState({
                        skuNumber: val,
                        itemsName: data.data.customsName,
                        hsCode: data.data.hs,
                    })
                }
            })
        } else if (input.id === "rate"){
            this.setState({
                rate: this.strTrim(input.value)
            })
        }else{
            this.setState({
                skuNumber: null,
                itemsName: null,
                hsCode: null,
            })
            message.error("请输入正确的SKU编码！");
        }
    }
    handleAddItem = () => {
        const params = {};
        const newobj = {};
        const { skuNumber, itemsName, hsCode, rate, type, id} = this.state;
        
        if (skuNumber === null) {
            message.error("请输入正确的SKU编码！");
        } else {
            switch (type) {
                case 1:
                    if(rate === ""){
                        message.warning("税率信息不能为空！");
                        return false
                    }
                    params["skuNumber"] = skuNumber;
                    params["rate"] = rate;
                    params["name"] = itemsName;
                    params["hs"] = hsCode;
                    break;
                case 2:
                    if(rate === ""){
                        message.warning("税率信息不能为空！");
                        return false
                    }
                    params["skuNumber"] = skuNumber;
                    params["rate"] = rate;
                    params["name"] = itemsName;
                    params["hs"] = hsCode;
                    params["id"] = id;
                    break;
                case 3: 
                    params["id"] = id;
                    break;
                default:
                    break;
            }
            
            params["type"] = type;
            newobj["pageSize"] = levelOptions("pageInit").pagedata;
            newobj["pageNumber"] = levelOptions("pageInit").pagenum;
            post(types.SKURATE_ACTION_API, params).then(data => {
                if (data && data.state === "000001") {
                    message.success(data.msg);
                    this.setState({
                        visible: false,
                        itemsName: null,
                        hsCode: null,
                        rate: null,
                        skuNumber: null,
                    });
                    this.props.getSkuRateList(newobj);
                }
            })
        }
    }
    /**
     *作者: pzt
     *时间: 2018/6/21
     *描述: showDeleteConfirm 删除表格行
     *@param: <> 无参数
     **/
    deleteItem = (record)=>{
        this.setDelCondition(record);
        this.showDeleteConfirm(this);
    }
    setDelCondition = (record)=>{
        this.setState({
            type: 3,
            skuNumber: record.skuNumber,
            id: record.id,
        })
    }
    showDeleteConfirm = (obj) => {
        confirm({
            title: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                obj.handleAddItem()
            },
            onCancel() {
                console.log('Cancel');
            },
    });
}

    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: toggleModal 控制模态框显示隐藏
     *@param: <> 无参数
     **/
    toggleModal = (setStateObj, obj) => {
        this.setState(setStateObj);
    }
    render(){
        const columns = this.columns;
        const { data, total, loading } = this.props.skuRateListModel;
        const { pageNumber, pageSize } = this.state;
        const { visible, itemsName, hsCode, skuNumber,rate,title } = this.state;
        return(
            <div className="padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="002-000001-000002-001">
                            <Button onClick={()=>this.toggleModal({
                                visible: true,
                                type: 1,
                                title: "新增SKU税率信息"
                            })} >新增</Button>
                        </Functions>
                    </div>
                    <div className="pull-right"></div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                               columns={columns}
                               dataSource={datasaddkey(data)}
                               pagination={false}
                               bordered={true}
                               size="small"
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.Paginatihandle}
                        total={total}
                        pageSize={pageSize}
                        onChange={this.Paginatihandle}/>
                </div>
                <div>
                    <Modal
                        // title="新增（修改）SKU税率信息"
                        title={title}
                        visible={visible}
                        onOk={this.handleAddItem}
                        onCancel={()=>this.toggleModal({
                           visible: false,
                           itemsName: null,
                           hsCode: null,
                           rate: null,
                           skuNumber: null,
                        })}
                        className="lgt-customs_set_addTaxRate"
                    >
                        <Row className="margin-td-left margin-td-right">
                            <Col span={5} className="text-right">
                                <label className="col_label">sku编码：<em>*</em></label>
                            </Col>
                            <Col span={17}>
                                <Input
                                    type="text"
                                    id="skuNumber"
                                    placeholder={"请输入SKU"}
                                    value={skuNumber ? skuNumber:null}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputVal}
                                    className="margin-ss-left"
                                />
                                <div style={{ display: "none" }}>没有查询到相关数据</div>
                            </Col>
                        </Row>
                        <Row className="margin-td-left margin-td-right margin-ms-top">
                            <Col span={5} className="text-right">
                                <label className="col_label">报关品名：<em>*</em></label>
                            </Col>
                            <Col span={17}>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder={"输入sku编码自动获取报关品名"}
                                    value={itemsName?itemsName:null}
                                    readOnly={true}
                                    disabled={true}
                                    className="margin-ss-left"
                                />
                            </Col>
                        </Row>
                        <Row className="margin-td-left margin-td-right margin-ms-top">
                            <Col span={5} className="text-right">
                                <label className="col_label">海关编码：<em>*</em></label>
                            </Col>
                            <Col span={17}>
                                <Input
                                    type="text"
                                    id="hs"
                                    placeholder={"输入sku编码自动获取HS"}
                                    value={hsCode?hsCode:null}
                                    readOnly={true}
                                    disabled={true}
                                    className="margin-ss-left"
                                />
                            </Col>
                        </Row>
                        <Row className="margin-td-left margin-td-right margin-ms-top">
                            <Col span={5} className="text-right">
                                <label className="col_label">税率：<em>*</em></label>
                            </Col>
                            <Col span={17}>
                                <Input
                                    type="text"
                                    id="rate"
                                    placeholder={"请输入整数税率"}
                                    value={rate? rate: null}
                                    onChange={this.handleInputVal}
                                    className="margin-ss-left"
                                />
                            </Col>
                        </Row>
                    </Modal>
                </div>
            </div>
        )
    }
}
