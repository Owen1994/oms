/**
 *作者: 唐峰
 *功能描述: 仓库信息组件
 *参数说明:
 *时间: 2018/4/17 11:10
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
import {skuprefixTableaction} from "../actions";
import axios from "../../../util/axios";
import {dataPack, selectValues, closehandle, datasaddkey, functions} from "../../../util/baseTool";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class skuprefix extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        formloading: true,
        handleStatus:false,
    }

    //仓库名称请求
    addfetchdata = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                    rules: [{required: required, message: message, type: type}], initialValue: initialValue,})
                (<Input readOnly disabled={this.state.handleStatus} placeholder={placeholder} onClick={selectValues({
                    obj:this,
                    url: ' /oms/order/manage/motan/IPackageApi/getPackageWarehouse',
                    title: '仓库名称',
                    name: name,
                    id: '_'+name,
                    searchabled:false
                })}/>)}
            <Icon type="close-circle" className={'commonClose'} onClick={(e) => {closehandle(e, this)}}/>
        </FormItem>)
    
    //输入框的渲染方法
    addinputdata = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type},], initialValue: initialValue,
            })(
                <Input disabled={this.state.handleStatus} placeholder={placeholder} className={'ant-xs-row'} readOnly={readonly} maxLength="30"/>
            )}
        </FormItem>)

    //删除一条数据      
    Modalshow1 = (index) => () => {
        this.props.skuprefixModelaction({visible: true,})
        this.props.skuprefixTableaction({delkey: index,})
    }

    //状态的渲染方法
    addselectdata = ({name, message, initialValue = 0, placeholder = ''}) =>(
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: Number(initialValue)
            })(
                <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
                    <Option value={0}>启用</Option>
                    <Option value={1}>停用</Option>
                </Select>
            )}
        </FormItem>)
    
    //表头数据(详情)
    columns1 = [{
        title: '状态',
        className: '',
        dataIndex: 'isAvailable',
        width: 70,
        render: (text) => {
            if(text === 0){
                text='启用'
            }else if(text === 1){
                text='停用'
            }
            return text;
        }
    },{
        title: '仓库名称',
        dataIndex: 'warehouseName',
        width: 80,
    },{
        title: '仓库的渠道标识',
        width: 160,
        dataIndex: 'warehouseChannelSign',
        render: text => text,
    }];
    
    //表头数据(修改 新增)
    columns2 = [
        {
        title: '状态',
        dataIndex: 'isAvailable',
        width: 80,
        render: this.addselectdata,
    },
        {
        title: '仓库名称',
        dataIndex: 'warehouseName',
        render: this.addfetchdata,
        width: 120,
    }, {
        title: '仓库的渠道标识',
        dataIndex: 'warehouseChannelSign',
        render: this.addinputdata,
        width: 120,
    },{
        title: '操作',
        dataIndex: 'Operation',
        width: 80,
        render: (text, record, index) => {
            let oldLength = this.props.skuprefixtable.oldLength;
            return (
                index+1 > oldLength ?
                    (<div>
                        <a onClick={this.Modalshow1(index)} >{'删除'}</a>
                    </div>) : null
            )
        }
    }];

    //弹窗上确认按钮
    ModalhandleOk1 = () => {
        const data = [...this.props.skuprefixtable.data];
        const delkey = this.props.skuprefixtable.delkey;
        data.splice(delkey, 1);
        this.props.skuprefixModelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.skuprefixTableaction({data: data,});
            this.props.skuprefixModelaction({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
    }

    //弹窗上取消按钮
    ModalhandleCancel1 = (value) => () => {
        this.props.skuprefixModelaction({[value]: false})
    }
    
     // 新增一条仓库信息
    handleAdd = () => {
        if(!this.props.Infos.isAdd && this.props.buttonType.buttonType=='3'){
            message.error('请先新增渠道信息!')
            return false
        }
        const {count, data} = this.props.skuprefixtable;
        const newData = {
            key: count + '',
            No: count + '',
            isAvailable: {name: 'editIsAvailable' + count, message: '状态', placeholder: '请选择状态',},
            warehouseName: {name: 'editWarehouseName' + count, message: '请选择仓库名称', placeholder: '请选择仓库名称',},
            warehouseCode: {name: 'editWarehouseCode' + count, message: '请输入仓库编码', placeholder: '请输入仓库编码',},
            warehouseChannelSign: {name: 'editWarehouseChannelSign' + count, message: '仓库的渠道标识', placeholder: '仓库的渠道标识',},
        };
        this.props.skuprefixTableaction({data: [...data, newData], count: count + 1,})
    }

    //保存按钮
    handleSave = () =>{
        this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const template = {
                        channelWarehouseDetail: [{editIsAvailable: '', _editWarehouseName: '', editWarehouseChannelSign: '',editWarehouseName:''}],
                    }
                    const newArr = [],newobj = {};
                    const data = dataPack(template, values)
                    data.channelWarehouseDetail.map((v,i)=>{
                        newArr.push({
                            isAvailable: Number(v.editIsAvailable),     //状态
                            newChannelCode : this.props.Infos.newChannelCode.value,     
                            // warehouseName:v.editWarehouseName,      //仓库名称 (不需要向后台传)
                            warehouseCode:v._editWarehouseName || this.props.skuprefixtable.data[i].warehouseCode.initialValue, //仓库编码
                            warehouseChannelSign:v.editWarehouseChannelSign,        //仓库渠道标识
                        })
                    })
                    newobj.channelWarehouseDetail = newArr
                    newobj.newChannelCode = this.props.Infos.newChannelCode.value;
                    const buttontype = this.props.buttonType.buttonType;
                    const postUrl = buttontype === '2'?`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailWarehouse`:`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetailWarehouse`;
                    axios.post(postUrl, newobj)
                        .then(response => {
                            if (response.status == 200) {
                                if (response.data.state == '000001') {
                                    this.setState({
                                        handleStatus:!this.state.handleStatus
                                    })
                                    message.success(`${response.data.msg ? response.data.msg : '成功!'}`);
                                } else {
                                    message.error(response.data.msg)
                                }
                            }
                        }).catch(e => {
                            message.error("服务器请求错误!")
                        })
                }
            }
        )
    }

    //修改按钮 
    handleStatu = () =>{
        this.setState({
            handleStatus:!this.state.handleStatus
        })
    }
   
    //组件销毁时
    componentWillUnmount(){
        this.props.form.resetFields();
    }

    render() {
        const buttontype = this.props.buttonType.buttonType; //获取父页面的按钮类型
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,resetFields} = this.props.form;
        const {data} = buttontype=='1'?this.props.tablemodel5:this.props.skuprefixtable;    //表格数据
        const newdata = datasaddkey(data);
        const columns = buttontype=='1'?this.columns1:this.columns2;
        return buttontype == '1'?(
            <div className="content">
                     <Table  columns={columns} dataSource={newdata} bordered
                            pagination={false}/>
            </div>
            ):(
            <div className="newCluenk">
                <div className="content channelall">
                    <Button onClick={this.handleAdd} className={'margin-ss-bottom'}>新增</Button>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newdata}
                        bordered
                        footer={() => (<div className={'text-center'}>
                            <Button
                                className={'margin-ms-right'}
                                disabled={this.state.handleStatus}
                                type="primary" 
                                onClick={this.handleSave}>保存</Button>
                            <Button
                                className="editable-add-btn"
                                onClick={this.handleStatu}
                                disabled={!this.state.handleStatus}
                            >
                                修改
                            </Button>
                        </div>)}
                    />

                    <Modalmodel  {...{
                        ...this.props.skuprefixModalmodel,
                        visible: this.props.skuprefixModalmodel.visible,
                        ModalText: '确认删除吗?',}}
                        onOk={this.ModalhandleOk1}
                        confirmLoading={this.props.skuprefixModalmodel.confirmLoading}
                        onCancel={this.ModalhandleCancel1('visible')}/>
                </div>
            </div>
        );
    }
}

export default skuprefix
