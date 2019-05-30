import React from 'react';
import {
    Modal,
    Form,
    Button,
    message,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { fetchPost } from '../../../../util/fetch';
import ROLE from '../constants/index';
import { ADD_BUSINESS_ROLE, STAFFINQUIRY } from '../constants/Apis';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
/**
 *作者: huangjianfeng
 *功能描述:  SKU增加、修改弹窗
 *时间: 2018/8/27 15:55
 */
class AddModal extends React.Component {
    state = {
        loading: false,
    }

    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {
                try {
                    const arr = Object.keys(err);
                    const errMessage = err[arr[0]].errors[0].message;
                    return message.warning(errMessage);
                } catch (error) {
                    message.warning('请核实必填字段是否填写');
                }
                return;
            }
            this.setState({ loading: true });
            delete value.searchType;
            fetchPost(ADD_BUSINESS_ROLE, { data: { ...value } }, 1)
                .then((result) => {
                    this.setState({ loading: false });
                    if (result.state === '000001') {
                        this.props.onSearch();
                        this.props.onCancel();
                    }
                });
        });
    }

    render() {
        const loading = this.state.loading;
        const { visible, onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="创建业务角色"
                destroyOnClose
                visible={visible}
                onCancel={onCancel}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={() => this.handleOk()} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <div>
                        <FormItem {...formItemLayout} label="人员名称">
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true, message: '请输入人员名称',
                                }],
                            })(
                                <CSelect
                                    // list={ROLETYPE} // 默认值列
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={STAFFINQUIRY}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    formType={0} // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            role: 4,
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                    style={{ width: '330px' }}
                                    handleChange={this.handleAccountNameChange} // 触发下拉事件
                                />,
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色类型" className="margin-ss-top">
                            {getFieldDecorator('role', {
                                rules: [{
                                    required: true, message: '请输入角色类型',
                                }],
                            })(
                                <CSelect
                                    list={ROLE} // 默认值列
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                    style={{ width: '330px' }}
                                // handleChange={this.handleChange} // 触发下拉事件
                                />,
                            )}
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(AddModal);
