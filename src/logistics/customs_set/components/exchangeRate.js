import React from 'react'

import { Link } from 'react-router-dom'
import {
    Button,
    Spin,
    Table,
    Pagination,
    Modal,
    Input,
    Select,
    Row,
    Col,
    message,
} from 'antd'
const Option = Select.Option
import {levelOptions} from "../../../util/options"
import {datasaddkey} from "../../../util/baseTool"
import {post} from "../../../util/axios"
import * as types from "../constants/ActionTypes"
import Functions from '../../../components/functions'
export default class Tablelist extends React.Component{

    state = {
        visible: false,
        pageNumber: 1,
        pageSize: 10,
        rateVal: null,
        title: '',
    }
    columns = [
        {
            title: '币种',
            dataIndex: 'currency',
            render: (text, record, index) => text
        },
        {
            title: '名称',
            dataIndex: 'currencyName',
            render: (text, record, index) => text
        },
        {
            title: '汇率',
            dataIndex: 'rate',
            render: (text, record, index) => text
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
            render: (text, record, index) => text,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                <div className="lgt-customs_set_btns">
                    <Functions {...this.props} functionkey="002-000001-000002-002">
                        <span
                            onClick={() => this.toggleModal({
                            visible: true,
                            type: 2,
                            id: record.id,
                            rateVal: record.rate,
                            currency: record.currency,
                            currencyName: record.currencyName,
                            title: "修改汇率信息"
                        })}>修改</span>
                    </Functions>
                </div>
            ),
        }]
    
    Paginatihandle = (page, pageSize)=> {
        // console.log(page, pageSize)
        const params = {};
        this.setState({
            pageNumber: page,
            pageSize: pageSize
        });
        params["pageNumber"] = page;
        params["pageSize"] = pageSize;
        this.props.getRateList(params);
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
     *描述: handleInputVal 获取Input的值
     **/
    handleInputVal = (e)=> {
        // console.log(e.target.id, e.target.value)
        const input = e.target;
        this.setState({
            rateVal: this.strTrim(input.value)
        });
    }
    handleAddItem = () => {
        const params = {};
        const newobj = {};
        const selectedVal = levelOptions('currency')[0].value;
        const { rateVal, type, id, currencyName} = this.state;
        if(rateVal === null || rateVal === ""){
            message.error("税率不能为空！");
        }else{
            
            if(type !== 1){
                params["id"] = id;
                params["currencyName"] = currencyName;
            }
            params["currency"] = selectedVal;
            params["type"] = type;
            params["rate"] = rateVal;
            newobj["pageNumber"] = levelOptions("pageInit").pagenum;
            newobj["pageSize"] = levelOptions("pageInit").pagedata;
            post(types.RATE_ACTION_API, params).then(data => {
                if (data && data.state === "000001") {
                    message.success(data.msg);
                    this.setState({
                        visible: false,
                        rateVal: null,
                        currency: null,
                        currencyName: null,
                    });
                    this.props.getRateList(newobj);
                }
            })
        }
    }
    /**
     *作者: pzt
     *时间: 2018/6/8
     *描述: toggleModal 控制模态框显示隐藏
     *@param: <> 无参数
     **/
    toggleModal = (setStateObj) => {
        this.setState(setStateObj);
    }

    // 下拉框变化时的回调
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    render(){
        const columns = this.columns;
        const { visible, pageNumber, pageSize,rateVal,title } = this.state;
        const { data, total, loading } = this.props.rateListModel;
        return(
            <div className="padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-right">
                        <Functions {...this.props} functionkey="002-000001-000002-002">
                              <Button onClick={()=>this.toggleModal({
                                  visible: true,
                                  type: 1,
                                  title: "新增汇率信息"
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
                    <Modal title={title}
                           visible={visible}
                           onOk={this.handleAddItem}
                           onCancel={()=>this.toggleModal({
                               visible: false,
                               id: null,
                               rateVal: null,
                               currency: null,
                               currencyName: null,
                           })}
                           className="lgt-customs_set_addTaxRate"
                    >
                        <Row className="margin-td-left margin-td-right">
                            <Col span={5} className="text-right">
                                <label className="col_label">币种：</label>
                            </Col>
                            <Col span={17}>
                                <Select
                                    defaultValue={levelOptions('currency')[0].value}
                                    onChange={this.handleChange}
                                    className="margin-ss-left ant-xs-row"
                                >
                                    {levelOptions('currency').map((item, index) =>{
                                        return (
                                            <Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            </Col>
                        </Row>

                        <Row className="margin-td-left margin-td-right margin-ms-top">
                            <Col span={5} className="text-right">
                                <label className="col_label">汇率：<em>*</em></label>
                            </Col>
                            <Col span={17}>
                                <Input
                                    type="text"
                                    id="sku"
                                    placeholder={"请输入整数税率"}
                                    value={rateVal?rateVal : null}
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
