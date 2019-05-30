import React from 'react';
import { Form } from 'antd';
import Ctags from '../../../../components/ctags';
import { RULE_STATE } from '../constants';

const FormItem = Form.Item;

export default class Screen extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ctageSearch ptb-5">
                <FormItem
                    label="规则状态"
                >
                    {getFieldDecorator('ruleState', {
                        initialValue: [0],
                    })(
                        <Ctags
                            list={RULE_STATE}
                            handleChange={() => this.props.listFetch()}
                        />,
                    )}
                </FormItem>
            </div>
        );
    }
}
