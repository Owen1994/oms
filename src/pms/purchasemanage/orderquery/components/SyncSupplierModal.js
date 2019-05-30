import React from 'react'
import {
    Modal,
    Form,
    Checkbox,
    message,
} from 'antd'
import { fetchPost } from '../../../../util/fetch';
import CSelect from '../../../../components/cselect';
import { Order_Query_Sync_Supplier_Api } from '../constants/Api';
import { randNum } from "../../../../util/baseTool";
import { Rate_Type_List } from '../constants/index';
const FormItem = Form.Item;

class SyncSupplierModal extends React.Component {
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
                const data = {
                    data: {
                        keys: this.props.listOrderNumber,
                        syncSupplier: values.syncSupplier === undefined ? false : values.syncSupplier,
                        syncPayType: values.syncPayType === undefined ? false : values.syncPayType,
                        rateType: values.rateType,
                    }
                };

                fetchPost(Order_Query_Sync_Supplier_Api, data, 1)
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
        this.props.showOrCloseSyncSupplierModal(false, []);
    };

    render() {
        const { visible, listOrderNumber } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title={'同步供应商账号'}
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
                                            <p style={{height: '25px', lineHeight: '25px', marginTop: '8px'}} key={randNum()}>{t}</p>
                                        ) : (
                                            <p style={{height: '25px', lineHeight: '25px'}} key={randNum()}>{t}</p>
                                        )

                                    )
                                })
                            }
                        </FormItem>
                        <FormItem
                            {...this.formItemLayout}
                            label="汇率类型"
                        >
                            {
                                getFieldDecorator('rateType',{})(
                                    <CSelect
                                        list={Rate_Type_List}
                                        placeholder={'请选择'}
                                    />
                                )
                            }
                        </FormItem>
                    </div>
                    <div style={{color: 'red', marginLeft: '55px', marginTop: '10px'}}>
                        注：人民币账户更改为外币账户时必须选择汇率类型
                    </div>
                    <div style={{marginLeft: '55px', marginTop: '10px'}}>
                        {
                            getFieldDecorator('syncSupplier',{})(
                                <Checkbox>
                                    同步供应商账号
                                </Checkbox>
                            )
                        }
                        {
                            getFieldDecorator('syncPayType',{})(
                                <Checkbox>
                                    同步付款方式
                                </Checkbox>
                            )
                        }
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(SyncSupplierModal)
