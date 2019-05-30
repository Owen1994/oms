import React from 'react';
import { Form, Modal } from 'antd';
import CSelect from '../../../../../components/cselect';
import {
    PURCHASE_ORDER_DETAILS_SEARCH_APPROVER,
} from '../../constants/Api';

/**
 * 转移审核弹框
 */
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const FormItem = Form.Item;
export default class TransferAuditModal extends React.Component {
    render() {
        const {
            visible, cancel, ok, isRequired,
        } = this.props;
        return (
            <Modal
                title="转移审核"
                width={400}
                visible={visible}
                onOk={ok}
                onCancel={cancel}
            >
                <FormItem
                    {...formItemLayout}
                    label="请选择新的审批人:"
                >
                    {this.props.form.getFieldDecorator('ApproverKey', {
                        rules: [{ required: isRequired, message: '请选择审批人' }],
                    })(
                        <CSelect
                            code="key"
                            name="label"
                            url={PURCHASE_ORDER_DETAILS_SEARCH_APPROVER}
                            params={{
                                data: {
                                    pageData: 20,
                                    pageNumber: 1,
                                    searchColumn: 'name',
                                },
                            }}
                            placeholder="请选择"
                        />,
                    )}
                </FormItem>
            </Modal>
        );
    }
}
