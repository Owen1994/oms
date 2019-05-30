/**
 *作者: 唐峰
 *功能描述: 第三方信息组件
 *参数说明:
 *时间: 2018/4/17 11:11
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
    Divider,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import {thirdinfoTableaction} from "../actions";
import axios from "../../../util/axios";
import {dataPack, selectValues, datasaddkey, functions} from "../../../util/baseTool";
import {levelOptions} from '../../../util/options';


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Thirdinfo extends Component {

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
                <Input disabled={this.state.handleStatus} placeholder={placeholder} className={'ant-xs-row'} readOnly={readonly} />
            )}
        </FormItem>)

    //删除一条数据 
    Modalshow3= (index) => () => {
        this.props.thirdModalmodelaction({visible: true,})
        this.props.thirdinfoTableaction({delkey: index,})
    }

    //下拉选择状态
    addselectdata = ({name, message, initialValue = 0, placeholder = ''}) => (
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
    
    //下拉选择系统
    addSelectSty = ({name, message, initialValue = 0, placeholder = ''}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue || '',
            })(
                <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
                    {levelOptions('系统名称').map(item => {
                        return (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        )
                    })}
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
    }, {
        title: '系统名称',
        dataIndex: 'systemCode',
        width: 80,
        render: (text)=>{
            if(text == 'erp'){
                text = '老erp系统'
            }else if(text == 'preferred'){
                text = '物流优选系统'
            }else if(text == 'wms'){
                text = '海外仓WMS'
            }else if(text == 'hzSaveSell'){
                text = '汇总进销存'
            }else if(text == 'oms'){
                text = 'oms订单管理系统'
            }else if(text == 'hzWarehouse'){
                text = '汇总分仓'
            }else{
                return false
            }
            return text
        }
    },{
        title: '系统渠道简称',
        width: 100,
        dataIndex: 'systemChannelCode',
    },{
        title: '系统渠道中文名称',
        width: 100,
        dataIndex: 'systemCnName',
    },{
        title: '系统渠道英文名称',
        width: 100,
        dataIndex: 'systemEnName',
    },{
        title: '渠道扩展信息',
        width: 100,
        dataIndex: 'channelInfo',
    }];

    //表头数据(修改 新增)
    columns2 = [{
        title: '状态',
        dataIndex: 'isAvailable',
        width: 80,
        render: this.addselectdata,
    },{
        title: '系统名称',
        dataIndex: 'systemCode',
        render: this.addSelectSty,
        width: 80,
    },{
        title: '渠道简称（第三方）',
        width: 100,
        dataIndex: 'systemChannelCode',
        render: this.addinputdata,
    },{
        title: '渠道中文名称（第三方）',
        width: 100,
        dataIndex: 'systemCnName',
        render: this.addinputdata,
    },{
        title: '渠道英文名称（第三方）',
        width: 100,
        dataIndex: 'systemEnName',
        render: this.addinputdata,
    },{
        title: '渠道扩展信息',
        width: 100,
        dataIndex: 'channelInfo',
        render: this.addinputdata,
    },{

        title: '操作',
        width: 80,
        dataIndex: 'Operation',
        render: (text, record, index) => {
            let oldLength = this.props.thirdinfotable.oldLength;
            return (
                index+1 > oldLength ?
                    (<div>
                        <a onClick={this.Modalshow3(index)} >{'删除'}</a>
                    </div>) : null
            )
        }
    }];



    ModalhandleOk3 = () => {
        const data = [...this.props.thirdinfotable.data];
        const delkey = this.props.thirdinfotable.delkey;
        data.splice(delkey, 1);
        this.props.thirdModalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.thirdinfoTableaction({data: data,});
            this.props.thirdModalmodelaction({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
    }
    ModalhandleCancel3 = (value) => () => {
        this.props.thirdModalmodelaction({[value]: false})
    }

    //新增按钮
    handleAdd = () => {
        if(!this.props.Infos.isAdd && this.props.buttonType.buttonType=='3'){
            message.error('请先新增渠道信息!')
            return false
        }
        const {count, data} = this.props.thirdinfotable;
        const newData = {
            key: count + '',
            No: count + '',
            isAvailable: {name: 'thirdIsAvailable' + count, message: '状态', placeholder: '请选择状态',},
            systemCode: {name: 'thirdSystemCode' + count, message: '请选择系统名称', placeholder: '请选择系统名称',},
            systemChannelCode: {name: 'thirdSystemChannelCode' + count, message: '请输入渠道简称', placeholder: '请输入渠道简称',},
            systemEnName: {name: 'thirdSystemEnName' + count, message: '渠道英文名称', placeholder: '渠道英文名称',},
            systemCnName: {name: 'thirdSystemCnName' + count, message: '渠道中文名称', placeholder: '渠道中文名称',},
            channelInfo: {name: 'thirdChannelInfo' + count, message: '渠道扩展信息', placeholder: '渠道扩展信息',},
        };
        this.props.thirdinfoTableaction({data: [...data, newData], count: count + 1,})
    }


    //保存按钮
    handleSave = () =>{
        this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const template = {
                        channelMappingDetail: [{thirdIsAvailable: '', thirdSystemCode: '', thirdSystemChannelCode: '',thirdSystemEnName: '',thirdSystemCnName: '',thirdChannelInfo: '' }],
                    }
                    const newArr = [],newobj = {};
                    const data = dataPack(template, values)
                    data.channelMappingDetail.map((v,i)=>{
                        newArr.push({
                            isAvailable: Number(v.thirdIsAvailable),
                            newChannelCode : this.props.Infos.newChannelCode.value,
                            systemCode:v.thirdSystemCode,
                            systemChannelCode:v.thirdSystemChannelCode,
                            systemEnName: v.thirdSystemEnName,
                            systemCnName:v.thirdSystemCnName,
                            channelInfo:v.thirdChannelInfo
                        })
                    })
                    newobj.channelMappingDetail = newArr
                    newobj.newChannelCode = this.props.Infos.newChannelCode.value;
                    const buttontype = this.props.buttonType.buttonType;
                    const postUrl = buttontype === '2'?`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailMapping`:`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetailMapping`;
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
                        console.log(e);
                    })
                }
            }
        )
    }


    //修改按钮
    handleStatu = ()=>{
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
        const {data} = buttontype == '1'?this.props.tablemodel3:this.props.thirdinfotable;
        const newdata = datasaddkey(data);
        const columns = buttontype=='1'?this.columns1:this.columns2;

        return buttontype=='1'?(
            <div className="content">
                <Table  columns={columns} dataSource={newdata} bordered pagination={false}/>
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
                        ...this.props.thirdModalmodel,
                        visible: this.props.thirdModalmodel.visible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk3}
                                 confirmLoading={this.props.thirdModalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel3('visible')}/>

                </div>
            </div>
        );
    }
}

export default Thirdinfo