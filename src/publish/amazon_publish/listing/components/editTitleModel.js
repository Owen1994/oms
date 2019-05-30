import React from 'react'
import moment from 'moment'
import {
    Modal,
    Button,
    Form,
    message,
    Input,
} from 'antd'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const style = {
    w100p: {
        width: '100%'
    },
    p: {
        lineHeight: "22px",
        fontSize: "12px"
    }
}

class EditTitleModel extends React.Component {
    state = {
        loading: false,
    }

    handleOk = () => {
        const { editSave } = this.props;
        const { getFieldValue } = this.props.form;
        const title = getFieldValue("title")
        if (!title) return message.warning("请输入标题")
        if (title.length > 200) return message.warning("当前字符数大于200")
        editSave && editSave(title)
            .finally(() => {
                this.handleCancel()
            })

    }

    handleCancel = () => {
        this.props.onCancel();
        this.props.form.resetFields();
    }


    render() {
        const { loading } = this.state;
        const { visible, data = {} } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const title = getFieldValue("title") || data.value
        const len = title ? 200 - title.length : 200
        return (
            <Modal
                title="修改标题"
                visible={visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                    <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                    <Button key="save" type="primary" onClick={this.handleOk} loading={loading}>保存</Button>,
                ]}
            >
                <Form>
                    <FormItem >
                        {getFieldDecorator('title', {
                            initialValue: data.value,
                            rules: [
                                { required: true, message: '请输入标题' },
                            ]
                        })(
                            <TextArea
                                placeholder="请输入标题"
                                autosize={{ minRows: 4, maxRows: 4 }}
                                style={style.w100p}
                            />
                        )}
                        <p style={style.p}>{
                            len >=0 ? 
                            <span>（您还可以输入<span className="red">{len}</span>个字符）</span>
                            :
                            <span>（您超出<span className="red">{Math.abs(len)}</span>个字符）</span>
                        }</p>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(EditTitleModel)