/**
*作者: 任贸华
*功能描述: 付款记录字段配置模块
*参数说明:
*时间: 2018/4/16 11:39
*/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import axios from "../../../util/axios";
import {datasaddkey} from "../../../util/baseTool";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }

    deleteshow = (index) => () => {
        this.props.modalmodelaction({methodDelvisible: true,})
        this.props.charactertablaction({delkey: index,})
    }

    addselectdata = ({name, message, initialValue = undefined, placeholder = '', datakey, which}) => {

        const select = this.props.charactertable.select[datakey] ? this.props.charactertable.select[datakey][which] ? this.props.charactertable.select[datakey][which] : [] : [];
        const selectoption = select.map((v, i) => <Option key={i} value={v.key}>{v.name}</Option>)
        return (
            <FormItem className={'wfull'} {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(name, {
                    rules: [{required: true, message: message}], initialValue: initialValue
                })(
                    <Select className={'wfull'} placeholder="请选择">
                        {selectoption}
                    </Select>
                )}
            </FormItem>)
    }

    editshow = (record) => () => {
        this.props.modalmodelaction({methodEditvisible: true})
        this.props.charactertablaction({record: record})
    }
    
    editOK = () => {
        const {record} = this.props.charactertable
        const id = record.id;
        const suffix = record.suffix.name
        const state = record.state.name
        const goodschannel = record.goodschannel.name
        const Warehouse = record.Warehouse.name
        const obj = this.props.form.getFieldsValue([suffix, state, goodschannel, Warehouse])
        const newobj = {
            id: id,
            suffix: obj[suffix],
            state: obj[state],
            goodschannel: obj[goodschannel],
            Warehouse: obj[Warehouse]
        }

        axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/addOrUpdateRuleSkuConvert`, newobj)
            .then(response => {

                if (response.status == 200) {
                    if (response.data.state == 200) {
                        message.success(response.data.msg)
                        this.props.modalmodelaction({skuprefixvisible: false})
                    }
                }
            }).catch(e => {
            console.log(e)
        })

    }

    columns = [{
        title: '付款记录API字段',
        dataIndex: 'methodfield',
        render: this.addselectdata,
        width:340,

    }, {
        title: '转换后字段',
        dataIndex: 'methodfieldafter',
        render: this.addselectdata
    },
        {
            title: '操作',
            dataIndex: 'Operation',
            width: 80,
            render: (text, record, index) => {
                return (
                        <a className={'viewbtn'} onClick={this.deleteshow(index)}>{'删除'}</a>
                );
            }
        }];

    deleteOk = () => {
        const methoddata = [...this.props.charactertable.methoddata];

        const delkey = this.props.charactertable.delkey;
        methoddata.splice(delkey, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.charactertablaction({methoddata: methoddata,});
            this.props.modalmodelaction({
                methodDelvisible: false,
                confirmLoading: false,
            });
        }, 500);
    }


    Cancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    handleAdd = () => {
        const {methodcount, methoddata} = this.props.charactertable;
        const newData = {
            key: methodcount + '',
            methodfield: {
                name: 'methodfield' + methodcount,
                message: '付款记录API字段',
                placeholder: '付款记录API字段',
                readonly: false,
                datakey: 'selectArray',
                which: 'beforePayRecordFieldConfig'
            },
            methodfieldafter: {
                name: 'methodfieldafter' + methodcount,
                message: '转换后字段',
                placeholder: '转换后字段',
                datakey: 'selectArray',
                which: 'afterPayRecordFieldConfig'
            },
            Operation: '删除',
        };

        this.props.charactertablaction({methoddata: [...methoddata, newData], methodcount: methodcount + 1,})
    }

    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {methoddata} = this.props.charactertable;
        const columns = this.columns;
        const newdata = datasaddkey(methoddata)

        return (

            <div className="newCluenk">
                <div className="title">付款记录字段配置</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newdata}
                        bordered scroll={{  y: 217 }}
                        footer={() => <div className={'tc'}><Button
                            className="editable-add-btn" onClick={this.handleAdd}>+增加配置</Button>
                        </div>}
                    />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.methodDelvisible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.deleteOk}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.Cancel('methodDelvisible')}/>

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.methodEditvisible,
                        ModalText: '确认修改吗?',
                    }}
                                 onOk={this.editOK}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.Cancel('methodEditvisible')}/>


                </div>
            </div>

        );
    }
}

export default WarehouseOrder
