import React, { Component } from 'react';
import { Form,Select,Icon  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;;

class Choice extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {data,changeName,index,insideSearch,del,changeValue,placeholder,form} = this.props
        var {name,list,key,value,namespace} = data
        var {getFieldDecorator} = form
        return (
            <div className="tweb-choice-select list-filter-item">
                <div className="tweb-choice-select-n list-filter-item-title" >
                    {name}：
                </div>
                <FormItem>
                    {getFieldDecorator(namespace)(
                        <Select 
                        showSearch
                        placeholder="请输入搜索条件"
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