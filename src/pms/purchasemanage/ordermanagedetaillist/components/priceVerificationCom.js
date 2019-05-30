import React from 'react';

import {
    Modal,
    Select,
    Button,
    Form,
    Input,
    message,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class logisticsCom extends React.Component {
    state = {
        priceVerification: [
            // {
            //     name: '全部（不包含自主优化',
            //     key: 0,
            // },
            // {
            //     name: '大金额优化',
            //     key: 1,
            // },
            {
                name: '供应商联系不上',
                key: 2,
            },
            {
                name: '供应商产品停产/下架/无货',
                key: 3,
            },
            {
                name: '无效价格',
                key: 4,
            },
            {
                name: '链接错误',
                key: 5,
            },
            {
                name: '供应商禁用核查',
                key: 6,
            },
            {
                name: '其它异常',
                key: 7,
            },
            // {
            //     name: '自主优化',
            //     key: 8,
            // },
        ],
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    formItemLayout1 = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    saveHandle = () => {
        const { data, supplierId } = this.props;
        const { getFieldValue } = this.props.form;
        const type = getFieldValue('type');
        const remark = getFieldValue('remark');
        if (!type) return message.warning('请选择物流方式');
        this.props.orderDetailPriceVerificationAsync({
            data: {
                type,
                remark,
                supplierId,
                keys: data,
            },
        })
            .then((result) => {
                if (result) {
                    message.success(result.msg);
                    this.modalCancel(true);
                }
            });
    }

    modalCancel = (flag = false) => {
        this.props.onCancel(flag);
    }

    render() {
        const { visible } = this.props;
        const { priceVerification } = this.state;
        const { getFieldDecorator } = this.props.form;
        const priceVerificationOption = priceVerification.map(v => <Option value={v.key} key={v.key}>{v.name}</Option>);
        const content = (
            <Form>
                <FormItem
                    label="核查类型"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'type',
                        {
                            rules: [{ required: true, message: '核查类型为必选' }],
                        },
                    )(
                        <Select
                            placeholder="请选择核查类型"
                            style={{ width: '80%' }}
                        >
                            {priceVerificationOption}
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    className="margin-ms-top"
                    label="备注"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'remark',
                    )(
                        <TextArea rows={4} style={{ width: '80%' }} />,
                    )}
                </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle}>确认</Button>
            </div>
        );

        return (
            <Modal
                title="SKU推送价格核查"
                width={600}
                destroyOnClose
                // centered
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className=""
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
