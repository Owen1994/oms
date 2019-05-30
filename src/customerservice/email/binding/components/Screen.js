import React, { Component } from 'react';
import { Form } from 'antd';
import Ctags from '../../../../components/ctags';
import { bindingType, bindingState } from '../constants';

const FormItem = Form.Item;

class App extends Component {
    // 条件筛选
    handleFormSubmit = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param,
        });
        this.props.listFetch();
    }

    render() {
        const { statusList } = this.props.listReducer;
        const { getFieldDecorator } = this.props.form;
        const bindingTypeList = (statusList && statusList.length) ? statusList : bindingState;
        return (
            <div className="ctageSearch ptb-5">
                <FormItem label="邮箱类型">
                    {getFieldDecorator('bindingType', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={bindingType}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
                <FormItem label="邮箱状态">
                    {getFieldDecorator('bindingState', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={bindingTypeList}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
            </div>

        );
    }
}

export default App;
