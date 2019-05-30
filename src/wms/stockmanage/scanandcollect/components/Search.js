import React, { Component } from 'react';
import {
    Form, Button, Row, Col, Radio,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { receivingTypeList } from '../constants/search';
import ScanInput from '../../../common/components/ScanInput';
import {
    TYPE_1_PURCHASE_GOODS,
    TYPE_2_RECEIPT_PACKAGING,
    TYPE_3_SAMPLE_RECEIPT,
    TYPE_4_SALE_ORDER_BACK,
} from '../constants';
import { RETURN_REASON } from '../../../common/constants/Api';

const RadioGroup = Radio.Group;
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
     * 查询已收货列表
     */
    onCardSearch = () => {
        this.purchaseNumberRef.focus();
        const cardNumber = this.props.form.getFieldValue('cardNumber');
        if (cardNumber === '' || cardNumber === this.state.cardNumber) {
            this.props.form.setFieldsValue({
                cardNumber: this.state.cardNumber,
            });
        }
        this.props.onCardSearch();
    };


    /**
     * 查询
     */
    onSearch = () => {
        this.props.onSearchListener();
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { receivingType, onReceivingTypeChange } = this.props;
        /**
         * 样品收货
         */
        const sampleReceiveItem = (
            <FormItem
                {...formItemLayout}
                label="样品申请编号"
            >
                <Row>
                    <Col span={12}>
                        {getFieldDecorator('sampleNumber', {
                            rules: [{ required: receivingType === TYPE_3_SAMPLE_RECEIPT, message: '请扫描或输入样品申请编号' }],
                        })(
                            <ScanInput
                                ref={(input) => {
                                    this.purchaseNumberRef = input;
                                }}
                                isReset
                                placeholder="请扫描或输入样品申请编号"
                                onSearch={this.onSearch}
                            />,
                        )}
                    </Col>
                    <Col>
                        <Button
                            className="margin-ss-left"
                            onClick={this.onSearch}
                            type="primary"
                        >
                            查询
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        );
        /**
         * 销售退货
         * @returns {*}
         */
        const saleOrderBack = (
            <div>
                <Row type="flex">
                    <Col span={3}>
                        <FormItem style={{ float: 'right', paddingRight: 8 }}>
                            {getFieldDecorator('searchType', {// 只有销售退货时才用到这个
                                initialValue: 1,
                            })(
                                <RadioGroup size="small" className="search-radio-group">
                                    <Radio value={1}>面单</Radio>
                                    <Radio value={2}>SKU</Radio>
                                    :
                                </RadioGroup>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem>
                            {getFieldDecorator('searchContent', {// 只有销售退货时才用到这个
                                rules: [{ required: receivingType === TYPE_4_SALE_ORDER_BACK, message: '请扫描或输入' }],
                            })(
                                <ScanInput
                                    isReset
                                    ref={(input) => {
                                        this.purchaseNumberRef = input;
                                    }}
                                    placeholder="请扫描或输入"
                                    onSearch={this.onSearch}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                    {...formItemLayout}
                    label="退件原因"
                >
                    <Row>
                        <Col span={12}>
                            {getFieldDecorator('reasonCode', {
                                rules: [{ required: true, message: '请选择退件原因' }],
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={RETURN_REASON}
                                    placeholder="请选择"
                                    handleChange={this.onSearch}
                                />,
                            )}
                        </Col>
                        <Col>
                            <Button
                                className="margin-ss-left"
                                onClick={this.onSearch}
                                type="primary"
                            >
                                查询
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </div>
        );

        /**
         * 包材收货
         */
        const packageReceipt = (
            <FormItem
                {...formItemLayout}
                label="快递/采购单号"
            >
                <Row>
                    <Col span={12}>
                        {getFieldDecorator('receiptNumber', {
                            rules: [{ required: receivingType === TYPE_2_RECEIPT_PACKAGING, message: '请扫描或输入快递/采购单号' }],
                        })(
                            <ScanInput
                                isReset
                                ref={(input) => {
                                    this.purchaseNumberRef = input;
                                }}
                                placeholder="请扫描或输入快递/采购单号"
                                onSearch={this.onSearch}
                            />,
                        )}
                    </Col>
                    <Col>
                        <Button
                            className="margin-ss-left"
                            onClick={this.onSearch}
                            type="primary"
                        >
                            查询
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        );

        /**
         *采购来货
         */
        const purchase = (
            <FormItem
                {...formItemLayout}
                label="快递/采购单号"
            >
                <Row>
                    <Col span={12}>
                        {getFieldDecorator('purchaseNumber', {
                            rules: [{ required: receivingType === TYPE_1_PURCHASE_GOODS, message: '请扫描或输入快递/采购单号' }],
                        })(
                            <ScanInput
                                isReset
                                ref={(input) => {
                                    this.purchaseNumberRef = input;
                                }}
                                placeholder="请扫描或输入快递/采购单号"
                                onSearch={this.onSearch}
                            />,
                        )}
                    </Col>
                    <Col>
                        <Button
                            className="margin-ss-left"
                            onClick={this.onSearch}
                            type="primary"
                        >
                            查询
                        </Button>
                    </Col>
                </Row>
            </FormItem>
        );
        /**
         * 卡板号
         */
        const cardItem = (
            <FormItem
                {...formItemLayout}
                label="卡板号"
            >
                <Row>
                    <Col span={12}>
                        {getFieldDecorator('cardNumber', {
                            initialValue: '',
                            rules: [{ required: receivingType !== TYPE_2_RECEIPT_PACKAGING, message: '请先扫描/输入卡板号' }],
                        })(
                            <ScanInput
                                placeholder="请扫描或输入卡板编号"
                                onSearch={this.onCardSearch}
                            />,
                        )}
                    </Col>
                </Row>
            </FormItem>
        );
        return (
            <div className="search breadcrumb padding-sm overflow-hidden">
                <FormItem
                    {...formItemLayout}
                    label="收货类型"
                >
                    <Col span={12}>
                        {getFieldDecorator('receivingType', {
                            initialValue: ['1'],
                        })(
                            <CSelect
                                list={receivingTypeList}
                                placeholder="请选择"
                                handleChange={onReceivingTypeChange}
                            />,
                        )}
                    </Col>
                </FormItem>
                {receivingType !== TYPE_2_RECEIPT_PACKAGING ? cardItem : null}
                {receivingType === TYPE_1_PURCHASE_GOODS ? purchase : null}
                {receivingType === TYPE_2_RECEIPT_PACKAGING ? packageReceipt : null}
                {receivingType === TYPE_3_SAMPLE_RECEIPT ? sampleReceiveItem : null}
                {receivingType === TYPE_4_SALE_ORDER_BACK ? saleOrderBack : null}
            </div>
        );
    }
}

export default Search;
