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
    message,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import CCheckbox from '../../../../components/ccheckbox';
import {
    UPDATE_OVERSEA_SHOW_FILED_LIST,
} from '../constants/Apis';

const FormItem = Form.Item;

class modal extends React.Component {
    state = {
        loading: false,
        checkAll: true,
        checkAllList: [],
        listCcheckbox: [],
        indeterminate: false,
    }

    // componentDidUpdate(prevProps) {
    //     const visible = this.props.visible;
    //     const prevVisible = prevProps.visible;
    //     if (visible && !prevVisible) {
    //         fetchPost(GET_OVERSEA_SHOW_FILED_LIST, { data: { type: 2 } }).then((result) => {
    //             if (result.state === '000001') {
    //                 this.setState({ listCcheckbox: parseList(result.data.list) });
    //             }
    //         });
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.setState({ listCcheckbox: nextProps.fields, checkAllList: nextProps.fields.filter(item => item.fieldValue) });
        }
    }

    // 全选
    onCheckAllChange = (e) => {
        if (e.target.checked) {
            this.props.form.setFieldsValue({ paymentMethod: this.state.listCcheckbox });
            this.setState({
                indeterminate: false,
                checkAll: e.target.checked,
            });
        } else {
            this.props.form.setFieldsValue({ paymentMethod: [] });
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

    handleSaveOk = () => {
        this.setState({
            loading: true,
        });
        // const warehouseType = this.props.warehouseType;
        const paymentMethod = this.props.form.getFieldValue('paymentMethod');
        if (paymentMethod.length === 0) {
            message.warning('选项不能为空');
            this.setState({
                loading: false,
            });
            return false;
        }
        let data = [];
        const filterObj = {};
        paymentMethod.forEach((item) => {
            filterObj[item.fieldCode] = 1;
        });
        data = this.state.listCcheckbox.map((item) => {
            const newItem = { ...item };
            if (filterObj[item.fieldCode] === 1) {
                newItem.fieldValue = 1;
            } else {
                newItem.fieldValue = 0;
            }
            return newItem;
        });

        data = data.map((item) => {
            // item.fieldCode = item.fieldCode;
            // item.fieldName = item.fieldName;
            item.fieldValue = item.fieldValue;
            item.id = item.key;
            // item.warehouseType = warehouseType;
            // delete item.id;
            // delete item.key;
            delete item.label;
            delete item.value;
            delete item.userName;
            delete item.showOrder;
            delete item.fieldName;
            delete item.fieldCode;
            delete item.requiredFlag;
            delete item.type;
            return item;
        });

        data = { data };
        fetchPost(UPDATE_OVERSEA_SHOW_FILED_LIST, data, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        loading: false,
                        checkAllList: [],
                    });
                    this.props.onCancel();
                    this.props.handleFieldsOk(paymentMethod);
                    this.props.onSearch();
                } else {
                    this.setState({
                        loading: false,
                    });
                }
            });
    }

    render() {
        const { displayFieldsVisible, onCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        const loading = this.state.loading;
        const { checkAllList, listCcheckbox } = this.state;
        const addeditModalcomponents = (
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
                        // rules: [
                        //     { required: true, message: '请选择水果' },
                        // ],
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

        return (
            <Modal
                {...this.props}
                title="设置显示字段"
                displayFieldsVisible={displayFieldsVisible}
                index={this.props.index}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={onCancel}>取消</Button>,
                    <Button
                        key="save"
                        type="primary"
                        onClick={this.handleSaveOk}
                        loading={loading}
                    >保存
                    </Button>,
                ]}
                className="pms-purchasecheckruleseteditrule-modal"
            >
                {addeditModalcomponents}
            </Modal>
        );
    }
}
export default Form.create()(modal);
