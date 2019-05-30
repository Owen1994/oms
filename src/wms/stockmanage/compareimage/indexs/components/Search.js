import React, { Component } from 'react';
import {
    Form, Button, Row, Col,
} from 'antd';
import ScanInput from '../../../../common/components/ScanInput';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};

class Search extends Component {
    state = {
        cardNumber: '',
    };

    /**
     * 全局搜索
     * @param event
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 查询已收货列表
     * @param e
     */
    onCardNumberSearch = (e) => {
        if (!e.keyCode || e.keyCode === 13) {
            this.skuInputRef.focus();
            const cardNumber = this.props.form.getFieldValue('cardNumber');
            if (cardNumber === '' || cardNumber === this.state.cardNumber) {
                this.props.form.setFieldsValue({
                    cardNumber: this.state.cardNumber,
                });
            }
            this.props.onSearchListener();
        }
    };

    /**
     * 卡板号输入框获取焦点时
     */
    onCardNumberFocus = () => {
        const cardNumber = this.props.form.getFieldValue('cardNumber');
        this.setState({
            cardNumber,
        });
        this.props.form.setFieldsValue({
            cardNumber: '',
        });
    };

    /**
     * 快递/采购单号输入框获取焦点时
     */
    onPurchaseNumberFocus = () => {
        this.props.form.setFieldsValue({
            sku: '',
        });
    };

    /**
     * 快递/采购单号查询
     */
    onPurchaseNumberSearch = () => {
        this.props.onSearchListener();
        this.props.form.setFieldsValue({
            sku: '',
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="search breadcrumb padding-sm overflow-hidden">
                <FormItem
                    {...formItemLayout}
                    label="卡板号"
                >
                    <Row gutter={12}>
                        <Col span={12}>
                            {getFieldDecorator('cardNumber', {
                                rules: [{ required: true, message: '请扫描或输入卡板编号' }],
                            })(
                                <ScanInput
                                    placeholder="请扫描或输入卡板编号"
                                    onSearch={this.onCardNumberSearch}
                                />,
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="产品编码"
                >
                    <Row gutter={12}>
                        <Col span={12}>
                            {getFieldDecorator('sku')(
                                <ScanInput
                                    ref={(input) => {
                                        this.skuInputRef = input;
                                    }}
                                    isReset
                                    placeholder="请扫描或输入产品编码"
                                    onSearch={this.onPurchaseNumberSearch}
                                />,
                            )}
                        </Col>
                        <Col>
                            <Button
                                onClick={this.onSubmit}
                                type="primary"
                            >
                                查询
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </div>
        );
    }
}

export default Search;
