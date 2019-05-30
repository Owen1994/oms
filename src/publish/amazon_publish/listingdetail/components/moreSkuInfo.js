import React from 'react'
import moment from 'moment'
import Head from './head'
import ImgInfo from './imgInfo'
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Radio,
    Button,
    Checkbox,
    DatePicker,
    Table
} from 'antd'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker

const style = {
    inputWidth: {
        width: '288px'
    }
}

class SkuInfo extends React.PureComponent {

    state = {
        img: [
            'http://file.iweijie.cn/static/uploads/2018-12/image/0dbba6a032e01ae8bbb841c78cf78cac0.jpg',
            'http://file.iweijie.cn/static/uploads/2018-12/image/0403937a7afccc34527503f86828892c2.jpg',
            'http://file.iweijie.cn/static/uploads/2019-01/image/0dfb176055a7ee487f1bf2a7974409bdc.jpg'
        ]
    }

    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 14 },
    };
    test = ['Apple', 'Pear', 'Orange']

    columns = [
        {
            title: 'Seller SKU',
            dataIndex: 'sellerSKU',
            key: 'sellerSKU',
            width: 100,
            render: (t, r, i) => <Input disabled value={t} />
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 100,
            render: (t, r) => <Input disabled value={t} />
        },
        {
            title: 'SKU信息',
            dataIndex: 'ASIN',
            key: 'ASIN',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='ASIN' content={r.asin} right={10} />
                    <Shunt title='Seller SKU' content={r.sellerSku} right={10} />
                </div>
            }
        },
        {
            title: '基本信息',
            dataIndex: 'title',
            key: 'title',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='标题' content={r.title} right={10} />
                </div>
            }
        },
        {
            title: '价格库存',
            dataIndex: 'retailPrice',
            key: 'retailPrice',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='零售价' content={`${r.currencyCode} ${r.retailPrice}`} right={3} />
                    <Shunt title='折后价' content={`${r.currencyCode} ${r.discountPrice}`} right={3} />
                    <Shunt title='库存' content={r.quantity} right={10} />
                </div>
            }
        },
        {
            title: '销售账号',
            dataIndex: 'siteId',
            key: 'siteId',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='销售账号' content={r.listingSellerId} right={2} />
                    <Shunt title='站点' content={r.siteId} right={2} />
                </div>
            }
        },
        {
            title: '队列信息',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 100,
            render: (t, r, i) => {
                return <div>
                    <Shunt title='队列类型' content={r.queueType} right={2} />
                    <Shunt title='队列时间' content={r.queueTime} right={2} />
                </div>
            }
        },
    ]
    render() {
        const { img } = this.state;
        const { varSkuInfo = {}, form } = this.props;
        const { getFieldDecorator } = form;
        const list = []
        return (
            <Head id="skuInfo" title="SKU信息" className="margin-ms-top">
                <FormItem
                    {...this.formItemLayout}
                    label="SPU"
                >
                    {getFieldDecorator('varSkuInfo[sellerSku]', {
                        initialValue: varSkuInfo.sellerSku,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label=" "
                >
                    {getFieldDecorator('varSkuInfo[sellerSku]', {
                        initialValue: varSkuInfo.sellerSku || this.test,
                    })(
                        <CheckboxGroup options={this.test} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="多属性列表"
                    required
                >
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        pagination={false}
                        bordered={true}
                        size="small"
                        indentSize={0}
                        rowKey={record => record.id}
                    />
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="Seller SKU"
                >
                    {getFieldDecorator('varSkuInfo[sellerSku]', {
                        initialValue: varSkuInfo.sellerSku || this.test,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <ImgInfo imgInfo={img} field="ImgInfo-1" form={form} />
                <FormItem
                    {...this.formItemLayout}
                    label="Seller SKU"
                >
                    {getFieldDecorator('varSkuInfo[sellerSku]', {
                        initialValue: varSkuInfo.sellerSku || this.test,
                    })(
                        <Input style={style.inputWidth} disabled />
                    )}
                </FormItem>
                <ImgInfo imgInfo={img} field="ImgInfo-2" form={form} />
            </Head>
        )
    }
}

export default SkuInfo