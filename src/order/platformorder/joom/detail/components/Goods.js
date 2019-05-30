
import React, { Component } from 'react'
import Title from './Title'
import {
    Row,
    Col,
    Form,
    Table
} from 'antd'

const FormItem = Form.Item;

export default class Info extends Component {
    formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };
    columns = [
        {
            title: 'sku图片',
            dataIndex: 'productImageUrl',
            key: 'productImageUrl',
            render: (text, record, index) => {
                return <img width={70} src={text} alt="" />
            }
        },
        {
            title: 'sku编号',
            dataIndex: 'joomSku',
            key: 'joomSku',
        },
        {
            title: 'sku名称',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '商品总金额',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
        },
    ]
    render() {
        const {
            formItemLayout,
            columns
        } = this;
        const { Infos } = this.props;
        const list = [
            {
                productImageUrl: Infos.productImageUrl,
                joomSku: Infos.joomSku,
                productName: Infos.productName,
                price: Infos.price,
                quantity: Infos.quantity,
                orderTotal: (Infos.price * Infos.quantity),
                key:1
            }
        ]

        return (
            <Title title="商品信息">
                <Table
                    size="small"
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                    bordered={true}
                />
            </Title>
        )
    }
}