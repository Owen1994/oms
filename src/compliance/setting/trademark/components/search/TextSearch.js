import React, { Component } from 'react';
import { Form, Radio, Input } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';

class TextSearch extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="text-search">
                 <StandardFormRow title="商标商品分类：">
                    <FormItem>
                        {getFieldDecorator('trademarkTypeName')(
                            <Input placeholder="支持模糊搜索" style={{ width: 344 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
           
        );
    }
}

export default TextSearch;