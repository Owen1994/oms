import React from 'react';
import {
    Form,
    Radio,
    Input,
    message,
    Cascader,
    InputNumber,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { GET_REFUNDRESON_LIST } from '../../../aftersale/refundreason/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class Presetform extends React.Component {
    state = {
        options: [],
        ifReturnGoods: false
    }

    componentDidMount() {
        // 获取退款申请列表
        fetchPost(GET_REFUNDRESON_LIST, {
            group: '1',
            pageNumber: 1,
            pageData: 1000,
        }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.setState({
                        options: data.data.data,
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        const nextOrderRefunds = nextProps.orderRefunds;
        if (this.props.orderRefunds !== nextOrderRefunds) {
            console.log(nextOrderRefunds, this.props.orderRefunds)
            this.setState({ ifReturnGoods: !!nextOrderRefunds.returnGoods });
        }
    }

    // 获取退款原因初始值
    getReasonId = (refundId) => {
        const { options } = this.state;
        let reasonId = [];
        options.forEach(item => {
            if (item.children) {
                item.children.forEach(ele => {
                    if (ele.categoryId === refundId) {
                        reasonId = [ele.parentId, ele.categoryId];
                    }
                })
            }
        })
        return reasonId;
    }

    reasonChange = (value) => {
        const { form, cancelRefundLoading } = this.props;
        if (value.length === 1) {
            setTimeout(() => {
                form.setFieldsValue({ refundReasonId: [] });
                message.warning('该退款原因暂无子分类，请重新填写！')
            }, 0)
        }
        cancelRefundLoading();
    }

    handlereturnGoods = (e) => {
        const value = e.target.value;
        const { cancelRefundLoading } = this.props;
        this.setState({ ifReturnGoods: value });
        cancelRefundLoading();
    }

    render() {
        const { options, ifReturnGoods } = this.state;
        const { orderRefunds, isReview, cancelRefundLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label='退款类型'
                >
                    {getFieldDecorator('refundType', {
                        rules: [{ required: true, message: `请填写退款类型` }],
                        initialValue: 1
                    })(
                        <RadioGroup disabled={isReview} onChange={cancelRefundLoading}>
                            <Radio value={1}>全额退款</Radio>
                            <Radio value={2}>部分退款</Radio>
                            <Radio value={3}>额外退款</Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='退款原因'
                >
                    {getFieldDecorator('refundReasonId', {
                        rules: [{ required: true, message: '请填写退款原因' }],
                        initialValue: orderRefunds.refundReasonId ? this.getReasonId(orderRefunds.refundReasonId) : []
                    })(
                        <Cascader
                            disabled={isReview}
                            fieldNames={{ label: 'category', value: 'categoryId' }}
                            options={options}
                            placeholder="请选择退款原因"
                            onChange={this.reasonChange}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='退款金额'
                >
                    {getFieldDecorator('refundAmount', {
                        rules: [{ required: true, message: '请填写退款金额' }],
                        initialValue: orderRefunds.refundAmount ? orderRefunds.refundAmount : 0
                    })(
                        <InputNumber disabled={isReview} min={0} onChange={cancelRefundLoading} />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='是否退货'
                >
                    {getFieldDecorator('returnGoods', {
                        rules: [{ required: true, message: '请填写是否退货' }],
                        initialValue: orderRefunds.returnGoods ? orderRefunds.returnGoods : 0
                    })(
                        <RadioGroup disabled={isReview} onChange={this.handlereturnGoods}>
                            <Radio value={0}>否</Radio>
                            <Radio value={1}>是</Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
                {ifReturnGoods
                    ? (
                        <FormItem
                            {...formItemLayout}
                            label='退货跟踪号'
                        >
                            {getFieldDecorator('trackingNumber', {
                                rules: [{ required: true, message: '请填写退货跟踪号' }],
                                initialValue: orderRefunds.trackingNumber ? orderRefunds.trackingNumber : undefined
                            })(
                                <Input disabled={isReview} placeholder='请输入退货跟踪号' onChange={cancelRefundLoading} />,
                            )}
                        </FormItem>
                    ) : null
                }
                <FormItem
                    {...formItemLayout}
                    label='收款账号'
                >
                    {getFieldDecorator('paymentAccount', {
                        initialValue: orderRefunds.paymentAccount ? orderRefunds.paymentAccount : undefined
                    })(
                        <Input disabled={isReview} placeholder="请填写收款账号" onChange={cancelRefundLoading} />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='退款凭证'
                >
                    {getFieldDecorator('refundNumber', {
                        initialValue: orderRefunds.refundNumber ? orderRefunds.refundNumber : undefined
                    })(
                        <Input disabled={isReview} placeholder="请填写退款凭证" onChange={cancelRefundLoading} />,
                    )}
                </FormItem>
                {this.props.children}
                <FormItem
                    {...formItemLayout}
                    label='退款详情'
                >
                    {getFieldDecorator('refundDetail', {
                        initialValue: orderRefunds.refundDetail ? orderRefunds.refundDetail : undefined
                    })(
                        <TextArea disabled={isReview} autosize={{ minRows: 4, maxRows: 4 }} onChange={cancelRefundLoading} />,
                    )}
                </FormItem>
            </div>
        );
    }
}
export default Presetform;
