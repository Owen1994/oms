import React from 'react';
import { Modal, Form, message } from 'antd';
import CSelect from '../../../../../components/cselect/index';
import { REVIEW_CHECK_USER_API } from '../../constants/Api';
import { REVIEW_TASK_AND_ORDER_TRANSFER_API } from '../../constants/Api';
import { fetchPost } from '../../../../../util/fetch';
import {Create_Msg_API} from "../../../messagenotification/constants/Api";


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
};

class AddTaskTransferModal extends React.Component {
    /**
     * HTTP请求 任务转移
     */
    handleSubmitTransfer = () => {
        const { onTaskSubmit, item } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = { ...values };
                const downHandler = data.downHandler;
                const keyID = item.id;
                const dicData = { data: { ids: [keyID], downHandler } };
                fetchPost(REVIEW_TASK_AND_ORDER_TRANSFER_API, dicData, 2)
                    .then((result) => {
                        if (result.state === '000001') {
                            onTaskSubmit();
                        }
                    });
            }
        });
    };

    render() {
        const { visible, onTaskCancel, item } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="任务转移"
                width={500}
                visible={visible}
                onCancel={onTaskCancel}
                onOk={this.handleSubmitTransfer}
                cancelText="取消"
                okText="确定"
                destroyOnClose
                maskClosable={false}
            >
                <Form layout="inline">
                    <div className="myupcoming-list_filter_item">
                        <FormItem
                            {...formItemLayout}
                            label=" 转移给:"
                        >
                            {getFieldDecorator('downHandler', {
                                rules: [{ required: true, message: '新处理人为必填' }],
                            })(
                                <CSelect
                                    style={{ minWidth: 200, width: '100%' }}
                                    code="key" // 列表编码字段
                                    name="label" // 列表名称字段
                                    url={REVIEW_CHECK_USER_API}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                            type: '1',
                                            id: item.id,
                                        },
                                    }} // 搜索参数
                                    placeholder="输入新处理人"
                                    apiListType={0}
                                />,
                            )}
                        </FormItem>
                    </div>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(AddTaskTransferModal);
