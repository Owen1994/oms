/**
 *作者: 任贸华
 *功能描述: 指定发货仓过滤器组件 (暂未用到，勿删)
 *参数说明:
 *时间: 2018/4/16 11:24
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
import {closehandle, datasaddkey, selectValues, unbinds} from "../../../util/baseTool";
import {levelOptions} from "../../../util/options";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const primaryKeyIdoption = levelOptions('过滤器主键')
const primaryKeyStripoption = levelOptions('过滤器条件')
const filterStripoption = levelOptions('过滤器逻辑')

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.filterTableaction({
            data: [], count: 1
        })
    }

    /**
     *作者: 任贸华
     *功能描述: 过滤器主键、条件、逻辑 方法
     *参数说明:
     *时间: 2018/4/17 10:16
     */
    addselectdata = ({name, message, initialValue = undefined, placeholder = '', disabled = this.props.warehouserule.type}, record, index) => {
        let arr = [];
        const id = record.id
        const num = name.match(/\d+/g)[0];
        const key = `primaryKeyId${num}`
        const value = this.props.form.getFieldValue(key)
        if (name.match('primaryKeyId')) {
            arr = primaryKeyIdoption.map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>)
        } else if (name.match('primaryKeyStrip')) {
            if (value == 'orderAmount') {
                arr = primaryKeyStripoption.map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>)
            } else {
                arr = primaryKeyStripoption.filter(v => v.label == '等于').map((v, i) => <Option key={i}
                                                                                               value={v.value}>{v.label}</Option>)
            }
        } else if (name.match('filterStrip')) {
            arr = filterStripoption.map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>)
        }

        const content = <Select disabled={disabled} className={'wfull'} placeholder="请选择">{arr}</Select>;
        let inputid = null;
        if (name.match('primaryKeyId')) {
            inputid = this.props.form.getFieldDecorator('fid' + num, {initialValue: id})(
                <Input type="hidden"/>
            )
        }
        return (
            <FormItem className={'wfull'} {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(name, {
                    rules: [{required: true, message: message}],
                    initialValue: initialValue,
                })(
                    content
                )}

                {inputid}
            </FormItem>)
    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        formloading: true,
    }

    priceHandle = (rule, value, callback) => {
        const numreg = /^(\d|[1-9]\d+)(\.\d{1,2})?$/;
        if (!numreg.test(value)) {
            callback('请数字输入金额')
        } else {
            callback()
        }
    }
    /**
     *作者: 任贸华
     *功能描述: 过滤器值方法
     *参数说明:
     *时间: 2018/4/17 10:15
     */
    addinputdata = ({name, message, placeholder = '', initialValue = '', disabled = this.props.warehouserule.type, required = false, type = 'string',}, record, index) => {
        const num = name.match(/\d+/g)[0];
        const newname = 'primaryValueName';
        const key = `primaryKeyId${num}`
        const value = this.props.form.getFieldValue(key)
        const primaryValueName = record.primaryValueName ? record.primaryValueName.initialValue : ''
        let arr = []

        if (value == 'newChannelCode') {
            arr = <span>{this.props.form.getFieldDecorator(newname + num, {
                    rules: [{required: true, message: '请选择物流渠道'}], initialValue: primaryValueName,
                },
            )(
                <Input disabled={disabled} readOnly placeholder={`请选择物流渠道`} onClick={selectValues({
                    obj: this,
                    url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel',
                    title: '物流渠道',
                    name: newname + num,
                    id: name,
                    searchabled: false
                })}
                       maxLength={100}/>
            )}
                {this.props.form.getFieldDecorator(name, {initialValue: initialValue,})(
                    <Input readOnly maxLength={100} type="hidden"/>
                )}
                <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                    closehandle(e, this)
                }}/></span>
        } else if (value == 'ordersBelongAccount') {
            arr = <span>{this.props.form.getFieldDecorator(newname + num, {
                    rules: [{required: true, message: '请选择销售账号'}], initialValue: primaryValueName,
                },
            )(
                <Input disabled={disabled} readOnly placeholder={`请选择销售账号`} onClick={selectValues({
                    obj: this,
                    url: '/oms/order/grab/motan/SellStoreAccountApi/findStoreListPublic',
                    title: '销售账号',
                    name: newname + num,
                    id: name,
                    searchabled: false
                })}
                       maxLength={100}/>
            )}
                {this.props.form.getFieldDecorator(name, {initialValue: initialValue,})(
                    <Input readOnly maxLength={100} type="hidden"/>
                )}
                <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                    closehandle(e, this)
                }}/></span>
        } else {
            arr = <div>{this.props.form.getFieldDecorator(name, {
                rules: [{validator: this.priceHandle}], initialValue: initialValue,
            })(
                <Input placeholder={placeholder} className={'wfull'} disabled={disabled} maxLength="30"
                />
            )
            }</div>
        }

        return (
            <FormItem className={'wfull'} {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {arr}
            </FormItem>)
    }


    Modalshow = (index) => () => {
        this.props.modalmodelaction({filtervisible: true,})
        this.props.filterTableaction({delkey: index,})
    }


    columns = [{
        title: '主键',
        className: 'column-order',
        dataIndex: 'primaryKeyId',
        render: this.addselectdata,
        width: 120,
    }, {
        title: '条件',
        dataIndex: 'primaryKeyStrip',
        render: this.addselectdata,
        width: 120,
    },
        {
            title: '值',
            dataIndex: 'primaryValueCode',
            render: this.addinputdata,
            width: 100,
        },
        {
            title: '逻辑',
            dataIndex: 'filterStrip',
            render: this.addselectdata,
            width: 120,
        },
        {
            title: '操作',
            dataIndex: 'Operation',
            width: 50,
            render: (text, record, index) => {
                return (
                    ( !this.props.warehouserule.type) ?
                        (
                            <div><a onClick={this.Modalshow(index)}>{'删除'}</a>
                            </div>) : null
                );
            }
        }];


    /**
     *作者: 任贸华
     *功能描述: 过滤器删除
     *参数说明:
     *时间: 2018/4/17 10:10
     */
    ModalhandleOk = () => {
        const data = [...this.props.filtertable.data];
        const delkey = this.props.filtertable.delkey;
        data.splice(delkey, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.filterTableaction({data: data,});
            this.props.modalmodelaction({
                filtervisible: false,
                confirmLoading: false,
            });
        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    /**
     *作者: 任贸华
     *功能描述: 过滤器增加配置
     *参数说明:
     *时间: 2018/4/17 10:09
     */
    handleAdd = () => {
        const {count, data} = this.props.filtertable;
        const newData = {
            key: count + '',
            primaryKeyId: {name: 'primaryKeyId' + count, message: '主键', placeholder: '主键', readonly: false},
            primaryKeyStrip: {name: 'primaryKeyStrip' + count, message: '条件', placeholder: '条件',},
            primaryValueCode: {name: 'primaryValueCode' + count, message: '值', placeholder: '值',},
            filterStrip: {name: 'filterStrip' + count, message: '逻辑', placeholder: '逻辑',},
            Operation: '删除',
        };

        this.props.filterTableaction({data: [...data, newData], count: count + 1,})
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.filtertable;

        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">过滤器</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                        footer={this.props.warehouserule.type ? null : () => <div className={'tc'}><Button
                            className="editable-add-btn" onClick={this.handleAdd}>+增加配置</Button>
                        </div>}
                    />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.filtervisible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('filtervisible')}/>

                </div>
            </div>
        );
    }
}

export default WarehouseOrder
