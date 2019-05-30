import React from 'react'
import {
    Modal,
    Form,
    Input,
} from 'antd'
import { fetchPost } from '../../../../../util/fetch';
import CSelect from '../../../../../components/cselect';
import { GET_LOGISTICS_CHANNEL, MARK_TRACKING_NUMBER } from '../constants/Api'
const FormItem = Form.Item;

class MarkModal extends React.Component {
    state = {
        loading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            const { pageNumber, pageData } = this.props;
            this.setState({ loading: true });
            if (!err) {
                fetchPost(MARK_TRACKING_NUMBER, {data: values}, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit(pageNumber, pageData);
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.setState({loading: false});
        this.props.form.resetFields();
        this.props.closeModal();
    };
    render() {
        const { visible, platformOrderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="mymallorder-modal">
                <Modal
                    visible={visible}
                    title={'标记跟踪号'}
                    destroyOnClose={true}
                    width={500}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                    confirmLoading={this.state.loading}
                >
                    <Form>
                        <div className="mymallorder-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="平台单号"
                            >
                                {
                                    getFieldDecorator('platformOrderNumber',{
                                        rules: [{ required: true, message: '平台单号不能为空' }],
                                        initialValue: platformOrderNumber ? platformOrderNumber : ''
                                      })(
                                        <Input
                                            style={{ width: 260 }}
                                            onChange={()=>{this.setState({loading: false});}}
                                            disabled={Boolean(platformOrderNumber)}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="物流渠道"
                                className="mymallorder-modal-cselect"
                            >
                                {
                                    getFieldDecorator('logisticsChannel')(
                                        <CSelect
                                            // list={details ? [details.platform] : []} // 默认值列表
                                            // list={[]}
                                            code='key' // 列表编码字段
                                            name='label' // 列表名称字段
                                            url={GET_LOGISTICS_CHANNEL}
                                            // mode='multiple' // 是否多选
                                            // maxCount={3} // 最多选择项数量
                                            // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                            params={{ data: {searchColumn: 'shippingCarrier', pageNumber: 1, pageData: 30 } }} // 搜索参数
                                            apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder={'请选择'}
                                            onChange={()=>{this.setState({loading: false});}}
                                        //其它字段同 Select组件配置
                                        />
                                    )
                                }
                            </FormItem>
                             <FormItem
                                {...this.formItemLayout}
                                label="跟踪号"
                            >
                                {
                                    getFieldDecorator('trackingNumber',{
                                        rules: [{ required: true, message: '跟踪号不能为空' }],
                                      })(
                                        <Input
                                            type="text"
                                            style={{ width: 260 }} 
                                            // maxLength={12}
                                            onChange={()=>{this.setState({loading: false});}}
                                        />
                                    )
                                }
                            </FormItem>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(MarkModal)