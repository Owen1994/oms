import React, { Component } from 'react';
import { Form } from 'antd';
import Ctags from '../../../../components/ctags';
import { getTempType, getTempState } from '../../../message/templatelist/constants';

const FormItem = Form.Item;

class App extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="模板所属"
                >
                    {getFieldDecorator('tempType', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={getTempType}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="模板状态"
                >
                    {getFieldDecorator('tempState', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={getTempState}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
            </div>
        );
    }
}

export default App;
