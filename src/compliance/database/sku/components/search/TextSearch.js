import React, { Component } from 'react';
import { Form, Radio, Input } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';

class TextSearch extends Component {
    // state = {
    //     placeholder : '支持换行多个精确搜索'
    // }

    // // 产品中文名称支持模糊搜索
    // // SPU,SKU支持换行多个精确搜索
    // onChange = (e) => {
    //     let index = e.target.value;
    //     if(index == 3){
    //         this.setState({
    //             placeholder: "支持模糊搜索"
    //         })
    //     } else if(index == 4){
    //         this.setState({
    //             placeholder: "支持多个换行模糊搜索"
    //         })
    //     }  else {
    //         this.setState({
    //             placeholder: "支持换行多个精确搜索"
    //         })
    //     }
    // }
    renderSearchType = (searchType)=> {
        if (searchType === '3') {
            return '支持模糊搜索'
        } else if (searchType === '4') {
            return '支持多个换行模糊搜索'
        } else {
            return '支持换行多个精确搜索'
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const values = this.props.form.getFieldsValue()
        const searchContentPlaceholder = this.renderSearchType(values.searchType)
        return (
            <div className="text-search">
                <StandardFormRow title="搜索类型：">
                    <FormItem>
                        {getFieldDecorator('searchType', {
                            rules: [{ required: false, message: '请选择' }],
                            initialValue: '1',
                        })(
                            <RadioGroup size="small" onChange={this.onChange}>
                                <RadioButton value="1">SKU</RadioButton>
                                <RadioButton value="2">SPU</RadioButton>
                                <RadioButton value="3">产品中文名称</RadioButton>
                                <RadioButton value="4">知产代码</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                </StandardFormRow>
                <p className="mb15"></p>
                <StandardFormRow title="搜索内容：">
                    <FormItem>
                        {getFieldDecorator('searchContent')(
                            <TextArea  placeholder={searchContentPlaceholder} autosize={{ minRows: 2, maxRows: 6 }} style={{ width: 344 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default TextSearch;