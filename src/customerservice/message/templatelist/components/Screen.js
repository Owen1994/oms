import React, { Component } from 'react';
import { Form } from 'antd';
import Ctags from '../../../../components/ctags';
import { getTempType, getTempState } from '../constants';

const FormItem = Form.Item;

class App extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ctageSearch ptb-5">
                <FormItem label="模板所属">
                    {getFieldDecorator('tempType', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={getTempType}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
                <FormItem label="模板状态">
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
