import React, { Component } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

import StandardFormRow from '../../../../../components/StandardFormRow';
import {
    businessCode,
    state,
} from '../../constants/index';
import RadioTags from '../../../../common/components/radiotags'


var platformCode = [{ id: 0, name: '全部' }];
class DefaultSearch extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.list_fetch2({ name: 'platform_data', value: { pageNumber: 1, pageData: 20 } });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="npd-project-defaultSearch">
                <StandardFormRow title="业务线">
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => this.props.listFetch()}
                            list={businessCode}
                            name='businessCode'
                        />
                    </FormItem>
                </StandardFormRow>
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