import React, { Component } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';
import TagSelect from '../../../../../common/components/advancedSearchModel/TagSelect';
import { active, grade, useState, isInfringements } from '../../../../data';

class DefaultSearch extends Component {
    constructor(props) {
        super(props);
    }
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
                {/* <StandardFormRow title="敏感等级：">
                    <FormItem>
                        {getFieldDecorator('sensitivityGrade')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.sensitivityGrade}
                                datas={grade}
                                name="sensitivityGrade"
                            />
                        )}
                    </FormItem>
                </StandardFormRow> */}
                 <StandardFormRow title="是否授权：">
                    <FormItem>
                        {getFieldDecorator('isInfringements')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.isInfringements}
                                datas={isInfringements}
                                name="isInfringements"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>

                <StandardFormRow title="活跃状态：">
                    <FormItem>
                        {getFieldDecorator('activeState')(
                            <TagSelect
                                isMulti={false}
                                onChange={this.handleFormSubmit}
                                values={tagValue.activeState}
                                datas={active}
                                name="activeState"
                            />
                        )}
                    </FormItem>
                </StandardFormRow>

            </div>
        );
    }
}

export default DefaultSearch;