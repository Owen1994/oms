import React, { Component } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';
import TagSelect from '../../../../../common/components/advancedSearchModel/TagSelect';
import { getSinsitiveReason, grade, useState, isSensitiveData } from '../../../../data';

class DefaultSearch extends Component {
    // 条件筛选
    handleFormSubmit = (param, name) => {
        if(name==='useState'){
            this.props.handleUseState(param)
        }
        this.props.form.setFieldsValue({
            [name]: param
        })
        this.props.listFetch()
    }

    getSinsitiveReason = getSinsitiveReason.filter(v=>v.id !== 4 )

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tagValue } = this.props;
        return (
            <div className="default-search">
                <StandardFormRow title="使用状态：">
                    <FormItem>
                        {getFieldDecorator('useState')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.useState}
                                datas={useState}
                                name="useState"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="是否敏感：">
                    <FormItem>
                        {getFieldDecorator('isSensitive')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.isSensitive}
                                datas={isSensitiveData}
                                name="isSensitive"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="敏感原因：">
                    <FormItem>
                        {getFieldDecorator('reason')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.reason}
                                datas={this.getSinsitiveReason}
                                name="reason"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>

            </div>
        );
    }
}

export default DefaultSearch;