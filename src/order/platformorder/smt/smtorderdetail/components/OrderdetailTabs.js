import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Tabs,
    Row,
    Col,
    Table
} from 'antd'
import '../css/css.css'

class OrderdetailTabs extends React.Component {


    render () {
        // 选项卡 start
        const TabPane = Tabs.TabPane;
        function callback(key) {
            console.log(key);
        }
        // 选项卡 end

        // 资金详情表格 start
        const dataSource = [{
            key: '1',
            productPrice: 'US $ 13.89',
            freight: 32,
            priceAdjustment: '',
            discount: 'US $ 0.00',
            sum: 'US $ 17.42',
            adtransactionFeedress: 'US $ 1.29',
            estimate: 'US $ 16.13'
        }, {
            key: '2',
            productPrice: 'US $ 13.89',
            freight: 42,
            priceAdjustment: '',
            discount: 'US $ 0.00',
            sum: 'US $ 17.42',
            adtransactionFeedress: 'US $ 1.29',
            estimate: 'US $ 16.13'
        }];
        const dataSource1 = [{
            key: '1',
            meet: 'US $ 13.89',
            payment: 32,
            payWay: '',
            paymentTime: '2018-02-01 18:43',
        }];

        const columns = [
            {
            title: '产品价格',
            dataIndex: 'productPrice',
            key: 'productPrice',
        }, {
            title: '运费',
            dataIndex: 'freight',
            key: 'freight',
        }, {
            title: '价格调整',
            dataIndex: 'priceAdjustment',
            key: 'priceAdjustment',
        }, {
            title: '优惠金额',
            dataIndex: 'discount',
            key: 'discount',
        }, {
            title: '订单总额',
            dataIndex: 'sum',
            key: 'sum',
        }, {
            title: '交易手续费',
            dataIndex: 'adtransactionFeedress',
            key: 'transactionFee',
        }, {
            title: '预计可得',
            dataIndex: 'estimate',
            key: 'estimate',
        }];
        const columns1 = [
            {
                title: '买家应付',
                dataIndex: 'meet',
                key: 'meet',
            }, {
                title: '已付款',
                dataIndex: 'payment',
                key: 'payment',
            }, {
                title: '支付方式',
                dataIndex: 'payWay',
                key: 'payWay',
            }, {
                title: '收款日期',
                dataIndex: ' paymentTime',
                key: ' paymentTime',
            }];
        // 资金详情表格 end
        return(
            <div className="newCluenk noborderCluenk">
                <div className="content" id="order-detail">
                    <Tabs onChange={callback} type="card">
                        <TabPane tab="订单详情" key="1" >
                            <div>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>买家ID</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                        A2 max SILVA
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>收件人</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>地址</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>邮编</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>手机</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>电话</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>传真</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab="资金详情" key="2">
                            <div className="title">订单总额</div>
                            <div className="capital-detail">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={false}
                                    size="small" />
                            </div>
                            <div className="title">收款金额</div>
                            <div className="capital-detail">
                                <Table
                                    columns={columns1}
                                    dataSource={dataSource1}
                                    pagination={false}
                                    bordered
                                    size="small" />
                            </div>
                        </TabPane>
                        <TabPane tab="时间记录" key="3">
                            <div className="title">时间记录</div>
                            <div>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>发货时间</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                        2018-02-01 22:26:18
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>付款时间</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                        2018-02-01 18:43:04
                                    </Col>
                                </Row>
                                <Row style={{'padding': '8px 0px'}}>
                                    <Col span={6} style={{textAlign: 'center'}}>
                                        <strong>订单创建时间</strong>
                                    </Col>
                                    <Col span={18} style={{textAlign: 'center'}}>
                                        2018-02-01 18:42:23
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default OrderdetailTabs;