import React, { Component } from 'react';
import { Form, Radio, Checkbox  } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

import { fields } from '../../../data';
const fieldsArr = () => {
    let result = [];
    for(var key in fields){
        result.push(fields[key].value)
    }
    return result;
}

class App extends Component {
    state = {
        checkedList: fieldsArr(),
        indeterminate: false,
        checkAll: true,
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            field: fields
        })
    }
    //  全选
    onCheckAllChange = (e) => {
        let checkedListResult = [];
        let fieldsArr1 = fieldsArr();

        this.setState({
            checkedList: e.target.checked ? fieldsArr1 : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });

        for(var key in fields){
            for(var _key in fieldsArr){
                if(fields[key].value === fieldsArr[_key]){
                    checkedListResult.push(fields[key]);
                }
            }
        }
        this.props.form.setFieldsValue({
            field: e.target.checked ? checkedListResult : []
        })
    }

    // 选择
    onChange = (checkedList) => {
        let checkedListResult = [];

        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < fieldsArr().length),
            checkAll: checkedList.length === fieldsArr().length,
        });

        for(var key in fields){
            for(var _key in checkedList){
                if(fields[key].value === checkedList[_key]){
                    checkedListResult.push(fields[key]);
                }
            }
        }

        this.props.form.setFieldsValue({
            field: checkedListResult
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        this.props.form.getFieldDecorator('field');
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <div className="tcloud-export">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="导出类型"
                    >
                        {getFieldDecorator('type', {
                            initialValue: 2,
                            rules: [{
                                required: true, message: '请选择导出类型.'
                            }],
                        })(
                            <RadioGroup onChange={this.onChangeType}>
                                <Radio value={1}>导出选中的数据</Radio>
                                <Radio value={2}>导出当前搜索条件下的数据</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="导出字段"
                    >
                        <Checkbox
                            indeterminate={this.state.indeterminate}
                            onChange={this.onCheckAllChange}
                            checked={this.state.checkAll}
                        >
                            全选
                        </Checkbox>
                        <CheckboxGroup options={fields} value={this.state.checkedList} onChange={this.onChange} />
                    </FormItem>
                </Form>
            </div >
        );
    }
}

export default Form.create()(App);