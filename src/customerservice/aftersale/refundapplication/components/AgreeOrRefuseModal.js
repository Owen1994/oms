import React from 'react';
import { Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class AgreeOrRefuseModal extends React.Component {
    state = {
        platformLabel: ''
    }

    componentDidMount() {
        this.getPlatformLabel();
    }

    getPlatformLabel = () => {
        const { platformId, platform } = this.props;
        const targetPlatform = platform.find(item => `${item.key}` === `${platformId}`);
        this.setState({
            platformLabel: targetPlatform ? targetPlatform.label : ''
        })
    }

    getInitialType = () => {
        const { platformLabel  } = this.state;
        const { record } = this.props;
        let type = 1;
        if (platformLabel === 'eBay') {
            if (record.refundType !== 3) {
                type = 2;
            }
        }
        return type;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        };
        const { platformLabel } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { platformId, title } = this.props;
        const isEbay = platformLabel === 'eBay';
        let refundModeRadio = null;
        if (title === '同意退款') {
            refundModeRadio = (
                <FormItem
                    {...formItemLayout}
                    label="退款方式"
                    className='modal-mb10'
                >
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请输入退款方式' }],
                        initialValue: this.getInitialType(),
                    })(
                        <RadioGroup disabled={!isEbay}>
                            <Radio value={1}>登记退款</Radio>
                            <Radio value={2}>平台退款</Radio>
                        </RadioGroup>,
                    )}
                </FormItem>
            )
        }
        return (
            <div>
                {refundModeRadio}
                <FormItem
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入处理说明' }],
                    })(
                        <TextArea placeholder="请输入处理说明" autosize={{ minRows: 6, maxRows: 6 }} />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('platformId', {
                        initialValue: platformId,
                    })(
                        <Input type="hidden" />,
                    )}
                </FormItem>
            </div>
        );
    }
}
export default Form.create()(AgreeOrRefuseModal);
