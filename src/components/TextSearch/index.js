import React, { Component } from 'react';
import { Form, Radio, Input } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import StandardFormRow from '../StandardFormRow';

import './index.css';

class TextSearch extends Component {
    // state = {
    //     placeholder : '支持模糊搜索'
    // }

    // componentDidMount() {
    //     const { isSingle, searchType } = this.props;
    //     if(isSingle === false){
    //         if(searchType[0].type === 1){
    //             this.setState({
    //                 placeholder: "支持模糊搜索"
    //             })
    //         }
    //         if(searchType[0].type === 2){
    //             this.setState({
    //                 placeholder: "支持精确搜索"
    //             })
    //         }
    //         if(searchType[0].type === 3){
    //             this.setState({
    //                 placeholder: "支持换行多个精确搜索"
    //             })
    //         }
    //         if(searchType[0].type === 4){
    //             this.setState({
    //                 placeholder: "支持单个模糊搜索"
    //             })
    //         }
    //         if(searchType[0].type === 5){
    //             this.setState({
    //                 placeholder: "支持多个换行模糊搜索"
    //             })
    //         }
    //         if(searchType[0].type === 6){
    //             this.setState({
    //                 placeholder: "支持多个换行精确搜索"
    //             })
    //         }
    //     }
    // }

    // onChange = (e) => {
    //     let index = e.target.searchType;
    //     if(index === 1){
    //         this.setState({
    //             placeholder: "支持模糊搜索"
    //         })
    //     }else if (index === 2) {
    //         this.setState({
    //             placeholder: "支持精确搜索"
    //         })
    //     } else if(index === 4){
    //         this.setState({
    //             placeholder: "支持单个模糊搜索"
    //         })
    //     } else if(index === 5){
    //         this.setState({
    //             placeholder: "支持多个换行模糊搜索"
    //         })
    //     }else if(index === 6){
    //         this.setState({
    //             placeholder: "支持多个换行精确搜索"
    //         })
    //     } else {
    //         this.setState({
    //             placeholder: "支持换行多个精确搜索"
    //         })
    //     }
    // }
    renderSearchType = (id)=> {
        const { isSingle, searchType } = this.props;
        if (isSingle) return

        let placeholderType = searchType[0].type;
        const ids = searchType.map(item => item.id)
        if (ids && ids.length && ids.indexOf(id) !== -1) {
            const index = ids.indexOf(id)
            placeholderType = searchType[index].type
        }

        if (placeholderType === 1){
            return '支持模糊搜索'
        } else if (placeholderType === 2) {
            return '支持精确搜索'
        } else if (placeholderType === 3) {
            return '支持换行多个精确搜索'
        } else if(placeholderType === 4){
            return '支持单个模糊搜索'
        } else if(placeholderType === 5){
            return '支持多个换行模糊搜索'
        }else if(placeholderType === 6){
            return '支持多个换行精确搜索'
        } else {
            return '支持换行多个精确搜索'
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { isSingle, title, name, placeholder, searchType } = this.props;
        const values = this.props.form.getFieldsValue()
        const searchContentPlaceholder = this.renderSearchType(values.searchType)
        const html = isSingle ? (
            <StandardFormRow title={title}>
                <FormItem>
                    {getFieldDecorator(name)(
                        <Input placeholder={placeholder} style={{ width: 344 }} />
                    )}
                </FormItem>
            </StandardFormRow>
        ) : (
            <div>
                <StandardFormRow title="搜索类型">
                    <FormItem>
                        {getFieldDecorator('searchType', {
                            rules: [{ required: false, message: '请选择' }],
                            initialValue: searchType[0].id,
                        })(
                            <RadioGroup size="small" onChange={this.onChange}>
                                {
                                    searchType.map((item, index) => (
                                        <RadioButton key={index} value={item.id} searchType={item.type}>{item.name}</RadioButton>
                                    ))
                                }
                            </RadioGroup>
                        )}
                    </FormItem>
                </StandardFormRow>
                <p className="mb15"></p>
                <StandardFormRow title='搜索内容'>
                    <FormItem>
                        {
                            getFieldDecorator('searchContent')(
                                <TextArea  placeholder={searchContentPlaceholder} autosize={{ minRows: 2, maxRows: 6 }} style={{ width: 344 }} />
                            )
                        }
                    </FormItem>
                </StandardFormRow>
            </div>
        )
        return (
            <div className="text-search">
                {html}
            </div>
        );
    }
}

export default TextSearch;