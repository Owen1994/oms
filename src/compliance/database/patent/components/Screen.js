import React from "react";
import { Form } from "antd";
import StandardFormRow from "../../../../components/StandardFormRow";
import TagSelect from "../../../../components/TagSelect";
import { PENANTOPTIONTYPE } from '../constants'

const FormItem = Form.Item;

export default class Screen extends React.Component{
    handleFormSubmit = (param, name) => {  //param: 改变后的值（数组）
        this.props.form.setFieldsValue({
            [name]: param
        })
        this.props.listFetch();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { tagValue } = this.props;
        return (
            <div className="screen-tags">
                <StandardFormRow title="专利类型">
                    <FormItem>
                        {getFieldDecorator('patentType')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.patentType}
                                datas={PENANTOPTIONTYPE}
                                name="patentType"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        )
    }
}