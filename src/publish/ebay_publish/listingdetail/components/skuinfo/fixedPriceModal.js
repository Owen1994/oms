import React from 'react'
import { debounce } from '@/util/baseTool'
import { Modal, Select, Form, InputNumber, Button, message, Radio } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

/**
 * @description 批量修改价格
 */
class FixedPriceModal extends React.Component {

    state = {
        loading: false,
        basicIdList: [],
        editType: 1
    }
    wrapperCol = { span: 16 }
    labelCol = { span: 6 }
    handleOk = () => {
        const { editType } = this.state
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
                editVlistAll,
                editVarListing,
                moreListingComputPriceAction,
                vlist,
                onCancel
            } = this.props
            if (editType === 1) {
                editVlistAll({ key: 'startPrice', value: value.editVal });
                onCancel()
            } else if (editType === 2) {
                this.setState({
                    loading: true
                })
                moreListingComputPriceAction({
                    data: {
                        basicId: value.basicId,
                        profitsRate: value.profitsRate,
                        sellerSku: vlist && vlist.map(v => v.sellerSku)
                    }
                })
                    .then(res => {
                        if (res.state == '000001' && res && res.data && res.data.list && res.data.list.length) {
                            const varListing = res.data.list;
                            editVarListing({ value: varListing });
                            onCancel();
                        }
                    })
                    .finally(() => {
                        this.setState({
                            loading: false
                        })
                    })
            }
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
    radioChange = (event) => {
        let value = event && event.target && event.target.value
        if (value) {
            this.setState({
                editType: value
            })
        }
    }
    render() {
        const { basicIdList, loading, editType } = this.state
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        const { labelCol, wrapperCol } = this
        return (
            <Modal
                title='批量修改一口价'
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
                        label="修改方式"
                    >
                        <RadioGroup value={editType} onChange={this.radioChange}>
                            <Radio value={1}>统一值</Radio>
                            <Radio value={2}>系统计算</Radio>
                        </RadioGroup>
                    </FormItem>

                    {
                        editType === 1 ? (
                            <FormItem
                                labelCol={labelCol}
                                wrapperCol={wrapperCol}
                                label="零售价"
                            >
                                {getFieldDecorator('editVal', {
                                    // initialValue: undefined,
                                    rules: [{
                                        required: true, message: '请输入零售价',
                                    }],
                                })(
                                    <InputNumber
                                        placeholder={"请输入零售价"}
                                        min={0.99}
                                        max={999999.99}
                                        precision={2}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </FormItem>
                        ) : null
                    }
                    {
                        editType === 2 ? (
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
                                        style={{ width: "100%" }}
                                        placeholder='请选择售价计算规则'
                                    >
                                        {basicIdList.map(item => <Option value={item.key} key={item.key}>{item.label}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        ) : null
                    }
                    {
                        editType === 2 ? (
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
                                        placeholder={"请输入零售价"}
                                        min={0}
                                        max={100000000}
                                        className="margin-ss-left"
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </FormItem>
                        ) : null
                    }
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(FixedPriceModal)