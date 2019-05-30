import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class OrderInfo extends React.Component {
    // 防止undefined显示处理
    amountFilter = (data) => {
        return data ? data : '';
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { orderInfo } = this.props;
        return (
            <div className="add-refund-item">
                <div className="add-label">订单信息</div>
                <div className="add-content">
                    <div className="ant-row">
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">订单编号：</div>
                            <div className="ant-col-17"><span onClick={this.props.handleOrderClick} className="order-link">{orderInfo.orderNumber}</span></div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">订单金额：</div>
                            <div className="ant-col-17">{`${this.amountFilter(orderInfo.orderAmountCurrency)} ${this.amountFilter(orderInfo.orderAmount)}(实付：${this.amountFilter(orderInfo.paidAmountCurrency)} ${this.amountFilter(orderInfo.paidAmount)})`}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">订单创建时间：</div>
                            <div className="ant-col-17">{orderInfo.orderCreateTime}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">订单完成时间：</div>
                            <div className="ant-col-17">{orderInfo.orderEndTime}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">卖家账号：</div>
                            <div className="ant-col-17">{orderInfo.sellerAccount}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">买家账号：</div>
                            <div className="ant-col-17">{orderInfo.buyerAccount}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">平台订单状态：</div>
                            <div className="ant-col-17">{orderInfo.orderStatus}</div>
                        </div>
                        <div className="ant-col-12 pt-7">
                            <div className="ant-col-7 tar">收件人地址：</div>
                            <div className="ant-col-17">{orderInfo.receiverAddress}</div>
                        </div>
                    </div>
                    <FormItem>
                        {getFieldDecorator('orderNumber', {
                            initialValue: orderInfo.orderNumber,
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                </div>
            </div>
        );
    }
}
export default OrderInfo;
