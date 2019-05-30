import React from 'react'
import {
    Modal,
    Form,
    message,
} from 'antd'
import { fetchPost } from '../../../../util/fetch';
import CSelect from '../../../../components/cselect';
import { Order_Modify_Merchandiser_Api_B, Order_Staff_Inquiry_Api_B } from '../constants/Api';
import {randNum} from "../../../../util/baseTool";
const FormItem = Form.Item;

class OrderModifyModal extends React.Component {
    state = {
        subloading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ subloading: true });
                const data = { data: {keys: this.props.listOrderNumber, merchandiser: values['merchandiser']}}
                fetchPost(Order_Modify_Merchandiser_Api_B, data, 1)
                    .then((result) => {
                        this.setState({subloading: false});
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.loadData();
                        } else {
                            message.error(result.msg)
                        }
                    })
            }
        })
    };

    // 取消
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.showOrCloseModifyModal(false, []);
    };

    render() {
        const { visible, listOrderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'修改采购单跟单员'}
                destroyOnClose={true}
                width={500}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                confirmLoading={this.state.subloading}
            >
                <Form>
                    <div>
                        <FormItem
                            {...this.formItemLayout}
                            label="已选中采购单"
                        >
                            {
                                listOrderNumber.map((t, index) => {
                                    return (
                                        index === 0 ? (
                                            <p style={{height: '25px', lineHeight: '25px', marginTop: '6px'}} key={randNum()}>{t}</p>
                                        ) : (
                                            <p style={{height: '25px', lineHeight: '25px'}} key={randNum()}>{t}</p>
                                        )

                                    )
                                })
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="姓名"
                        >
                            {
                                getFieldDecorator('merchandiser',{
                                    rules: [{ required: true, message: '姓名不能为空' }],
                                })(
                                    <CSelect
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={Order_Staff_Inquiry_Api_B}
                                        params={{data:{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}} // 搜索参数
                                        placeholder={'请选择'}
                                    />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(OrderModifyModal)
