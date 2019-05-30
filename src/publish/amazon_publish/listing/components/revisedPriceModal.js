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
        const promotion = promotionBeginDate && promotionEndDate ? [moment(promotionBeginDate), moment(promotionEndDate)] : undefined;
        this.setState({
            data: {
                retailPrice,
                discountPrice,
                promotion,
            }
        })
    }

    handleOk = () => {
        const { onOk } = this.props;
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                const promotion = values.promotion;
                const discountPrice = values.discountPrice;
                if (values.retailPrice <= 0.1) return message.warning("零售价需大于 0.1")
                if (promotion && promotion.length) {
                    if (discountPrice === undefined) return message.warning("请填写折后价")
                    delete values.promotion;
                    values.promotionBeginDate = promotion[0].startOf('day').valueOf();
                    values.promotionEndDate = promotion[1].endOf('day').valueOf();
                }
                if (discountPrice !== undefined && (!promotion || !promotion.length)) return message.warning("请选择促销日期")
                if (discountPrice >= values.retailPrice) {
                    return message.warning("折后价需小于零售价")
                }
                onOk(values)
            }
        })
    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.form.resetFields();
    }

    col = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 }
    }

    // 禁用日期范围 设置
    orderTimeChange = (arr) => {
        this.range = arr
    }
    range = []
    disabledDate = (current) => {
        var { range } = this
        if (range.length == 1) {
            var nowRange = range[0]
            if (nowRange > moment().endOf('day')) {
                return false;
            }
            return current && current < moment().endOf('day');
        }
        return false
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
                <Form>
                    <FormItem {...this.col} label="零售价">
                        {getFieldDecorator('retailPrice', {
                            initialValue: retailPrice,
                            rules: [
                                { required: true, message: '请输入零售价' }
                            ]
                        })(
                            <InputNumber
                                min={0}
                                max={399999.99}
                                precision={2}
                                step={0.01}
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem {...this.col} label="折后价" className="margin-ss-top">
                        {getFieldDecorator('discountPrice', {
                            initialValue: discountPrice || undefined,
                            // rules: [
                            //     { required: true, message: '请输入零售价' }
                            // ]
                        })(
                            <InputNumber
                                min={0.11}
                                max={399999.99}
                                precision={2}
                                step={0.01}
                                style={style.w100p}
                            />
                        )}
                    </FormItem>
                    <FormItem {...this.col} label="促销日期" className="margin-ss-top">
                        {getFieldDecorator('promotion', {
                            initialValue: promotion || undefined,
                            // rules: [
                            //     { required: true, message: '请输入零售价' }
                            // ]
                        })(
                            <RangePicker
                                style={style.w100p}
                                disabledDate={this.disabledDate}
                                onCalendarChange={this.orderTimeChange}
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditStockModal)