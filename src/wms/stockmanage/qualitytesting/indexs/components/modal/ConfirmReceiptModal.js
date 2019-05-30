import React from 'react';
import {
    Form, Input, Modal, message, Button,
} from 'antd';

/**
 * 审批通过弹框
 */
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const FormItem = Form.Item;
export default class WrongReasonModal extends React.Component {
    state = {
        skuArr: [],
    };

    /**
     * sku输入框重新获取焦点时
     */
    onPickSkuInputFocus = () => {
        this.props.form.setFieldsValue({
            pickSku: '',
        });
    };

    /**
     * 扫描sku
     */
    onPickSkuEnter = () => {
        const { sku, outOfStock } = this.props.model;
        const pickSku = this.props.form.getFieldValue('pickSku');
        const skuSplit = sku.split('_');
        const scanSkuSplit = pickSku.split('_');
        if (outOfStock <= this.state.skuArr.length) {
            message.error('已扫描完成');
            return;
        }
        if (this.state.skuArr.indexOf(pickSku) !== -1) {
            message.error('SKU已存在');
            return;
        }
        if (skuSplit[0] === scanSkuSplit[0]) {
            this.setState((state) => {
                state.skuArr.push(pickSku);
            });
            this.props.form.setFieldsValue({
                pickSku: '',
            });
        } else {
            message.error('扫描的sku非同一类别');
        }
    };

    onCancel = () => {
        this.setState({
            skuArr: [],
        });
        const cancel = this.props.cancel();
        if (cancel) {
            cancel();
        }
    };

    render() {
        const bottomButton = (
            <div className="text-right">
                {/* <Button */}
                {/* onClick={this.props.confirm} */}
                {/* > */}
                {/* 完结容器 */}
                {/* </Button> */}
                <Button
                    type="primary"
                    onClick={() => this.props.saveSku(this.state.skuArr)}
                >
                    提交
                </Button>
            </div>
        );
        const {
            visible, model,
        } = this.props;
        return (
            <Modal
                title="拣货确认"
                width={520}
                visible={visible}
                footer={bottomButton}
                onCancel={this.onCancel}
                maskClosable={false}
            >
                <FormItem
                    {...formItemLayout}
                    label="容器"
                >
                    {this.props.form.getFieldDecorator('outOfStockGroupId', {
                        initialValue: model.outOfStockGroupId,
                        rules: [{ required: true, message: '请扫描容器编码' }],
                    })(
                        model.outOfStockGroupId ? <div>{model.outOfStockGroupId}</div>
                            : (
                                <Input
                                    autoFocus={!model.outOfStockGroupId}
                                    placeholder="请扫描容器编码"
                                />
                            ),
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="SKU"
                >
                    {this.props.form.getFieldDecorator('pickSku', {})(
                        <Input
                            autoFocus={model.outOfStockGroupId}
                            placeholder="请扫描SKU条码"
                            onFocus={this.onPickSkuInputFocus}
                            onPressEnter={this.onPickSkuEnter}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中文名称"
                >
                    {model.productName}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="待拣缺货量"
                >
                    {model.outOfStock}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="已拣数量"
                >
                    {this.state.skuArr.length}
                </FormItem>
            </Modal>
        );
    }
}
