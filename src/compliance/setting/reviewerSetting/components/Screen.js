import React from "react";
import { Form } from "antd";
import StandardFormRow from "../../../../components/StandardFormRow";
import TagSelect from "../../../../components/TagSelect";
import { REVIEW_TYPE } from '../constants'

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
                <StandardFormRow title="审核类型">
                    <FormItem>
                        {getFieldDecorator('reviewType')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.reviewType}
                                datas={REVIEW_TYPE}
                                name="reviewType"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        )
    }
}