import React, { Component } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

import StandardFormRow from '../../../../../components/StandardFormRow';
import { state } from '../../constants/index';
import RadioTags from '../../../../common/components/radiotags'

class DefaultSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="npd-audit-defaultSearch">
                <StandardFormRow title="状态">
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => this.props.listFetch()}
                            list={state}
                            name='state'
                        />
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default DefaultSearch;