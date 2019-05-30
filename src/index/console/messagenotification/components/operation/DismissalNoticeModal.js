import React from 'react';
import {
    Modal, Input, Form, Button,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { My_Recive_Msg_Dispose_API, My_Send_Msg_Info_API, My_Recive_Msg_Info_API } from '../../constants/Api';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * 下架申请
 */
export default class DismissalNoticeModal extends React.Component {
    componentWillReceiveProps(nextprops) {
        const visible = this.props.visible;
        if(!visible && nextprops.visible){
            const type = nextprops.type;
            const id = nextprops.itemData.id;
            if (type === 0) {
                this.handleSubmitReceiveInfo(id);
            } else {
                this.handleSubmitSendInfo(id);
            }
        }
    };

    /**
     * HTTP请求 我接收的消息 详细信息
     */
    handleSubmitReceiveInfo = (itemID) => {
        const dicData = {
            data: {
                receiveMessageId: itemID,
            },
        };
        fetchPost(My_Recive_Msg_Info_API, dicData, 2)
            .then((result) => {});
    };

    /**
     * HTTP请求 我发送的消息 详细信息
     */
    handleSubmitSendInfo = (itemID) => {
        const dicData = {
            data: {
                sendMessageId: itemID,
            },
        };
        fetchPost(My_Send_Msg_Info_API, dicData, 2)
            .then((result) => {});
    };

    /**
     * HTTP请求 审批消息
     */
    handleSubmitApprovalMsg = (itemID, processResult) => {
        const dicData = {
            data: {
                id: itemID,
                processResult,
            },
        };
        fetchPost(My_Recive_Msg_Dispose_API, dicData, 2)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.cancel();
                    this.props.loadData();
                }
            });
    };

    render() {
        const {
            visible, cancel, type, itemData,
        } = this.props;

        /**
         * 按钮
         */
        const showButton = (
            <div>
                <Button className="margin-ss-right" onClick={() => this.handleSubmitApprovalMsg(itemData.id, 1)}>
                    同意
                </Button>
                <Button className="margin-ss-right" onClick={() => this.handleSubmitApprovalMsg(itemData.id, 2)}>
                    驳回
                </Button>
            </div>
        );

        const clickButton = (
            <div className="margin-ss-top pms-msg-notification_modal_footer">
                {type === 0 ? showButton : null}
                <Button onClick={() => cancel()}>
                    关闭
                </Button>
            </div>);
        return (
            <Modal
                title="下架申请"
                width={600}
                visible={visible}
                onCancel={() => cancel()}
                footer={null}
                maskClosable={false}
            >
                <div className="pms-msg-notification_form_div">
                    <FormItem
                        {...formItemLayout}
                        label="发送人:"
                    >
                        <Input
                            defaultValue={itemData.senderName}
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="发送时间:"
                    >
                        <Input
                            defaultValue={itemData.sendTime}
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容:"
                    >
                        <section className="pms-msg-notification_modal_section" dangerouslySetInnerHTML={{__html: itemData.content}} />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="消息类型:"
                    >
                        <Input
                            defaultValue={itemData.messageTypeString}
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="业务处理状态:"
                    >
                        <Input
                            defaultValue={itemData.processStateString}
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="处理结论:"
                    >
                        <Input
                            defaultValue={itemData.processResultString}
                            disabled
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="处理时间:"
                    >
                        <Input
                            defaultValue={itemData.handleTime}
                            disabled
                        />
                    </FormItem>
                </div>
                {clickButton}
            </Modal>
        );
    }
}
