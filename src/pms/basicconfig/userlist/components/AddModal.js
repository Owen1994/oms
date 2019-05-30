import React from 'react';
import {
    Modal,
    Form,
    Button,
    Input,
    message,
    Row,
    Col,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { fetchPost } from '../../../../util/fetch';
import { ROLETYPE } from '../constants';
import { STAFFINQUIRY,ADDANDEDITOR } from '../constants/Api';
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
}
/**
 *作者: huangjianfeng
 *功能描述:  SKU增加、修改弹窗
 *时间: 2018/8/27 15:55
 */
class AddModal extends React.Component {

    state = {
        loading: false,
        accountKey: '', // 账号
        accountName: '', // table人员名称
        contactNumber: '', // 联系电话
        roleTypeCode: '', // 角色类型code
    }
    componentDidMount () {
        this.props.form.setFieldsValue({
            accountName: "",
            roleType: "",
            phone: ""
        });
    }

    componentDidUpdate(prevProps) {
        const visible = this.props.visible;
        const prevVisible = prevProps.visible;
        if(visible && !prevVisible) {
            prevProps.form.resetFields();
            if (this.props.item) {
                this.props.form.setFieldsValue({
                    accountName: this.props.item.accountNumber,
                    roleType: this.props.item.roleTypeCode,
                    phone: this.props.item.contactNumber
                });
                this.setState({
                    accountKey: this.props.item.accountNumber,
                    accountName: this.props.item.personnelName,
                    contactNumber: this.props.item.contactNumber,
                    roleTypeCode: this.props.item.roleTypeCode,
                    key: this.props.item.key,
                })

            }
        }
    }


    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            const phone = /^1[3|4|5|7|8|9][0-9]{9}$/;
            if (!phone.test(value.phone)) {
                message.warning('请输入有效的手机号码！');
                return false;
            }
            let accountKey, accountName;
            if (this.props.item) {
                accountKey = this.state.accountKey;
                accountName = this.state.accountName;
                value.key = this.state.key;
            } else {
                accountKey = this.state.accountName.key;
                accountName = this.state.accountName.label;
            }

            this.setState({loading: true})


            fetchPost(ADDANDEDITOR, {data: {
                ...value,
                accountKey: accountKey,
                accountName: accountName
            }}, 1)
            .then(result => {
                this.setState({loading: false})
                if(result.state === '000001') {
                    this.props.onSearch()
                    this.props.onCancel()
                }
            })
        })
    }

    // 人员名称事件
    handleAccountNameChange = (value) => {
        this.setState({
            accountName: value[0],
        })
    }

    render(){
        const loading = this.state.loading;
        // const  { accountName,contactNumber,roleTypeCode  } = this.state;
        const {visible, onCancel, item} = this.props;
        const { getFieldDecorator } = this.props.form;
        const { accountName,roleType,phone } = this.props.form.getFieldsValue(['accountName', 'roleType','phone']);
        let title = ''
        if(item){
            title = '编辑用户'
        } else {
            title = '新增用户'
        }
        return (
            <Modal
                width={'600px'}
                title={title}
                destroyOnClose
                visible={visible}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <div>
                            <FormItem
                                {...formItemLayout}
                                label="人员名称"
                                style={{paddingBottom : '10px'}}
                            >
                                {getFieldDecorator('accountName', {
                                rules: [{
                                    required: true, message: '请输入人员名称',
                                }],
                                })(
                                    <CSelect
                                        disabled={item ? true : false}
                                        code='key' // 列表编码字段
                                        name='label' // 列表名称字段
                                        url={STAFFINQUIRY}
                                        formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{
                                                data: {
                                                    searchColumn: 'name',
                                                    pageData: 20,
                                                    pageNumber: 1
                                                }
                                        }}
                                        apiListType={0}
                                        placeholder={'请选择'}
                                        style={{width: "330px"}}
                                        handleChange={this.handleAccountNameChange} // 触发下拉事件
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="角色类型"
                                style={{paddingBottom : '10px'}}
                            >
                                {getFieldDecorator('roleType', {
                                rules: [{
                                    required: true, message: '请输入角色类型',
                                }],
                                })(
                                    <CSelect
                                        list={ROLETYPE} // 默认值列
                                        code='code' // 列表编码字段
                                        name='name' // 列表名称字段
                                        params={{
                                                searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1
                                        }} // 搜索参数
                                        apiListType={0}
                                        placeholder={'请选择'}
                                        style={{width: "330px"}}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="联系电话"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true, message: '请输入联系电话',
                                    }],
                                })(
                                    <Input style={{width: "330px"}} placeholder={'请输入联系电话'}/>
                                )}
                            </FormItem>
                    </div>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(AddModal)
