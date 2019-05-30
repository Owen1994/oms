
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Title from './Title'
import {
    Row,
    Col,
    Form
} from 'antd'

const FormItem = Form.Item;

export default class Info extends Component {
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    orderStatus1 = [
        {
            id:1,
            name:"已批准"
        },{
            id:2,
            name:"已发货"
        },{
            id:3,
            name:"已退款"
        },{
            id:4,
            name:"卖家取消订单"
        },
        // 1：已批准 2：已发货 3：已退款 4：卖家取消订单
    ]    
    render() {
        const {
            formItemLayout
        } = this;
        const { Infos } = this.props;
        
        let data = this.orderStatus1.find(v => v.id == Infos.orderStatus);
        let name =  data ? data.name : '--'
        let url = '';
        if (Infos){
            url = Infos.isException ?
            `/order/exceptionorderlist/exceptionorderdetail/?orderId=${Infos.companyOrdersId}`
            : `/order/orderlist/orderdetail/?orderId=${Infos.companyOrdersId}`;
        }
        return (
            <Title title="订单信息">
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台"
                        >
                            joom
                        </FormItem>
                    </Col>
                    <Col span={8}>

                        <FormItem
                            {...formItemLayout}
                            label="店铺账号"
                        >
                            {Infos.sellerId}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="平台订单号"
                        >
                            {Infos.orderId}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="YKS单号"
                        >
                            <Link className="mymallorder-span-content" to={url} target="_blank">{Infos.companyOrdersId}</Link>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="交易号"
                        >
                            {Infos.transactionId}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="状态"
                        >
                            {name}
                        </FormItem>
                    </Col>
                </Row>
            </Title>
        )
    }
}