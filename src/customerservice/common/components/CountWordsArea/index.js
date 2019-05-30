import React from 'react';
import { Form, Input } from 'antd';
import './index.css';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class CountWordsArea extends React.Component {
    state = {
        wordLeft: this.props.maxLength,
        textValue: '',
    }

    componentDidMount() {
        const { draft } = this.props.recordData;
        if (draft && draft.draftContent) {
            this.setState({
                wordLeft: this.props.maxLength - this.props.recordData.draft.draftContent.length,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextSendContent = nextProps.sendContent;
        const nowSendContent = this.props.sendContent;
        if (nextProps.sendContent !== nowSendContent) {
            this.setState({
                wordLeft: this.props.maxLength - nextSendContent.length,
            });
            this.props.form.setFieldsValue({
                [this.props.field]: nextSendContent,
            });
        }
    }

    handleKeydown = (e) => {
        const { maxLength } = this.props;
        if (this.state.textValue.length <= maxLength) {
            this.setState({ textValue: e.target.value });
        }
    }

    handleChange = (e) => {
        const { maxLength } = this.props;
        const writeWordLength = e.target.value.length;
        if (e.target.value.length > maxLength) {
            e.target.value = this.state.textValue;
            return;
        }
        this.setState({ wordLeft: maxLength - writeWordLength < 0 ? 0 : maxLength - writeWordLength });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { wordLeft } = this.state;
        const {
            maxLength, field, recordData, autosize, disabled,
        } = this.props;
        return (
            <div className="count-words-area">
                <div style={{ position: 'relative', paddingBottom: 20 }}>
                    <FormItem>
                        {getFieldDecorator(field, {
                            rules: [{ required: true, message: '请输入发送内容' }],
                            initialValue: (recordData && recordData.draft) ? recordData.draft.draftContent : '',
                        })(
                            <TextArea
                                ref={this.props.getTextArea}
                                rows={5}
                                disabled={disabled}
                                placeholder={`请将您的回复限制在${maxLength}个字符以内`}
                                onKeyDown={this.handleKeydown}
                                onChange={this.handleChange}
                                className="option-content"
                                autosize={autosize || null}
                            />,
                        )}
                    </FormItem>
                    <p className="word-left">还可以输入{wordLeft}个字</p>
                </div>
            </div>
        );
    }
}
export default CountWordsArea;
