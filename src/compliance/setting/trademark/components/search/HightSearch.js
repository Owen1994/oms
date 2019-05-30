import React, { Component } from 'react';
import { Form, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';
import { getProductClass } from '../../../../data';

class HightSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productClass: []
        };
    }

    componentDidMount() {
        getProductClass().then((result) => {
            this.setState({ productClass: result })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { productClass } = this.state;
        return (
            <div className="height-search">
                <StandardFormRow title="基础资料分类：">
                    <FormItem>
                        {getFieldDecorator('productClassID')(
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                            >
                                {
                                    productClass.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default HightSearch;