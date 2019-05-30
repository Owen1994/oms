import React from 'react'
import moment from 'moment'
import Head from './head'
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Radio,
    Button,
    DatePicker,
} from 'antd'
const FormItem = Form.Item;
const { RangePicker } = DatePicker

const style = {
    inputWidth: {
        width: '288px'
    }
}

class SkuInfo extends React.PureComponent {

    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };
    render() {
        const { skuInfo = {}, form } = this.props;
        const { getFieldDecorator } = form;
        const promotion = skuInfo.promotionBeginDate && skuInfo.promotionEndDate ? [
            moment(skuInfo.promotionBeginDate),
            moment(skuInfo.promotionEndDate),
        ] : undefined;
        return (
            <Head id="skuInfo" title="SKU信息" className="margin-ms-top">
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="Seller SKU"
                >
                    {getFieldDecorator('skuInfo[sellerSku]', {
                        initialValue: skuInfo.sellerSku,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="UPC"
                >
                    {getFieldDecorator('skuInfo[upc]', {
                        initialValue: skuInfo.upc,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="零售价"
                >
                    {getFieldDecorator('skuInfo[retailPrice]', {
                        initialValue: skuInfo.retailPrice,
                        rules: [
                            { required: true, message: "请输入零售价" },
                        ]
                    })(
                        // 0.10,399999.99
                        <InputNumber placeholder="请输入零售价" max={399999.99} min={0} precision={2} step={0.01} style={style.inputWidth} />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="折后价"
                >
                    {getFieldDecorator('skuInfo[discountPrice]', {
                        initialValue: skuInfo.discountPrice,
                    })(
                        // 0.10,399999.99
                        <InputNumber placeholder="请输入折后价" max={399999.99} min={0.11} precision={2} step={0.01} style={style.inputWidth} />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="促销日期"
                >
                    {getFieldDecorator('skuInfo[promotion]', {
                        initialValue: promotion,
                    })(
                        <RangePicker style={style.inputWidth} />
                    )}
                </FormItem>
                <FormItem
                    className="mt8"
                    {...this.formItemLayout}
                    label="库存"
                >
                    {getFieldDecorator('skuInfo[quantity]', {
                        initialValue: skuInfo.quantity,
                        rules: [
                            { required: true, message: "请输入零售价" },
                        ]
                    })(
                        // 0,2000
                        <InputNumber placeholder="请输入库存数量" max={2000} min={0} precision={0} step={1} style={style.inputWidth} />
                    )}
                </FormItem>
            </Head>
        )
    }
}

export default SkuInfo
