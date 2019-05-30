/**
 * 作者: pzt
 * 描述: 速卖通详情页产品信息组件
 * 时间: 2018/4/18 20:29
 **/
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
const FormItem = Form.Item
import '../css/css.css'


class ProductInfo extends React.Component {

    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: {span: 3},
        wrapperCol: {span: 20}
    }
    formItemLayout3 = {
        labelCol: {span: 11},
        wrapperCol: {span: 13}
    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {data} = this.props.tablemodel3;

        const columns = [
            {
                title: '产品信息',
                dataIndex: 'productInfo',
                key: 'productInfo',
                width: 390,
                render: (text, record, index) => {
                    const url = `/orderdetail/?orderId=${record.orderId}`
                    return (
                        <div>
                            <div>
                                <ul className='goodsInfo'>
                                    <li>
                                        <div className='img'>
                                            <img width={72} height={68} src={record.image? record.image: require( '../css/img/default.png')} />
                                        </div>
                                        <div className='info'>
                                            {record.itimID?<div><strong>Itim ID:{record.itimID}</strong></div>:''}
                                            <div className='name'>{record.name}</div>
                                            <div>商品编码:{record.number}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>)
                }
            },{
                title: '单价',
                dataIndex: 'unit',
                key: 'unit',
                className: 'text-center'
            },{
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                className: 'text-center'
            },{
                title: '订单金额',
                dataIndex: 'sum',
                key: 'sum',
                className: 'text-center'
            },{
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                className: 'text-center'
            }];
        return (
            <div className="newCluenk product-info">
                <div className="title" id='product-info' ref={'productInfo'}>产品信息</div>
                <div className="content">
                    <div>
                        <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                         />
                    </div>
                    <div>
                        <Row className={"prodet-remark padding-sm-top padding-sm-bottom"}>
                            <Col span={24}>
                                <FormItem
                                    label="备注"  {...this.formItemLayout} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('remarks', {
                                        rules: [{required: false, message: '备注'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className={"money-color padding-md-top"}>
                            <Col span={6}>
                                <FormItem
                                    label="产品总额"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('productSum', {
                                        rules: [{required: false, message: '产品总额'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="运费总额"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('freightSum', {
                                        rules: [{required: false, message: '运费总额'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="订单总额"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('orderSum', {
                                        rules: [{required: false, message: '订单总额'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="预计可得"  {...this.formItemLayout3} className={'ant-xs-row'}
                                >
                                    {getFieldDecorator('profits', {
                                        rules: [{required: false, message: '预计可得'}],
                                    })(
                                        <Input readOnly="true" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo
