import React from 'react';
import {
    Modal,
    Radio,
    Form,
    Input,
    message,
} from 'antd';
import { REVIEW_TASK_AND_ORDER_RAPID_APPROVAL_API } from '../../constants/Api';
import { fetchPost } from '../../../../../util/fetch';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
};

class AddTaskRapidApprovalModal extends React.Component {
    state = {
        value: 1,
        showTextArea: false,
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
            showTextArea: e.target.value !== 1,
        });
    };

    /**
     * HTTP请求 调用快速审批
     * @param rapidApproval--1同意 2驳回
     */
    handleSubmitApprovalModal = () => {
        const { getFieldValue } = this.props.form;
        const { onOrderSubmit, item } = this.props;
        let sContent = getFieldValue('processOpinion');
        if ((sContent === undefined || sContent.length === 0) && this.state.value === 2) {
            message.warning('驳回意见为必填');
            return;
        }

        if (this.state.value === 1) {
            sContent = '';
        }
        const keyID = item.id;
        const dicData = {
            data: {
                id: keyID,
                processOpinion: sContent,
                processResult: this.state.value,
            },
        };
        fetchPost(REVIEW_TASK_AND_ORDER_RAPID_APPROVAL_API, dicData, 2)
            .then((result) => {
                if (result.state === '000001') {
                    onOrderSubmit();
                }
            });
    };

    render() {
        const { visible, onOrderCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        const isShowTextArea = this.state.showTextArea ? (
            <div className="myupcoming_task_opinion_div">
                <FormItem
                    {...formItemLayout}
                    label=" 请输入驳回意见:"
                >
                    {getFieldDecorator('processOpinion', {
                        rules: [{ required: true, message: '请输入驳回意见' }],
                    })(
                        <TextArea
                            placeholder="请输入驳回意见"
                            style={{ width: 560 }}
                            autosize={{ minRows: 5, maxRows: 5 }}
                        />,
                    )}
                </FormItem>
            </div>
        ) : null;
        return (
            <Modal
                title="快速审批"
                width={500}
                visible={visible}
                onCancel={onOrderCancel}
                onOk={this.handleSubmitApprovalModal}
                cancelText="取消"
                okText="确定"
                destroyOnClose
                maskClosable={false}
            >
                <RadioGroup value={this.state.value} onChange={this.handleChange}>
                    <Radio value={1}>同意</Radio>
                    <Radio value={2}>驳回</Radio>
                </RadioGroup>
                {isShowTextArea}
            </Modal>
        );
    }
}

export default Form.create()(AddTaskRapidApprovalModal);
