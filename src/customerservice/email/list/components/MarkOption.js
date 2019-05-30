import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class MarkOption extends React.Component {
    state = {
        wordLeft: 200,
        textValue: '',
    }

    handleKeydown = (e) => {
        if (this.state.textValue.length <= 200) {
            this.setState({ textValue: e.target.value });
        }
    }

    handleChange = (e) => {
        const writeWordLength = e.target.value.length;
        const maxLength = 200;
        this.setState({ wordLeft: maxLength - writeWordLength < 0 ? 0 : maxLength - writeWordLength });
        if (e.target.value.length > maxLength) {
            e.target.value = this.state.textValue;
        }
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const { getFieldDecorator } = this.props.form;
        const { wordLeft } = this.state;
        return (
            <div className="mark-option">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="处理说明"
                    >
                        {getFieldDecorator('operationContent', {
                            rules: [{ required: true, message: '请输入处理说明' }],
                            initialValue: '',
                        })(
                            <div>
                                <TextArea
                                    rows={5}
                                    placeholder="最多可输入200个字"
                                    onKeyDown={this.handleKeydown}
                                    onChange={this.handleChange}
                                    className="option-content"
                                />
                                <p className="word-left">还可以输入{wordLeft}个字</p>
                            </div>,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(MarkOption);
