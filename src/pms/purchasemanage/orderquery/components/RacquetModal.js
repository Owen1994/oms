import React from 'react'
import {
    Modal,
    Form,
    Input,
} from 'antd'
import CSelect from '../../../../components/cselect';
import { fetchPost } from '../../../../util/fetch';
import { Deal_Number_List, } from '../constants/index';
import { Order_Query_Racquet_Edit } from '../constants/Api';

const FormItem = Form.Item;

class RacquetModal extends React.Component {
    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };

    // 取消
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.showOrCloseRacquetModal(false);
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    data: {
                        ...values,
                        key: this.props.racquetData.key,
                    }
                };
                fetchPost(Order_Query_Racquet_Edit, data, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.loadData();
                        }
                    })
            }
        })
    };

    render() {
        const { visible, racquetData } = this.props;
        const { getFieldDecorator } = this.props.form;

        let isShowDefault = true;
        if (racquetData) {
            if (racquetData.tradingNumber) {
                if (racquetData.tradingNumber.length !== 0) {
                    isShowDefault = false;
                }
            }
        }
        return (
            <Modal
                visible={visible}
                title={'网拍'}
                destroyOnClose={true}
                width={450}
                maskClosable
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                okText={isShowDefault ? '确定' : '修改'}
            >
                <Form>
                    <div className="orderquery-racquet-form">
                        <FormItem
                            {...this.formItemLayout}
                            label="交易号"
                        >
                            {
                                getFieldDecorator('tradingNumber', {
                                    rules: [{ required: true, message: '交易号不能不选择' }],
                                    initialValue: !isShowDefault ? racquetData.tradingNumber : 10,
                                })(
                                    <CSelect
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        list={Deal_Number_List}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="交易ID"
                        >
                            {
                                getFieldDecorator('tradingID', {
                                    rules: [{ required: true, message: '交易ID不能为空' }],
                                    initialValue: !isShowDefault ? racquetData.tradingID : '55220',
                                })(
                                    <Input type="text" />,
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="阿里订单号"
                        >
                            {
                                getFieldDecorator('alOrderNumber', {
                                    rules: [
                                        { required: true, message: '阿里订单号不能为空' },
                                        { pattern: /^\d+$/, message: '阿里订单号只能为纯数字'}
                                    ],
                                    initialValue: !isShowDefault ? racquetData.alOrderNumber : undefined,
                                })(
                                    <Input type="text" />,
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
                <span className="orderquery-racquet-span">
                    一个系统采购订单对应一个阿里订单
                </span>
            </Modal>
        );
    }
}
export default Form.create()(RacquetModal)
