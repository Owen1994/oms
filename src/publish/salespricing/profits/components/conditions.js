import React from 'react';
import { Form,Row,Col,Input,Button,InputNumber } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import CSelect from '../../../../components/cselect'
import {
    GET_CURRENCY,
    GET_DEPOT,
    GET_DESTINATION,
    GET_PLATFORM,
    GET_SHIPMENTPORT,
    GET_SITE,
    GET_TRANSPORT
} from '../constants/api'
import {message} from "antd/lib/index";

class Conditions extends React.Component{

    componentDidMount(){
        // console.log("子组件");
    }
    /**
     * 作者:
     * 描述: 下拉框异步加载数据前的校验函数
     * 时间: 2018/9/3 11:08
     * @param <number> fields 要拦截的字段名集合 "no" 代表不做拦截
     * 需返回布尔值供组件内部做判断
     **/
    handleFocusBefore = (fields)=>{
        const {getFieldValue} = this.props.form;
        const platformCode = getFieldValue("data[platformCode]");
        if(fields === "no"){
            return true
        }
        let flag = true;
        if(fields instanceof Array && fields.length > 0){
            for(let i =0; i < fields.length; i++){
                if(fields[i] === "platformCode"){
                    if(!platformCode){
                        message.info("请先选择平台");
                        flag = false;
                        break;
                    }
                }
            }
        }else{
            message.warning("校验字段传入格式有误");
        }
        return flag;
    }

    render(){
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {handleSubmit, handleReset,pricingStateData} = this.props;
        const {pricingFinish} = pricingStateData;
        const {currency, depot, destination, platform, shipmentPort,transport,site} = pricingStateData;
        const defaultTransport = transport.map(v=>{
            if(v){ return v.key }
        });
        const formItemLayout = {
            labelCol: {
                sm: { span: 10 },
            },
            wrapperCol: {
                sm: { span: 14 },
            },
        };
        return (
            <div className={"pricing-system-pricing_conditions"}>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col span={7}>
                            <FormItem
                            {...formItemLayout}
                            label="平台"
                        >
                            {getFieldDecorator('data[platformCode]', {
                                initialValue: platform.length > 0 ? platform[0].key : '',
                                rules: [
                                    { required: true, message: '请选择平台' },
                                ],
                            })(
                                <CSelect
                                    list={platform} // 默认值列表
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={GET_PLATFORM}
                                    params={{searchColumn: 'name'}} // 搜索参数
                                    placeholder={"请选择平台"}
                                    // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                />
                            )}
                        </FormItem>
                        </Col>
                        <Col span={7} >
                            <FormItem
                            {...formItemLayout}
                            label="起运港"
                        >
                            {getFieldDecorator('data[shipmentPortCode]', {
                                initialValue: shipmentPort.length > 0 ? shipmentPort[0].key : '',
                                rules: [
                                    { required: true, message: '请选择起运港' },
                                ],
                            })(
                                <CSelect
                                    list={shipmentPort} // 默认值列表
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={GET_SHIPMENTPORT}
                                    params={{searchColumn: 'name'}} // 搜索参数
                                    placeholder={'请选择起运港'}
                                />
                            )}
                        </FormItem>
                        </Col>
                    </Row>
                    <Row className={"margin-ss-top"}>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="站点"
                            >
                                {getFieldDecorator('data[siteCode]', {
                                    initialValue: site.length > 0 ? site[0].key : '',
                                    rules: [
                                        { required: true, message: '请选择站点' },
                                    ],
                                })(
                                    <CSelect
                                        list={site} // 默认值列表
                                        code='key' // 列表编码字段
                                        name='key' // 列表名称字段
                                        url={GET_SITE}
                                        params={{data:{platformCode: getFieldValue("data[platformCode]")}}} // 搜索参数
                                        placeholder={'请选择站点'}
                                        onBeforeFocus={()=>this.handleFocusBefore(["platformCode"])}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="运输方式"
                            >
                                {getFieldDecorator('data[transportCode]', {
                                    initialValue: defaultTransport,
                                    rules: [
                                        { required: true, message: '请选择运输方式' },
                                    ],
                                })(
                                    <CSelect
                                        list={transport} // 默认值列表
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={GET_TRANSPORT}
                                        params={{searchColumn: 'name'}} // 搜索参数
                                        mode='multiple'
                                        placeholder={'请选择运输方式'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={"margin-ss-top"}>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="利润率(%)"
                            >
                                {getFieldDecorator('data[profitRate]', {
                                    rules: [
                                        { required: true, message: '请输入利润率' },
                                    ],
                                })(
                                    <InputNumber
                                        style={{width: "100%"}}
                                        placeholder={'请输入利润率'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="目的仓(头程)"
                            >
                                {getFieldDecorator('data[depotCode]', {
                                    initialValue: depot.length > 0 ? depot[0].key : '',
                                    rules: [
                                        { required: true, message: '请选择目的仓(头程)' },
                                    ],
                                })(
                                    <CSelect
                                        list={depot} // 默认值列表
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={GET_DEPOT}
                                        params={{searchColumn: 'name'}} // 搜索参数
                                        placeholder={'请选择目的仓（头程）'}
                                        // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={"margin-ss-top"}>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="SKU"
                            >
                                {getFieldDecorator('data[skus]', {
                                    rules: [
                                        { required: true, message: '请输入SKU，支持多个换行搜索' },
                                    ],
                                })(
                                    <TextArea
                                        row={8}
                                        style={{height: 85, marginTop: 4}}
                                        placeholder={'请输入SKU，支持多个换行搜索'}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="目的地"
                            >
                                {getFieldDecorator('data[destinationCode]', {
                                    initialValue: destination.length > 0 ? destination[0].key : '',
                                    rules: [
                                        { required: true, message: '请选择目的地' },
                                    ],
                                })(
                                    <CSelect
                                        list={destination} // 默认值列表
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={GET_DESTINATION}
                                        params={{searchColumn: 'name'}} // 搜索参数
                                        // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择目的地'}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="币种"
                                className={"margin-ss-top"}
                            >
                                {getFieldDecorator('data[currency]', {
                                    initialValue:currency.length > 0 ? currency[0].key : '',
                                    rules: [
                                        { required: true, message: '请选择币种' },
                                    ],
                                })(
                                    <CSelect
                                        list={currency} // 默认值列表
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={GET_CURRENCY}
                                        params={{searchColumn: 'name'}} // 搜索参数
                                        placeholder={'请选择币种'}
                                        handleFilter = {(list)=> {
                                            list.map(v=>{
                                                if(v.label.indexOf(v.key) === -1){
                                                    v.label = `${v.key} ${v.label}`;
                                                }
                                                return v
                                            });
                                            return list
                                        }}
                                        // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className={"margin-sm-top"}>
                        <Col span={14} className={"text-right"}>
                            <Button
                                htmlType={"submit"}
                                type={"default"}
                                disabled={!pricingFinish}
                            >计算</Button>
                            <Button
                                type={"default"}
                                className={"margin-ms-left"}
                                onClick={handleReset}
                                disabled={!pricingFinish}
                            >重置</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Conditions
