import React from 'react';
import {
    Col, Modal, Row, Input, Form, Button,
} from 'antd';
import {fetchPost} from "../../../../../util/fetch";
import {My_Recive_Msg_Info_API, My_Send_Msg_Info_API} from "../../constants/Api";


/**
 * 转移审核弹框
 */
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
/**
 * 站内消息
 */
export default class StationNewsModal extends React.Component {
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

    render() {
        const {
            visible, cancel, itemData, type,
        } = this.props;

        /**
         * 显示按钮
         */
        const showButton = (
            <div>
                <Button
                    className="margin-ss-right"
                    disabled
                >
                    回复
                </Button>
                <Button
                    className="margin-ss-right"
                    disabled
                >
                    转发
                </Button>
            </div>
        );

        /**
         * 按钮
         */
        const clickButton = (
            <div className="margin-ss-top pms-msg-notification_modal_footer">
                {type === 0 ? showButton : null}
                <Button onClick={() => cancel()}>
                    关闭
                </Button>
            </div>);
        return (
            <Modal
                title="站内消息"
                width={600}
                visible={visible}
                onCancel={() => cancel()}
                footer={null}
                maskClosable={false}
                destroyOnClose
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
                </div>
                {clickButton}
            </Modal>
        );
    }
}
