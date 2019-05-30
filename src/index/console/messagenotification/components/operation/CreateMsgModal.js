import React from 'react';
import {
    Modal, Input, Form,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { getLoginmsg, timestampFromat } from '../../../../../util/baseTool';
import { fetchPost } from '../../../../../util/fetch';
import { Create_Msg_API, New_User_Name_API } from '../../constants/Api';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

/**
 * 创建消息
 */
class CreateMsgModal extends React.Component {
    /**
     * HTTP请求 创建消息
     */
    handleSubmitCreateMsg = () => {
        const { ok } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = { ...values };
                const dicData = {
                    data:
                        {
                            content: data.content,
                            messageType: 1,
                            receivers: data.receivers,
                        }
                };
                fetchPost(Create_Msg_API, dicData, 2)
                    .then((result) => {
                        if (result.state === '000001') {
                            ok();
                        }
                    });
            }
        });
    };

    handleFilter = list => {
        const data = list.slice(0, 20);
        const arrayData = data.map(t => {
            if (!t.personName) {
                t.personName = t.userName;
            }
            return t;
        }).filter(item => item.userName)
        return arrayData;
    };

    render() {
        const {
            visible, cancel,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        const userName = getLoginmsg().userName;
        const newTime = timestampFromat(Date.parse(new Date()), 2);
        return (
            <Modal
                title="创建消息"
                width={600}
                visible={visible}
                onOk={this.handleSubmitCreateMsg}
                onCancel={() => cancel()}
                okText="发送"
                cancelText="取消"
                destroyOnClose
                maskClosable={false}
            >
                <div className="pms-msg-notification_form_div">
                    <FormItem
                        {...formItemLayout}
                        label="发送人:"
                    >
                        {getFieldDecorator('receivers', {
                            rules: [{ required: true, message: '收信人不存在，请重新选择输入' }],
                        })(
                            <CSelect
                                code="userName"
                                name="personName"
                                url={New_User_Name_API}
                                handleFilter={this.handleFilter}
                                params={{
                                    data:{
                                        searchColumn: 'searchContext',
                                        pageNumber: 1,
                                        pageData: 20,
                                    }
                                }} // 搜索参数
                                mode="multiple"
                                apiListType={2}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="内容:"
                    >
                        {getFieldDecorator('content', {
                            rules: [{  required: true, message: '内容为必填项' }],
                        })(
                            <TextArea />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="消息类型:"
                    >
                        {getFieldDecorator('messageType', {
                            rules: [{ message: '消息类型' }],
                        })(
                            <Input
                                placeholder="站内消息"
                                disabled
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="状态:"
                    >
                        {getFieldDecorator('status', {
                            rules: [{ message: '状态' }],
                        })(
                            <Input
                                disabled
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="创建人:"
                    >
                        {getFieldDecorator('people', {
                            rules: [{ message: '创建人' }],
                        })(
                            <Input
                                placeholder={userName}
                                disabled
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="创建时间:"
                    >
                        {getFieldDecorator('createTime', {
                            rules: [{ message: '创建时间' }],
                        })(
                            <Input
                                placeholder={newTime}
                                disabled
                            />,
                        )}
                    </FormItem>
                </div>
            </Modal>
        );
    }
}

export default Form.create()(CreateMsgModal);
