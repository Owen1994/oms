import React from 'react';
import {
    Modal,
    Form,
    Input,
} from 'antd';
import Radiotags from '../../../../common/components/radiotags';
import { DOCUMENTAR_EXPEDITING_TEMPLATE_TYPE } from '../constants';

const FormItem = Form.Item;
const { TextArea } = Input;

export default class AddExpeditingTemplateModal extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            visible,
            onTaskSubmit,
            onTaskCancel,
            onSwitchTemplate,
        } = this.props;
        return (
            <Modal
                title="催货模板"
                width={800}
                visible={visible}
                onCancel={onTaskCancel}
                onOk={() => { onTaskSubmit(); }}
                cancelText="关闭"
                okText="保存"
                destroyOnClose
            >
                <Form>
                    <Radiotags
                        getFieldDecorator={getFieldDecorator}
                        list={DOCUMENTAR_EXPEDITING_TEMPLATE_TYPE}
                        name="expeditingTemplateState"
                        onChange={
                            (value, name) => {
                                onSwitchTemplate(name);
                            }
                        }
                    />

                    <div className="documentary_Expediting_Template_Textarea">
                        <FormItem>
                            {getFieldDecorator('followtext', {})(
                                <TextArea
                                    placeholder="请输入模板内容"
                                    style={{ width: 760 }}
                                    autosize={{ minRows: 10, maxRows: 10 }}
                                />,
                            )}
                        </FormItem>
                    </div>
                    <div className="documentary_Expediting_Template_div">
                        {'{supplierName} 为供应商名称，{data} 为勾选显示的数据 (不可删除，可任意更改位置)'}
                    </div>
                </Form>
            </Modal>
        );
    }
}
