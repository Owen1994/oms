import React from "react";
import { Form } from "antd";
import StandardFormRow from "../../../../components/StandardFormRow";
import TagSelect from "../../../../components/TagSelect";
import { SPECIAL_PERMIT_TYPE } from '../constants'

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
                <StandardFormRow title="特批销售类型">
                    <FormItem>
                        {getFieldDecorator('specialpermitType')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.specialpermitType}
                                datas={SPECIAL_PERMIT_TYPE}
                                name="specialpermitType"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        )
    }
}