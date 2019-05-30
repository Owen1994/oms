import React from 'react';
import {
    Modal,
    Input,
    Form
} from 'antd'
import Edit from './edit'
const FormItem = Form.Item;

const style = {
    mb20:{
        marginBottom:'20px'
    }
}
const formItemLayout = {
    labelCol: {
        sm: {
            span: 1
        },
    },
    wrapperCol: {
        sm: {
            span: 20
        },
    },
};

class EditModal extends React.Component {

    state = {
        content: ""
    }

    onChange = (content) => {
        this.setState({
            content
        })
    }

    onOk = () => {
        const { data, onOk } = this.props;
        const {getFieldValue} = this.props.form;
        const name = getFieldValue("name");
        const { content } = this.state;
        onOk && onOk(content,name, data)
        // data.htmlStr = content;
        this.onCancel()
    }

    onCancel = () => {
        const { onCancel } = this.props;
        this.setState({
            content: ""
        })
        onCancel && onCancel()
    }

    render() {
        const { visible, data, onCancel, onOk } = this.props;
        const { name, htmlStr } = data;
        const t = name ? `编辑 ${name}` : '编辑';
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={t}
                width={950}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
                destroyOnClose
            >
                <div>
                    <FormItem
                        style={style.mb20}
                        label="标题"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue: name
                        })(
                            <Input style={{ width: '330px' }} />
                        )}
                    </FormItem>
                    <Edit title={name} onChange={this.onChange} value={htmlStr}></Edit>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(EditModal)
