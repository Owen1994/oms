/**
 * 作者: pzt
 * 描述: 详情页物流信息组件
 * 时间: 2018/4/18 20:28
 **/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Input,
    Select,
    Radio,
    Table,
    Button,
    Modal,
    Row,
    Col,
    message,
} from 'antd'
import '../css/css.css'
import * as config from "../../../../../util/connectConfig";

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
import Modalmodel from './Modalmodel'
import {levelOptions} from "../../../../../util/options";
import axios from "../../../../../util/axios";

class LogisticInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 7},
        wrapperCol: {span: 17}
    }
    state = {
        readonly: true,
        numb1: {len: 0, color: ''},
        numb2: {len: 0, color: ''},
        numb3: {len: 0, color: ''},
        brandSelectorVisible: false,
        categorySelectorVisible: false,
        Selectortype: 'multiple',
        formloading: true,
        visible: false,
        confirmLoading: false,
        waybillNumber: '',
    }


    showModal = (text) => {
        this.setState({
            visible: true,
            waybillNumber: text.text,
        });
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        const paramsObj = {
            type: 1,
            deliveryPlace: 'china',
            name: '',
            waybillNumber: this.state.waybillNumber,
            orderId: this.props.Infos.orderId,
        }
        if(paramsObj){
            axios.post(`${config.api_url}com/yks/oms/order/grab/motan/OrderBadgeApi/manualBadge`, paramsObj)
                .then(response => {
                    if (response.status == 200) {
                        if(response.data.state=="000001"){
                            message.success(response.data.msg);
                        }
                        else{
                            message.error(response.data.msg);
                        }
                    }
                }).catch(e => {
                console.log(e)
            })
        }

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    /**
     * 作者: pzt
     * 描述: refreshLogisticInfo（刷新物流信息）
     * 时间: 2018/4/3 19:48
     * @record <Object> arg1 当前数据对象
     **/
    refreshLogisticInfo = (record) => () =>{
        const paramsObj = {
            platformOrderNumber: this.props.Infos.platformOrderNumber.value,
            waybillNumber: record.waybillNumber,
        }
        if(paramsObj){
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderLogisticsApi/queryLogistcs`, paramsObj)
                .then(response => {
                    if (response.status == 200) {
                        if(response.data.state=='000001'){
                            message.success(response.data.msg);
                        }
                        else{
                            message.error(response.data.msg);
                        }
                    }
                }).catch(e => {
                console.log(e)
            })
        }else{
            message.error("请检查传入的参数！");
        }
    }

    columns = [
        {
            title: '国际物流方式',
            className: 'column-order text-center',
            dataIndex: 'way',
            width: '20%',
            render: text => text,
         },
        {
            title: '跟踪号',
            className: 'text-center',
            dataIndex: 'waybillNumber',
            width: '20%',
            render: (text, record, index) => {
                const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
                const Option = Select.Option;
                return (
                    <div>
                        <div>{text}<a className={'display-none'} onClick={() => {this.showModal({text})}}>修改</a></div>
                    </div>
                 )
            }
        },
        {
            title: '备注',
            className: 'text-center',
            dataIndex: 'deliveryState',
            width: '30%',
            render: text => text,
        },
        /*{
            title: '详情',
            className: 'text-center',
            dataIndex: 'smtorderdetail',
            width: '30%',
            render: (text, record, index) => {
                    return (
                        <div>
                            {record.smtorderdetail.map((v, i)=>{
                                return <p key={i}>{v.time}: {v.content}</p>
                            })}
                            <div className={"text-right overflow-hidden margin-ss-top"}>
                                <Button className={"pull-left margin-sm-right"}>展开详情</Button>
                                <Button className={"pull-left"} onClick={this.refreshLogisticInfo(record)}>刷新</Button>
                                <Button className={"pull-right"}>查看详情</Button>
                            </div>
                        </div>
                    )
            }
        }*/];

    companyIntroductionHandle = (n, v) => (e) => {
        const {value} = e.target;
        var len = value.length
        const reg = new RegExp('(.{' + v + '}).*', 'g');
        var color = ''
        if (len > v) {
            e.target.value = e.target.value.replace(reg, '$1');
            len = v
            color = "#ff0000";
        }
        this.setState({[n]: {len: len, color: color}})
    }

    ModalhandleOk2 = () => {
        const data = [...this.props.tablemodel.data];
        const delkey2 = this.props.tablemodel2.delkey2;
        data.splice(delkey2, 1);
        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.tablemodelaction({data: data,});
            this.props.modalmodelaction({
                visible2: false,
                confirmLoading: false,
            });

        }, 500);
    }
    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    handleAdd2 = () => {
        const {count, data} = this.props.tablemodel;
        const newData = {
            key: count + '',
            No: count + '',
            warehouseOrderId: {name: 'warehouseOrderId' + count, message: '请输入包裹单号', placeholder: '请输入包裹单号',},
            warehouseState: {name: 'warehouseState' + count, message: '请输入分仓订单状态', placeholder: '请输入分仓订单状态',},
            deliveryState: {name: 'deliveryState' + count, message: '请输入发货状态', placeholder: '请输入发货状态',},
            deliveryBay: {name: 'deliveryBay' + count, message: '请输入发货仓', placeholder: '请输入发货仓',},
            channelName: {name: 'channelName' + count, message: '请输入物流渠道', placeholder: '请输入物流渠道',},
            skuNum: {name: 'skuNum' + count, message: '请输入SKU/数量', placeholder: '请输入SKU/数量',},
            weight: {name: 'weight' + count, message: '请输入重量', placeholder: '请输入重量',},
        };

        this.props.tablemodelaction({data: [...data, newData], count: count + 1,})
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const { visible, confirmLoading, ModalText } = this.state;
        const {data} = this.props.tablemodel;
        const columns = this.columns;

        return (
            <div className="newCluenk logistic-info noborderCluenk">
                <div className="title" id="logistic-info" ref={'logisticInfo'}>物流信息</div>
                <div className="content">
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={data}
                    />
                    <Modal title="标记追踪号"
                           visible={visible}
                           onOk={this.handleOk}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleCancel}
                           okText='提交'
                    >
                        <div className="edit-trackid">
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="关联平台单号"
                                    >

                                        {getFieldDecorator('platformOrderNumber', {
                                            rules: [{
                                                required: false,
                                            }],
                                        })(
                                            <Input maxLength={100} disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="物流渠道名称"
                                    >

                                        {getFieldDecorator('orderStateId', {
                                            rules: [{required: false, message: '请选择'}], initialValue: ''
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择">
                                                {levelOptions('企业性质').map(item => {
                                                    return (
                                                        <Option key={item.value} value={item.value}
                                                        >
                                                            {item.label}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem  {...this.formItemLayout}
                                               label="货物跟踪号"
                                    >

                                        {getFieldDecorator('waybillNumber', {
                                            rules: [{
                                                required: false,
                                            }],
                                            initialValue: this.props.tablemodel.waybillNumber || 111,
                                        })(
                                            <Input maxLength={100} disabled={true} />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem {...this.formItemLayout}
                                              label="发货类型"
                                    >

                                        {getFieldDecorator('orderStateId', {
                                            rules: [{required: false, message: '请选择'}], initialValue: ''
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择">
                                                {levelOptions('企业性质').map(item => {
                                                    return (
                                                        <Option key={item.value} value={item.value}
                                                        >
                                                            {item.label}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className={'text-center dead-time-color'}>在第一次填写完发货通知后的10天内有2次修改机会</div>
                                </Col>
                            </Row>
                        </div>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default LogisticInfo
