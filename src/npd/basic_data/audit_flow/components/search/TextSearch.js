import React, { Component } from 'react';
import { Form, Radio, Input, Select } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

import StandardFormRow from '../../../../../components/StandardFormRow';

class TextSearch extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.list_fetch2({ name: 'project_data', value: { pageNumber: 1, pageData: 20 } });
    }

    handleSelectChange = () => {

    }



    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="npd-audit-textSearch">
                <StandardFormRow title="项目流编码">
                    <FormItem>
                        {getFieldDecorator('projectCode')(
                            <TextArea placeholder="请输入项目流编码" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default TextSearch;