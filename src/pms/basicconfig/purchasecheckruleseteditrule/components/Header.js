import React from 'react';
import {
    Form,
    Input,
} from 'antd';
import { timestampFromat } from '../../../../util/baseTool';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
/**
 *作者: huangjianfeng
 *功能描述: 采购角色配置
 *时间: 2018/10/11 15:55
 */
class Header extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            lastModifiedPerson,
            lastModifiedTime,
            ruleName,
        } = this.props.headerData;
        return (
            <div className="white">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="规则名称"
                    >
                        {getFieldDecorator('ruleName', {
                            initialValue: ruleName,
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                style={{ width: 240 }}
                                autosize={{ minRows: 2, maxRows: 6 }}
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="最后修改人"
                    >
                        {getFieldDecorator('lastModifiedPerson', {
                            initialValue: lastModifiedPerson,
                            // rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                style={{ width: 240 }}
                                autosize={{ minRows: 2, maxRows: 6 }}
                                disabled
                            />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="最后修改时间"
                    >
                        {getFieldDecorator('lastModifiedTime', {
                            initialValue: timestampFromat(lastModifiedTime, 2),
                            // rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                style={{ width: 240 }}
                                autosize={{ minRows: 2, maxRows: 6 }}
                                disabled
                            />,
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(Header);
