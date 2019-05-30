import React, { Component } from 'react';
import { Form,Select,Icon  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;;

class Choice extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(next,pre){
        if(next === pre){
            return false
        }
        return true
    }
    render() {
        var {data,index,insideSearch,placeholder,form} = this.props
        var {name,list,key,namespace,onSelect,multiple,disabled} = data
        var {getFieldDecorator} = form
        return (
            <div className="tweb-choice-select tweb-list-filter-item">
                <div className="tweb-choice-select-n tweb-list-filter-item-title" >
                    {name}：
                </div>
                <FormItem>
                    {getFieldDecorator(namespace)(
                        <Select 
                        showSearch
                        disabled={!!disabled || false}
                        // onSelect={onSelect}
                        // mode={multiple?"multiple":null}
                        placeholder={placeholder||"请输入搜索条件"}
                        defaultActiveFirstOption={false}
                        showArrow = {false}
                        filterOption = {false}
                        allowClear
                        onSearch={(v)=>insideSearch(v,key,index)} 
                        notFoundContent={null}
                        className="tweb-choice-select-v">
                            {list}
                        </Select>
                    )}
                </FormItem>
            </div>
        );
    }
}

export default Choice;