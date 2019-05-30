import React from 'react';
import { Form, Input } from 'antd';
import './index.css';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class CountArea extends React.Component {
    state = {
        // wordLeft: this.props.maxLength,
        // textValue: '',
        maxLength: 1000,
        sendContentTextArea: null,
    }

    // handleKeydown = (e) => {
    //     const { maxLength } = this.props;
    //     if (this.state.textValue.length <= maxLength) {
    //         this.setState({ textValue: e.target.value });
    //     }
    // }

    // handleChange = (e) => {
    //     const { maxLength } = this.props;
    //     const writeWordLength = e.target.value.length;
    //     if (e.target.value.length > maxLength) {
    //         e.target.value = this.state.textValue;
    //         return;
    //     }
    //     this.setState({ wordLeft: maxLength - writeWordLength < 0 ? 0 : maxLength - writeWordLength });
    // }

    componentWillUnmount() {
        this.setState.sendContentTextArea = null;
    }

    // 获取textarea
    getTextArea = (dom) => {
        if (!dom) return;
        this.setState({
            sendContentTextArea: dom.textAreaRef,
        });
    }

    getSurplus = () => {
        const { sendContentTextArea } = this.state;
        const maxLength = this.props.maxLength || this.state.maxLength;
        const {
            initialValue,
        } = this.props;
        if (sendContentTextArea) {
            if (sendContentTextArea.value && sendContentTextArea.value.length) return maxLength - sendContentTextArea.value.length;
            if (initialValue) return maxLength - initialValue.length;
        }
        return maxLength;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { maxLength } = this.state;
        const {
            field, autosize, placeholder, label, formItemLayout, initialValue,
        } = this.props;
        const surplus = this.getSurplus();
        return (
            <div className="count-area">
                <div style={{ position: 'relative', paddingBottom: 20 }}>
                    <FormItem
                        {...formItemLayout}
                        label={label}
                    >
                        {getFieldDecorator(field, {
                            rules: [
                                { required: true, message: '请输入文本内容' },
                                { max: maxLength || 1000, message: '当前字数超出最大值' },
                            ],
                            initialValue,
                        })(
                            <TextArea
                                ref={this.getTextArea}
                                rows={5}
                                placeholder={placeholder}
                                // onKeyDown={this.handleKeydown}
                                // onChange={this.handleChange}
                                className="option-content"
                                autosize={autosize || null}
                            />,
                        )}
                    </FormItem>
                    <p className="word-left">还可以输入{surplus}个字</p>
                </div>
            </div>
        );
    }
}
export default CountArea;
