import React, { Component } from 'react';
import { Form, Select, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './index.css';

import { getChildrenCategory } from '../../../../common/request';

class Category extends Component {
    state = {
        secondCategory: [],
        isSelectFirstCategory: false,
        isSelectSecondCategory: false
    }
    componentDidMount() {
        this.getSecondCategoryOption(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.refreshSecondCategoryOption(nextProps)
    }
    refreshSecondCategoryOption = (nextProps) => {
        // 下拉框选择,防止多次
        if (this.state.isSelectFirstCategory) {
            this.state.isSelectFirstCategory = false
            return
        }
        if (this.state.isSelectSecondCategory) {
            this.state.isSelectSecondCategory = false
            return
        }
        const values = this.props.form.getFieldsValue()
        const currentFirstCategoryValue = values.firstCategory[this.props.index]
        // 新增的情况，为数组格式
        if (Array.isArray(currentFirstCategoryValue)) {
            return
        }
        if (currentFirstCategoryValue && nextProps.categoryInfo.length != values.firstCategory.length) {
            this.getChildrenCategoryRequest(currentFirstCategoryValue)
        }
    }
    // 从详情获取的,初始化可选值
    getSecondCategoryOption = (nextProps) => {
        const { item } = nextProps;
        if (!item) return
        let key = item.firstCategory
        this.getChildrenCategoryRequest(key)
    }
    // 请求
    getChildrenCategoryRequest = (key) => {
        if (!key || Array.isArray(key)) return
        getChildrenCategory({
            id: key
        }).then((result) => {
            this.setState({ secondCategory: result })
        });
    }

    getIcon = () => {
        const { item } = this.props;
        // 当是第一组的时候
        if (item.id === 1) {
            return (
                <div className='pull-left'>
                    <Icon
                        type="plus-circle-o"
                        onClick={() => this.props.addCategory()}
                    />
                </div>
            )
        } else {
            return (
                <div className='pull-left'>
                    <Icon
                        type="minus-circle-o"
                        onClick={() => this.props.remove(item.id)}
                    />
                </div>
            )
        }

    };
    onSelectId = (value) => {
        const { index } = this.props;
        const self = this;
        getChildrenCategory({
            id: value
        }).then((result) => {
            // 清空
            const values = this.props.form.getFieldsValue()
            values.secondCategory[index] = []
            self.props.form.setFieldsValue({ secondCategory: values.secondCategory })
            if (!result || !result.length) {
                this.setState({ secondCategory: [] })
                return;
            }

            this.setState({ secondCategory: result })
        });
        this.state.isSelectFirstCategory = true
        this.setState({ isSelectFirstCategory: true })
    }
    onSecondCategorySelectId = (value) => {
        this.state.isSelectSecondCategory = true
        this.setState({ isSelectSecondCategory: true })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { index, firstCategoryOption, item } = this.props;
        const { secondCategory } = this.state;
        return (
            <div className="margin-ss-bottom clear">
                <FormItem className="platform pull-left">
                    {getFieldDecorator(`firstCategory[${index}]`, {
                        initialValue: item.firstCategory,
                        //  Array.isArray(item.firstCategory)? item.firstCategory: item.firstCategory + '',
                        rules: [{
                            required: true,
                            message: "请选择一级分类.",
                        }],
                    })(
                        <Select
                            style={{ width: 124, marginRight: 10 }}
                            placeholder="一级分类"
                            onSelect={this.onSelectId}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                firstCategoryOption && firstCategoryOption.map((item, i) => (
                                    <Option key={item.id} value={item.id} disabled={item.disabled}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem className="site pull-left">
                    {getFieldDecorator(`secondCategory[${index}]`, {
                        initialValue: item.secondCategory.map(item => item + ''),
                        rules: [{
                            required: !secondCategory.length ? false : true,
                            message: "请选择二级分类.",
                        }],
                    })(
                        <Select
                            style={{ width: 168, marginRight: 10 }}
                            placeholder={'二级分类'}
                            showSearch
                            mode="multiple"
                            onSelect={this.onSecondCategorySelectId}
                            disabled={!secondCategory.length}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                secondCategory && secondCategory.map((item, i) => (
                                    <Option value={item.id + ''} value={item.id + ''} disabled={item.disabled} >{item.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                {this.getIcon()}
            </div>
        )
    }
}

export default Category;
