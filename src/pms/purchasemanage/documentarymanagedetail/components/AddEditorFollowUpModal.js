import React from 'react';
import { Form, Modal, Input } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

export default class AddAKeyExpediteOrderModal extends React.Component {
    render() {
        const {
            visible,
            onTaskSubmit,
            onTaskCancel,
            item,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="跟进"
                width={800}
                visible={visible}
                onCancel={onTaskCancel}
                onOk={() => { onTaskSubmit(); }}
                cancelText="取消"
                okText="保存"
                destroyOnClose
            >
                <Form>
                    <div>
                        <span>跟进结果：</span>
                        <div>
                            <FormItem>
                                {getFieldDecorator('followUpResultContent', {
                                    initialValue: item ? item.followUpResults : undefined,
                                })(
                                    <TextArea
                                        placeholder="请输入跟进结果"
                                        style={{ width: 760 }}
                                        autosize={{ minRows: 5, maxRows: 5 }}
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="documentary_detail_search_table">
                        <span>物流单号：</span>
                        <div>
                            <FormItem>
                                {getFieldDecorator('logisticsNumberContent', {
                                    initialValue: item ? item.shipmentNumber : undefined,
                                })(
                                    <TextArea
                                        placeholder="请输入跟进结果"
                                        style={{ width: 760 }}
                                        autosize={{ minRows: 5, maxRows: 5 }}
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </div>
                    <div className="documentary_detail_search_table">
                        <span>备注：</span>
                        <div>
                            <FormItem>
                                {getFieldDecorator('remark', {
                                    initialValue: item ? item.remark : undefined,
                                })(
                                    <TextArea
                                        placeholder="请输入备注"
                                        style={{ width: 760 }}
                                        autosize={{ minRows: 5, maxRows: 5 }}
                                    />,
                                )}
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </Modal>
        );
    }
}
