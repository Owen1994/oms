import React, { Component } from 'react';
import {
    Col, Form, Row,
} from 'antd';

const imgVerticalLine = require('../../img/VerticalLine.png');

const FormItem = Form.Item;

/**
 *供应商信息
 */
class SupplierInfoList extends Component {
    render() {
        const { data, formItemLayout } = this.props;
        // const { isCanEdit } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <div className="grid-list">
                    <img
                        className="group-img"
                        src={imgVerticalLine}
                        alt=""
                        width="3px"
                        height="12px"
                    />
                    <span className="group-label">供应商信息</span>
                    <Row>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="供应商名称"
                            >
                                <div className="grid-list-item1">{data.supplierName}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="供应商地址"
                            >
                                <div className="grid-list-item1">
                                    {data.address}
                                </div>

                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="电话"
                            >
                                <div className="grid-list-item1">{data.telephone}</div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="联系人"
                            >
                                <div className="grid-list-item1">{data.contact}</div>
                            </FormItem>
                        </Col>
                        <Col span={7} className="col-required">
                            <FormItem
                                {...formItemLayout}
                                label="联系人手机"
                            >
                                <div className="grid-list-item1">{data.contactTelNumber}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="户名"
                            >
                                <div className="grid-list-item1">{data.householdName}</div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="账号"
                            >
                                <div className="grid-list-item1">{data.account}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="收款银行"
                            >
                                <div className="grid-list-item1">{data.cashBank}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="开户行"
                            >
                                <div className="grid-list-item1">{data.openBank}</div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="付款方式"
                            >
                                <div className="grid-list-item1">{data.defaultPaymentMethod}</div>
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <FormItem
                                {...formItemLayout}
                                label="供应商备注"
                            >
                                {
                                    getFieldDecorator('supplierRemark', {
                                        initialValue: data.supplierRemark,
                                    })(
                                        // isCanEdit ? <Input disabled /> : <div className="grid-list-item1">{data.supplierRemark}</div>,
                                        <div className="grid-list-item1">{data.supplierRemark}</div>,
                                    )
                                }
                            </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }
}

export default SupplierInfoList;
