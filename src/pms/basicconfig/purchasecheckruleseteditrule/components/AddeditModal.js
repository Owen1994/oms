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
    Checkbox,
    Input,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import CSelect from '../../../../components/cselect';
import CCheckbox from '../../../../components/ccheckbox';
import {
    EDITORIAL_RULES_DESIGNATED_SUPPLIER,
    PROCURMENT_ROLE_SKU,
    PUBLIC_INFORMATION_PAYMENTMETHOD,
} from '../constants';
import parseListData from '../selectors';

const FormItem = Form.Item;

class modal extends React.Component {
    state = {
        loading: false,
        checkAll: false,
        checkAllList: [],
        listCcheckbox: [],
        indeterminate: false,
    }

    componentDidMount() {
        fetchPost(PUBLIC_INFORMATION_PAYMENTMETHOD, {}, 2)
            .then((result) => {
                if (result.state === '000001') {

                    const list = parseListData(result.data.list);
                    this.setState({
                        listCcheckbox: list,
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        if (visible && !preVisible && nextProps.index === 3) {
            if (this.props.finishConditionData.paymentMethod) {
                if (this.props.finishConditionData.paymentMethod.length !== 0) {
                    this.state.checkAllList = [];
                    for (let i = 0; i < this.props.finishConditionData.paymentMethod.length; i++) {
                        this.state.checkAllList.push(this.props.finishConditionData.paymentMethod[i].key);
                    }
                }
            }

            if (this.state.checkAllList.length === this.state.listCcheckbox.length) {
                this.state.indeterminate = false;
                this.state.checkAll = true;
            } else if (this.state.checkAllList.length > 0) {
                this.state.indeterminate = true;
                this.state.checkAll = false;
            } else {
                this.state.indeterminate = false;
                this.state.checkAll = false;
            }

            this.setState({});
        }
    }


    // 全选
    onCheckAllChange = (e) => {
        if (e.target.checked) {
            this.state.checkAllList = [];
            for (let i = 0; i < this.state.listCcheckbox.length; i++) {
                this.state.checkAllList.push(this.state.listCcheckbox[i].value);
            }

            this.props.form.setFieldsValue({
                paymentMethod: this.state.listCcheckbox
            });

            this.setState({
                indeterminate: false,
                checkAll: e.target.checked,
            });
        } else {
            this.state.checkAllList = [];
            this.props.form.setFieldsValue({
                paymentMethod: []
            });
            this.setState({
                indeterminate: false,
                checkAll: e.target.checked,
            });
        }
    }

    handleChange = (values) => {
        if (values.length === this.state.listCcheckbox.length) {
            this.setState({
                indeterminate: false,
                checkAll: true,
            });
        } else if (values.length > 0) {
            this.setState({
                indeterminate: true,
                checkAll: false,
            });
        } else {
            this.setState({
                indeterminate: false,
                checkAll: false,
            });
        }
    }

    // 弹窗提交
    handleSaveOk = (e, index) => {
        const values = this.props.form.getFieldsValue();
        e.preventDefault();
        if (index === 1) {
            this.props.addFinishConditionRight({ children: values.supplier, key: index });
        } else if (index === 2) {
            this.props.addFinishConditionRight({ children: values.sku, key: index });
        } else if (index === 3) {
            this.props.addFinishConditionRight({ children: values.paymentMethod, key: index });
        } else if (index === 4) {
            this.props.addFinishConditionRight({ value: values.total, key: index });
        } else if (index === 5) {
            this.props.addFinishConditionRight({ value: values.quantityInterval, key: index });
        }
        this.handleOnCancel();
        // this.props.form.resetFields();
    };

    handleOnCancel = () => {
        this.props.onCancel();
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const { checkAllList, listCcheckbox } = this.state;

        let title;
        let addeditModalcomponents;
        switch (this.props.index) {
            case 1: {
                title = '请选择指定的供应商：';
                addeditModalcomponents = (
                    <div>
                        <FormItem>
                            {getFieldDecorator('supplier', {
                                initialValue: this.props.item,
                                rules: [
                                    { required: true, message: '请选择' },
                                ],
                            })(
                                <CSelect
                                    list={this.props.item}
                                    code="key"
                                    name="label"
                                    url={EDITORIAL_RULES_DESIGNATED_SUPPLIER}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}
                                    mode="multiple"
                                    formType={1}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </div>
                );
                break;
            }
            case 2: {
                title = '请选择指定的SKU：';
                addeditModalcomponents = (
                    <div>
                        <FormItem>
                            {getFieldDecorator('sku', {
                                initialValue: this.props.item,
                                rules: [
                                    { required: true, message: '请选择' },
                                ],
                            })(
                                <CSelect
                                    list={this.props.item}
                                    code="key"
                                    name="label"
                                    url={PROCURMENT_ROLE_SKU}
                                    params={{
                                        data: {
                                            searchColumn: 'label',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}
                                    formType={1}
                                    mode="multiple"
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </div>
                );
                break;
            }
            case 3: {
                title = '请选择指定的付款方式：';
                addeditModalcomponents = (
                    <div className="paymentMethod">
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全部
                        </Checkbox>
                        <FormItem>
                            {getFieldDecorator('paymentMethod', {
                                initialValue: checkAllList,
                            })(
                                <CCheckbox
                                    code="value" // 参数编码
                                    name="label" // 参数名称
                                    list={listCcheckbox}
                                    formType={1} // 表单数据类型，不填就是默认值，填1返回对象
                                    handleChange={this.handleChange}
                                />,
                            )}
                        </FormItem>
                    </div>
                );
                break;
            }
            case 4: {
                title = '指定采购总金额区间：';
                addeditModalcomponents = (
                    <div>
                        <p className="addeditModal-flex">
                            <select>
                                <option value="0">大于</option>
                            </select>
                            {getFieldDecorator('total', {
                                initialValue: this.props.itemValue,
                                rules: [
                                    { required: true, message: '请设置指定的数量' },
                                ],
                            })(
                                <Input type="text" maxLength={9} />,
                            )}
                        </p>
                    </div>
                );
                break;
            }
            case 5: {
                title = '请设置指定的数量：';
                addeditModalcomponents = (
                    <div>
                        <p className="addeditModal-flex">
                            <select>
                                <option value="0">大于</option>
                            </select>
                            {getFieldDecorator('quantityInterval', {
                                initialValue: this.props.itemValue,
                                rules: [
                                    { required: true, message: '请设置指定的数量' },
                                ],
                            })(
                                <Input type="text" maxLength={9} />,
                            )}
                        </p>
                    </div>
                );
                break;
            }
            default:
        }
        return (
            <div>
                <Modal
                    {...this.props}
                    title={title}
                    visible={visible}
                    index={this.props.index}
                    maskClosable={false}
                    destroyOnClose
                    footer={[
                        <Button key="cancel" onClick={this.handleOnCancel}>取消</Button>,
                        <Button
                            key="save"
                            type="primary"
                            onClick={e => this.handleSaveOk(e, this.props.index)}
                            loading={loading}
                        >保存
                        </Button>,
                    ]}
                    className="pms-purchasecheckruleseteditrule-modal"
                >
                    {addeditModalcomponents}
                </Modal>
            </div>
        );
    }
}
export default Form.create()(modal);
