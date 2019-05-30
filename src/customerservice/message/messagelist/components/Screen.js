import React, { Component } from 'react';
import { Form } from 'antd';
import StandardFormRow from '../../../../components/StandardFormRow';
// import { messageType } from '../constants';
import CTags from '../../../../components/ctags';

const FormItem = Form.Item;

class App extends Component {
    // handleChange = (value) => {
    //     console.log(value)
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="default-search overflow-hidden">
                <StandardFormRow title="类型">
                    <FormItem>
                        {getFieldDecorator('messageType', {
                            initialValue: [1],
                        })(
                            <CTags
                                list={messageType}
                                handleChange={this.props.handleTypeChange}
                            />,
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default App;
