import React from 'react'
import {
    Modal,
    Form,
    Button,
    message,
    Input,
    Select
} from 'antd'
import { fetchPost } from '@/util/fetch';
import {
    shopeeAddAuth,
    shopeeSiteList
} from '../constants/Api'
import {
    authState
} from '../constants'
import CSelect from '@/components/cselect';
const FormItem = Form.Item;
const Option = Select.Option;

class AddNewAuthorization extends React.Component {
    state = {
        loading: false,
        isAdd: true
    };
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                for(let key in values){
                    let v = values[key];
                    values[key] = v && v.trim  && v.trim();
                }
                const { isAdd } = this.state;
                values.type = isAdd ? 0 : 1;
                this.setState({ loading: true });
                fetchPost(shopeeAddAuth, { data: values }, 2)
                    .then(result => {
                        if (result.state === '000001') {
                            message.success(result.msg)
                            this.props.getTableList()
                            this.handleCancel()
                        }
                    })
                    .finally(() => {
                        this.setState({
                            loading: false
                        });
                    })
            }
        })
    };
    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            isAdd: true
        });
        this.props.form.resetFields();
        this.props.closeModal();
    };
    componentWillReceiveProps(next) {
        if (
            next.visible &&
            !this.props.visible &&
            next.sellerId &&
            next.sellerId !== this.props.sellerId
        ) {
            const { getShopeeDetailsAsync } = this.props;
            const { setFieldsValue } = this.props.form;
            getShopeeDetailsAsync({ data: { sellerId: next.sellerId } })
                .then(r => {
                    if (r) {
                        this.setState({
                            isAdd: false
                        }, () => setFieldsValue({
                            state: r.isEnabled,
                            parentSellerId: r.parentSellerId,
                            partnerId: r.partnerId,
                            partnerName: r.partnerName,
                            secretKey: r.secretKey,
                            sellerId: r.sellerId,
                            shopId: r.shopId,
                            siteCode: r.siteCode,
                        }))
                    }
                })
        }

    }
    render() {
        const { loading, isAdd } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'新增授权'}
                destroyOnClose={true}
                maskClosable={false}
                width={600}
                onCancel={this.handleCancel}
                okText={'保存'}
                onOk={this.handleSubmit}
                confirmLoading={loading}
            >
                <Form>
                    <div className="authorization-modal-form">
                        <FormItem
                            {...this.formItemLayout}
                            label="账号名称"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('sellerId', {
                                    rules: [
                                        { required: true, message: '账号名称 不能为空' },
                                        { max: 50, message: '账号名称 字符长度不能超过50' }
                                    ]
                                })(
                                    <Input disabled={!isAdd} placeholder="请输入账号名称" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="父账号"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('parentSellerId', {
                                    rules: [{ required: true, message: '父账号 不能为空' },
                                    { max: 50, message: '父账号 字符长度不能超过50' }]
                                })(
                                    <Input disabled={!isAdd} placeholder="请输入父账号" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="国家站点"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('siteCode', {
                                    rules: [{ required: true, message: '国家站点 不能为空' }]
                                })(
                                    <CSelect
                                        code='key' // 列表编码字段
                                        name='key' // 列表名称字段
                                        url={shopeeSiteList}
                                        params={{ data: { searchColumn: 'name', pageData: 30, pageNumber: 1 } }} // 搜索参数
                                        apiListType={3}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder="请选择国家站点"
                                        disabled={!isAdd}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="账号秘钥"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('secretKey', {
                                    rules: [{ required: true, message: '账号秘钥 不能为空' },
                                    { max: 200, message: '账号秘钥 字符长度不能超过200' }]
                                })(
                                    <Input disabled={!isAdd} placeholder="请选择账号秘钥" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Shop_id"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('shopId', {
                                    rules: [
                                        { required: true, message: 'Shop_id 不能为空' },
                                        { max: 19, message: 'Shop_id 字符长度不能超过19' }
                                    ]
                                })(
                                    <Input placeholder="请输入Shop_id" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Partner_id"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('partnerId', {
                                    rules: [{ required: true, message: 'Partner_id 不能为空' },
                                    { max: 100, message: 'Partner_id 字符长度不能超过100' }]
                                })(
                                    <Input disabled={!isAdd} placeholder="请输入Partner_id" />
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="Patner_name"
                            className="margin-ss-bottom"
                        >
                            {
                                getFieldDecorator('partnerName', {
                                    rules: [{ required: true, message: 'Patner_name 不能为空' },
                                    { max: 100, message: 'Patner_name 字符长度不能超过100' }]
                                })(
                                    <Input disabled={!isAdd} placeholder="请输入Patner_name" />
                                )
                            }
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(AddNewAuthorization)