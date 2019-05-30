import React from 'react';
import {
    Modal,
    Form,
    Button,
    Input,
} from 'antd';
import { fetchPost } from 'util/fetch';
import {
    ADD_EBAY_ACCOUNT
} from '../constants/Api'
const FormItem = Form.Item;

class AddNewAuthorization extends React.Component {

    state = {
        loading: false,
        redirectUrl: ''
    };

    formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
    };

    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            if (!err) {
                fetchPost(ADD_EBAY_ACCOUNT, { data: values }, 2)
                    .then(result => {
                        if (result.state === '000001') {
                            this.setState({ redirectUrl: result.data.redirectUrl });
                        }
                    })
            }
        })
    };

    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            redirectUrl: ''
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="authorization-modal">
                {
                    !this.state.redirectUrl ?
                        <Modal
                            visible={visible}
                            title={'新增授权'}
                            destroyOnClose={true}
                            width={500}
                            onCancel={this.handleCancel}
                            okText={'保存'}
                            onOk={this.handleSubmit}
                            confirmLoading={this.state.loading}
                        >
                            <Form>
                                <div className="authorization-modal-form">
                                    <FormItem
                                        {...this.formItemLayout}
                                        label="ebay账号"
                                    >
                                        {
                                            getFieldDecorator('account', {
                                                rules: [{ required: true, message: 'ebay账号不能为空' }]
                                            })(
                                                // <CSelect
                                                //     code='label'
                                                //     name='label'
                                                //     url={QUERY_EBAY_ACCOUNT}
                                                //     params={{ data: { searchColumn: 'name', pageData: 30, pageNumber: 1 } }}
                                                //     apiListType={1}
                                                //     placeholder={'请选择'}
                                                //     onChange={() => { this.setState({ loading: false }) }}
                                                // />
                                                <Input placeholder="请输入ebay账号" onChange={() => { this.setState({ loading: false }) }} />
                                            )
                                        }
                                    </FormItem>
                                    <p>备注：系统将引导您到eBay站点进行账户授权。</p>
                                </div>
                            </Form>
                        </Modal>
                        :
                        <Modal
                            visible={visible}
                            title={'点击跳转'}
                            destroyOnClose={true}
                            width={500}
                            onCancel={()=>{
                                this.handleCancel();
                                this.props.handleSubmit();
                            }}
                            footer={
                                <Button onClick={()=>{
                                    this.handleCancel();
                                    this.props.handleSubmit();
                                }}>关闭</Button>
                            }
                        >
                            <p style={{textAlign: 'center'}}>
                                点击
                                <a target="_blank" href={this.state.redirectUrl} style={{fontSize: 26, color: 'red'}}>此处</a>
                                完成跳转
                            </p>
                        </Modal>
                }
            </div>
        );
    }
}
export default Form.create()(AddNewAuthorization)