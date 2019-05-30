import React, { Component } from 'react';
import { getUrlParams } from '../../../../../util/baseTool';
import {
    Spin,
    Table,
    Row,
    Col,
    Form,
    Input,
} from "antd";
import {fetchPost} from "../../../../../util/fetch";
import {Purchase_Order_Pay_Details_Api} from "../../constants/Api";
const FormItem = Form.Item;
import { parseRefundOrPayment } from '../../selectors/index';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

/**
 * 付/退款明细
 */
class RefundOrPaymentView extends Component {
    state = {
        dicData: {},
        loading: false,
    };
    componentDidMount() {
        const parameter = { data: { purchaseNumber: getUrlParams('').orderNumber } };
        this.setState({loading: true});
        fetchPost(Purchase_Order_Pay_Details_Api, parameter, 2).then((result) => {
            this.setState({loading: false});
            if (result.state === '000001') {
                this.setState({
                    dicData: parseRefundOrPayment(result.data),
                });
            }
        });
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
        },
        {
            title: '采购付款单号',
            dataIndex: 'no',
        },
        {
            title: '付款人/退款申请人',
            dataIndex: 'operator',
        },
        {
            title: '付款日期',
            dataIndex: 'operateTime',
        },
        {
            title: '付款方式',
            dataIndex: 'payType',
        },
        {
            title: '币种',
            dataIndex: 'currency',
        },
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '金额',
            dataIndex: 'money',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        }
    ];

    render() {
        const { dicData, loading } = this.state;
        return (
            <div className="padding-sm white pms-order-query_LogTable_bottom">
                <Spin spinning={loading} delay={500} tip="Loading...">

                    <Row>
                        <Col span={7} offset={1}>
                            <FormItem
                                {...formItemLayout}
                                label="采购单号"
                            >
                                <Input value={dicData.purchaseNumber ? dicData.purchaseNumber : ''} disabled/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="订单总金额"
                            >
                                <Input value={dicData.totalAmount ? dicData.totalAmount : '0'} disabled/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="入库金额"
                            >
                                <Input value={dicData.wareAmount ? dicData.wareAmount : '0'} disabled/>
                            </FormItem>
                        </Col>
                        <Col span={7} offset={1}>
                            <FormItem
                                {...formItemLayout}
                                label="实付金额"
                            >
                                <Input value={dicData.payAmount ? dicData.payAmount : '0'} disabled/>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="退款金额"
                            >
                                <Input value={dicData.refundAmount ? dicData.refundAmount : '0'} disabled/>
                            </FormItem>
                        </Col>
                    </Row>

                    <Table
                        className="margin-ss-top"
                        rowKey={t => t.serialNumber}
                        dataSource={dicData.list}
                        pagination={false}
                        bordered
                        size="small"
                        columns={this.columns}
                    />
                </Spin>
            </div>
        );
    }
}

export default RefundOrPaymentView;
