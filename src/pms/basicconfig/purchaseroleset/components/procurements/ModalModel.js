/**
 *作者: chenlin
 *功能描述: 弹窗
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Form,
    Modal,
    Button,
    Input,
    // message,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import CSelect from '../../../../../components/cselect';
import {
    STAFFINQUIRY,
    PUBLIC_INFORMATION_BUSINESS_LINE,
    ROLE_TYPE,
    PROCUREMENT_ROLE_CONFIGUR_ATION_NEWADD,
    PROCUREMENT_ROLE_SKU,
} from '../../constants';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
class modal extends React.Component {
    state = {
        loading: false,
        purchaseSkuName: '',
    }

    handleChange = (value) => {
        this.setState({
            purchaseSkuName: value[0].purchaseName,
        });
    }

    // 弹窗提交
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                const params = { };
                const data = { ...values };
                data.sku = values.sku[0].key;
                params.data = data;
                fetchPost(PROCUREMENT_ROLE_CONFIGUR_ATION_NEWADD, params, 1).then((res) => {
                    if (res && res.state === '000001') {
                        this.props.onCancel();
                        this.props.form.resetFields();
                        this.props.onSearch();
                        this.setState({
                            loading: false,
                            purchaseSkuName: '',
                        });
                    } else {
                        this.setState({
                            loading: false,
                        });
                    }
                });
            }
        });
    }

    render() {
        const { newVisible, onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const purchaseSkuNames = this.state.purchaseSkuName;
        return (
            <div>
                <Modal
                    {...this.props}
                    title="创建采购角色"
                    visible={newVisible}
                    footer={[
                        <Button key="cancel" onClick={onCancel}>取消</Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={() => this.handleOk()}
                            loading={loading}
                        >保存
                        </Button>,
                    ]}
                    className="pms-purchaseroleset-modal"
                >
                    <FormItem
                        {...formItemLayout}
                        label="人员名称"
                        style={{marginBottom: '10px'}}
                    >
                        {getFieldDecorator('userName', {
                            rules: [
                                { required: true, message: '请选择' },
                            ],
                        })(
                            <CSelect
                                code="key"
                                name="label"
                                url={STAFFINQUIRY}
                                params={{
                                    data: {
                                        searchColumn: 'name',
                                        role: 4,
                                        pageData: 20,
                                        pageNumber: 1,
                                    },
                                }} // 搜索参数
                                apiListType={0}
                                placeholder="请选择"
                                style={{ width: 330 }}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="sku"
                        style={{marginBottom: '10px'}}
                    >
                        {getFieldDecorator('sku', {
                            rules: [
                                { required: true, message: 'Please select your categories!' },
                            ],
                        })(
                            <CSelect
                                code="key"
                                name="label"
                                url={PROCUREMENT_ROLE_SKU}
                                params={{
                                    data: {
                                        searchColumn: 'label',
                                        pageData: 20,
                                        pageNumber: 1,
                                    },
                                }} // 搜索参数
                                apiListType={0}
                                placeholder="请选择"
                                formType={1}
                                handleChange={this.handleChange}
                                style={{ width: 330 }}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="SKU采购名称"
                        style={{marginBottom: '10px'}}
                    >
                        {getFieldDecorator('purchaseSkuName', {
                            initialValue: purchaseSkuNames,
                            rules: [
                                { required: true, message: 'Please select your categories!' },
                            ],
                        })(
                            <Input
                                style={{ width: 330 }}
                                autosize={{ minRows: 2, maxRows: 6 }}
                                disabled
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="业务线"
                        style={{marginBottom: '10px'}}
                    >
                        {getFieldDecorator('businessLine', {
                            initialValue: 1,
                            rules: [
                                { required: true, message: '请选择' },
                            ],
                        })(
                            <CSelect
                                list={PUBLIC_INFORMATION_BUSINESS_LINE}
                                code="key"
                                name="label"
                                params={{ searchColumn: 'name' }}
                                apiListType={2}
                                style={{ width: 330 }}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="角色类型"
                        style={{marginBottom: '10px'}}
                    >
                        {getFieldDecorator('roleType', {
                            initialValue: 1,
                            rules: [
                                { required: true, message: '请选择' },
                            ],
                        })(
                            <CSelect
                                list={ROLE_TYPE}
                                code="key"
                                name="label"
                                params={{ searchColumn: 'name' }}
                                apiListType={2}
                                style={{ width: 330 }}
                            />,
                        )}
                    </FormItem>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(modal);
