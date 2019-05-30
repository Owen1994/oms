import React from 'react'
import moment from 'moment'
import {
    Modal,
    Button,
    Form,
    message,
    Radio,
    InputNumber,
    DatePicker
} from 'antd'
import { fetchPost } from 'util/fetch'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { RangePicker } = DatePicker
const style = {
    w100p: {
        width: '100%'
    }
}

class EditStockModal extends React.Component {
    state = {
        loading: false,
        data: {}
    }

    componentDidMount() {
        this.setData(this.props)
    }

    componentWillReceiveProps(next) {
        if (next.visible && next.data != this.props.data) {
            this.setData(next)
        }
    }

    setData = (props) => {
        const { data } = props;
        const {
            retailPrice,
            discountPrice,
            promotionBeginDate,
            promotionEndDate
        } = data;
        if (retailPrice === undefined || discountPrice === undefined) return;
        this.setState({
            data: {
                retailPrice,
                discountPrice,
                promotion: [moment(promotionBeginDate), moment(promotionEndDate)]
            }
        })
    }

    handleOk = () => {
        const { onOk } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                const promotion = values.promotion;
                delete values.promotion;
                values.promotionBeginDate = promotion[0].startOf('day').valueOf();
                values.promotionEndDate = promotion[1].endOf('day').valueOf();
                onOk(values)
            }
        })
    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.form.resetFields();
    }

    render() {
        const { loading, data } = this.state;
        const { visible } = this.props;
        const {
            retailPrice,
            discountPrice,
            promotion
        } = data;
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title="修改售价"
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                >
                    <FormItem label="零售价">
                        {getFieldDecorator('retailPrice', {
                            initialValue: retailPrice,
                            rules: [
                                { required: true, message: '请输入零售价' }
                            ]
                        })(
                            <InputNumber
                                min={0}
                                precision={2}
                                step={0.01}
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem label="折后价">
                        {getFieldDecorator('discountPrice', {
                            initialValue: discountPrice,
                            rules: [
                                { required: true, message: '请输入零售价' }
                            ]
                        })(
                            <InputNumber
                                min={0}
                                precision={2}
                                step={0.01}
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem label="促销日期">
                        {getFieldDecorator('promotion', {
                            initialValue: promotion,
                            rules: [
                                { required: true, message: '请输入零售价' }
                            ]
                        })(
                            <RangePicker style={style.w100p} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)