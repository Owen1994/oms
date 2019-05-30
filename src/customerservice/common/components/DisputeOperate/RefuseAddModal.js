
import React from 'react';
import {
    Form, Radio, InputNumber, Select,
} from 'antd';
import CountArea from '../CountArea';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class RefuseAddModal extends React.Component {
    state = {
        disputeData: {
            seller_solution_list: {},
        },
        isRefundGoods: false,
        returnDisabled: false,
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }

    componentDidMount() {
        const { disputeData } = this.props;
        this.setState({
            disputeData,
            returnDisabled: disputeData.isSnad !== 1,
        });
    }

    componentWillReceiveProps(nextProps) {
        const nextDisputeData = nextProps.disputeData;
        if (JSON.stringify(nextDisputeData) !== this.props.disputeData) {
            this.setState({
                disputeData: nextDisputeData,
                returnDisabled: nextDisputeData.isSnad !== 1,
            });
        }
    }

    onChange = (e) => {
        const value = e.target.value;
        if (value === 2) {
            this.setState({
                isRefundGoods: true,
            });
        } else {
            this.setState({
                isRefundGoods: false,
            });
        }
    }


    render() {
        const {
            formItemLayout,
        } = this;
        const {
            disputeData, isRefundGoods, returnDisabled,
        } = this.state;
        const { getFieldDecorator } = this.props.form;
        const sellerData = disputeData.seller_solution_list ? disputeData.seller_solution_list : {};
        const refundMoneyMaxLocalCurrency = disputeData.refundMoneyMaxLocalCurrency ? disputeData.refundMoneyMaxLocalCurrency : '';
        // const buyerData = disputeData.buyer_solution_list ? disputeData.buyer_solution_list : {};
        let refundLimit = /\d+\.?\d*/.exec(disputeData.refundMoneyMaxLocal);
        if (refundLimit) refundLimit = Number(refundLimit[0]);
        refundLimit = refundLimit || 240;
        const maxString = refundLimit.toFixed(2);
        return (
            <div className="refuse-add-modal">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="您期望的解决方案"
                    >
                        {getFieldDecorator('selectType', {
                            rules: [{ required: true, message: '请选择您的期望解决方案' }],
                            initialValue: sellerData.solution_type === 'return_and_refund' ? 2 : 1,
                        })(
                            <RadioGroup onChange={this.onChange}>
                                <Radio value={1}>仅退款/拒绝退款</Radio>
                                <Radio value={2} disabled={returnDisabled}>退货退款</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div style={{ position: 'relative', marginBottom: isRefundGoods ? null : 10 }}>
                        <FormItem
                            {...formItemLayout}
                            label={`退款金额${refundMoneyMaxLocalCurrency}`}
                        >
                            {getFieldDecorator('refundAmount', {
                                rules: [{ required: true, message: '请输入退款金额' }],
                                initialValue: sellerData.refund_money ? sellerData.refund_money : '0.00',
                            })(
                                <InputNumber min={0} max={refundLimit} step={0.01} />,
                            )}
                        </FormItem>
                        <p className="refund-money-tip">{`金额范围：0.00 - ${maxString}，拒绝退款请填写0`}</p>
                    </div>
                    {isRefundGoods
                        ? (
                            <FormItem
                                {...formItemLayout}
                                label="退货地址"
                                style={{ marginBottom: 10, marginTop: 5 }}
                            >
                                {getFieldDecorator('returnAddress', {
                                    rules: [{ required: true, message: '请选择退货地址' }],
                                })(
                                    <Select
                                        placeholder="请选择收货地址"
                                        style={{ width: 250 }}
                                    >
                                        <Option value={disputeData.address_id}>{disputeData.address}</Option>
                                        {/* {sellerData.address
                                            ? programmeInfo.returnAddress.map(item => <Option key={item} value={item}>{item}</Option>)
                                            : null} */}
                                    </Select>,
                                )}
                            </FormItem>
                        )
                        : null
                    }
                    <CountArea
                        {...this.props}
                        initialValue={sellerData.content ? sellerData.content : ''}
                        formItemLayout={{ ...formItemLayout }}
                        autosize={{ minRows: 8, maxRows: 8 }}
                        label="请详细描述您的问题"
                        maxLength={1000}
                        field="solutionContext"
                        placeholder="回复内容控制在1000个字符以内"
                    />
                </Form>
            </div>
        );
    }
}
export default Form.create()(RefuseAddModal);
