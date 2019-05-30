import React from 'react'
import { debounce } from '@/util/baseTool'
import { Modal, Select, Form, InputNumber, Button, message, Radio } from 'antd'

import { GET_PROFIT_RATE } from '../../constants/api';
import { fetchPost } from "@/util/fetch";

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

/**
 * @description 批量修改价格
 */
class PriceModal extends React.Component {

    state = {
        loading: false,
        basicIdList: [],
    }
    wrapperCol = { span: 16 }
    labelCol = { span: 6 }
    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            const {
                singleListingComputPriceAction,
                onCancel,
                sellerSku
            } = this.props
            this.setState({
                loading: true
            })
            singleListingComputPriceAction({
                data: {
                    basicId: value.basicId,
                    profitsRate: value.profitsRate,
                    sellerSku: sellerSku
                }
            })
                .then(res => {
                    if (res && res.state == '000001') {
                        const price = res.data.salePrice;
                        this.props.changePrice(price);
                        onCancel();
                    } else {
                        this.props.changePrice('');
                    }
                })
                .finally(() => {
                    this.setState({
                        loading: false
                    })
                })
        })
    }

    getComputeRules = debounce((ruleName) => {
        const { getDomesticList } = this.props;
        const data = {
            platform: 'ebay',
            pageNumber: 1,
            pageData: 1000,
        }
        if (ruleName) {
            data.ruleName = ruleName
        }
        getDomesticList({ data })
            .then(res => {
                this.setState({
                    basicIdList: res || []
                })
            })
    }, 500)

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible
        const preVisible = this.props.visible
        if (visible && !preVisible) {
            this.props.form.resetFields()
        }
    }

    ruleChange = (value) => {
        const data = {
            platform: 'ebay',
            ruleId: value,
            pageData: 1000,
            pageNumber: 1
        };
        fetchPost(GET_PROFIT_RATE, { data })
            .then(data => {
                if(data && data.state === "000001") {
                    const res = data.data;
                    this.props.form.setFieldsValue({ 'profitsRate': res.profitsRate });
                }
            })
    }

    render() {
        const { basicIdList, loading } = this.state
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        const { labelCol, wrapperCol } = this
        return (
            <Modal
                title='售价计算'
                visible={visible}
                onCancel={onCancel}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <FormItem
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        label="售价计算规则"
                    >
                        {getFieldDecorator('basicId', {
                            rules: [{
                                required: true, message: '请选择售价计算规则',
                            }],
                        })(
                            <Select
                                allowClear
                                showSearch
                                onFocus={this.getComputeRules}
                                onSearch={this.getComputeRules}
                                onChange={this.ruleChange}
                                style={{ width: "100%" }}
                                placeholder='请选择售价计算规则'
                            >
                                {basicIdList.map(item => <Option value={item.key} key={item.key}>{item.label}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="利润率（%）"
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                    >
                        {getFieldDecorator('profitsRate', {
                            rules: [{
                                required: true, message: '请输入利润率（%）',
                            }],
                        })(
                            <InputNumber
                                placeholder={"请输入利润率"}
                                min={0}
                                max={100000000}
                                className="margin-ss-left"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(PriceModal)