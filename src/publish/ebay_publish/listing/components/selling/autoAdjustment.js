import React from 'react'
import { Modal, Select, Form, InputNumber, Button, message } from 'antd'
import { parseBatchParams } from '../../selector/selling'
import priceTypes from '../../constants/PriceType'
import { fetchPost } from '../../../../../util/fetch'
import Apis from '../../constants/Api'

const FormItem = Form.Item;
const Option = Select.Option

/**
 * @author 黄建峰
 * @description 批量修改价格
 */
class AutoAdjustment extends React.Component {

    state = {
        loading: false
    }
    handleOk = () => {
        const { getParams, selectedRowKeys, autoAdjustAsync, cpId } = this.props;
        const { validateFields } = this.props.form
        validateFields((err, value) => {
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

            let params = { profitsRate: value.profitsRate }
            if (cpId) {
                params.cpId = params
            }
            if (selectedRowKeys && selectedRowKeys.length) {
                params.listingIds = selectedRowKeys
            } else {
                params.params = getParams()
            }

            this.setState({
                loading: true,
            })
            autoAdjustAsync({
                data: params
            })
                .then(result => {
                    this.setState({
                        loading: false
                    })
                    if (result && result.state === '000001') {
                        this.props.onCancel()
                    }
                })
                .finally(() => {
                    this.setState({
                        loading: false,
                    })
                })
        })
    }

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible
        const preVisible = this.props.visible
        if (visible && !preVisible) {
            this.props.form.resetFields()
        }
    }
    render() {
        const loading = this.state.loading
        const { visible, onCancel } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title='批量自动调价'
                visible={visible}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <FormItem label="利润率(%)"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                >
                    {getFieldDecorator('profitsRate', {
                        initialValue: 0,
                        rules: [{
                            required: true, message: '请输入利润率(%)',
                        }],
                    })(
                        <InputNumber
                            placeholder="请输入利润率(%)"
                            style={{ width: "100%", display: 'inline-block' }}
                            min={0}
                            precision={2}
                        />
                    )}
                </FormItem>
            </Modal>
        )
    }
}
export default Form.create()(AutoAdjustment)