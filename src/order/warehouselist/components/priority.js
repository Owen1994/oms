/**
 *作者: 任贸华
 *功能描述: 指定发货仓优先级组件
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
import {datasaddkey} from "../../../util/baseTool";
import {levelOptions} from "../../../util/options";
import {fetchwarehouseDeliverPosts} from "../actions/priority";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const primaryKeyIdoption = levelOptions('过滤器主键')
const primaryKeyStripoption = levelOptions('过滤器条件')
const filterStripoption = levelOptions('过滤器逻辑')
const warehouseCodeoption = levelOptions('仓库')

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.priorityTableaction({
            data: [{
                key: '1',
                priority: {name: 'priority1', message: '优先级', placeholder: '优先级', readonly: false},
                warehouseCode: {name: 'warehouseCode1', message: '仓库', placeholder: '仓库',},
                Operation: '删除',
            }],
            count: 2
        })
    }

    /**
     *作者: 任贸华
     *功能描述: 优先级、仓库 方法
     *参数说明:
     *时间: 2018/4/17 10:20
     */
    addselectdata = ({name, message, initialValue = undefined, placeholder = '', disabled = this.props.warehouserule.type}, record, index) => {
        let arr = [];
        const id = record.id
        const num = name.match(/\d+/g)[0];
        if (name.match('warehouseCode')) {
            arr = warehouseCodeoption.map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>)
        }
        else if (name.match('priority')) {
            arr = levelOptions('优先级').map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>)
        }
        const content = <Select disabled={disabled} className={'wfull'} placeholder="请选择">{arr}</Select>;

        let inputid = null;
        if (name.match('priority')) {
            inputid = this.props.form.getFieldDecorator('pid' + num, {initialValue: id})(
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
                    initialValue: initialValue, onChange: (value) => {
                        this.selectChange(name, value)
                    }
                })(
                    content
                )}
                {inputid}
            </FormItem>)
    }

    /**
     *作者: 任贸华
     *功能描述: 优先级、仓库去重
     *参数说明:
     *时间: 2018/4/17 10:20
     */
    selectChange = (name, value) => {
        const len = this.props.prioritytable.length;
        const newname = name.replace(/(.*?)\d+/, '$1')
        const prioritylist = this.props.prioritytable.data.filter(v => v[newname].name != name)
        let repeat = '';
        for (let i = 0, l = prioritylist.length; i < l; i++) {

            if (this.props.form.getFieldValue(prioritylist[i][newname].name) == value) {
                repeat = prioritylist[i][newname].name;
                break
            }
        }
        this.props.form.setFieldsValue({[repeat]: undefined})

    }


    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        formloading: true,
    }
    selectValues = ({url, title, name, id, type = 'single'}) => () => {
        this.props.searchVluesaction({url, title, name, id, visible: true, type})
        this.props.fetchsearchValues({url,})
    }


    Modalshow = (index) => () => {
        this.props.modalmodelaction({priorityvisible: true,})
        this.props.priorityTableaction({delkey: index,})
    }


    columns = [{
        title: '优先级',
        className: 'column-order',
        dataIndex: 'priority',
        render: this.addselectdata,
        width: 120,
    }, {
        title: '仓库',
        dataIndex: 'warehouseCode',
        render: this.addselectdata,
        width: 120,
    },
        {
            title: '操作',
            dataIndex: 'Operation',
            width: 50,
            render: (text, record, index) => {
                return (
                    (this.props.prioritytable.data.length > 1 && !this.props.warehouserule.type) ?
                        (
                            <div><a onClick={this.Modalshow(index)}>{'删除'}</a>
                            </div>) : null
                );
            }
        }];

    /**
     *作者: 任贸华
     *功能描述: 删除仓库
     *参数说明:
     *时间: 2018/4/17 10:17
     */
    ModalhandleOk = () => {
        const data = [...this.props.prioritytable.data];

        const delkey = this.props.prioritytable.delkey;
        data.splice(delkey, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.priorityTableaction({data: data,});
            this.props.modalmodelaction({
                priorityvisible: false,
                confirmLoading: false,
            });
        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    /**
     *作者: 任贸华
     *功能描述: 增加仓库
     *参数说明:
     *时间: 2018/4/17 10:17
     */
    handleAdd = () => {
        const {count, data} = this.props.prioritytable;
        const newData = {
            key: count + '',
            priority: {name: 'priority' + count, message: '主键', placeholder: '主键', readonly: false},
            warehouseCode: {name: 'warehouseCode' + count, message: '条件', placeholder: '条件',},
            Operation: '删除',
        };

        this.props.priorityTableaction({data: [...data, newData], count: count + 1,})
    }


    render() {

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const {data} = this.props.prioritytable;


        const columns = this.columns;

        return (
            <div className="newCluenk">
                <div className="title">发货仓和优先级</div>
                <div className="content">

                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                        bordered
                        footer={this.props.warehouserule.type ? null : () => <div className={'tc'}><Button
                            className="editable-add-btn" onClick={this.handleAdd}>+增加仓库</Button>
                        </div>}
                    />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.priorityvisible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('priorityvisible')}/>

                </div>
            </div>
        );
    }
}

export default WarehouseOrder
