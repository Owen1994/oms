import React from 'react';
import {
    Modal,
    Form,
    Button,
    // message,
    Input,
} from 'antd';
import CSelect from '../../../../components/cselect';
import { fetchPost } from '../../../../util/fetch';
import { PROCUREMENT_ROLE_SKU, ADD_DATA_PERMISSION } from '../constants/Apis';
import WAREHOUSETYPE from '../constants/index';


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
        // userName: '',
    }

    // componentDidMount() {
    //     this.setState({
    //         userName: getUrlParams().id,
    //     });
    // }

    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            this.setState({ loading: true });
            delete value.searchType;
            fetchPost(ADD_DATA_PERMISSION, { data: { ...value } }, 1)
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
                title="创建数据权限"
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
                                initialValue: this.props.userName,
                                rules: [{
                                    required: true, message: '请输入人员名称',
                                }],
                            })(
                                <Input style={{ width: '330px' }} disabled />,
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="仓库" className="margin-ss-top">
                            {getFieldDecorator('warehouse', {
                                rules: [{
                                    required: true, message: '请输入仓库',
                                }],
                            })(
                                <CSelect
                                    list={WAREHOUSETYPE} // 默认值列
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
                        <FormItem {...formItemLayout} label="SKU" className="margin-ss-top">
                            {getFieldDecorator('sku', {
                                rules: [{
                                    required: true, message: '请输入SKU',
                                }],
                            })(
                                <CSelect
                                    // list={WAREHOUSETYPE} // 默认值列
                                    code="key"
                                    name="label"
                                    url={PROCUREMENT_ROLE_SKU}
                                    mode="multiple" // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ data: { searchColumn: 'label', pageData: 20, pageNumber: 1 } }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                    style={{ width: '330px' }}
                                    localSearch={1} // 是否开启本地过滤检索，默认为 0 不开启，1为 开启
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
