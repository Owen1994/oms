import React from 'react';
import { Form, Select, Input } from 'antd';
import { getPlatformList } from '../../../common/request';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddModal extends React.Component {
    state = {
        platformList: [],
    }

    componentDidMount() {
        getPlatformList().then((result) => {
            this.setState({ platformList: result });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { platformList } = this.state;
        const { item } = this.props;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 },
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="平台"
                >
                    {getFieldDecorator('platformId', {
                        rules: [{ required: true, message: '请输入平台' }],
                        initialValue: item.platform ? item.platform.key : '',
                    })(
                        <Select
                            className="message-list-select-item"
                            placeholder="请选择"
                            showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={!!item.platform}
                        >
                            {
                                platformList.map(result => (
                                    <Option value={result.key} key={result.key}>{result.label}</Option>
                                ))
                            }
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="关键字"
                    className="mt12"
                >
                    {getFieldDecorator('keywords', {
                        rules: [{ required: true, message: '请输入拦截关键字' }],
                        initialValue: item ? item.keywords : null,
                    })(
                        <TextArea
                            placeholder="请输入拦截关键字，多个以“分割，支持从excel复制填充"
                            autosize={{ minRows: 6, maxRows: 10 }}
                        />,
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(AddModal);
