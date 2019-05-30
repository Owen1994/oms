import React from 'react'
import ItemSelect from './index'

export default class Test extends React.Component {
    handleFocusBefore = ()=>{
        // your code
        return true
    }

    handleFilters = (list) => {
        return list.filter(item => {
            return true
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return (
            <div className="list-filter-item">
            <div className="list-filter-item-title">销售账号:</div>
            <div className="list-filter-input">
                <FormItem>
                    <ItemSelect
                        formName="accounts"   // 表单提交的key
                        searchColumn="account"  // 搜索字段
                        disabled={true} // 启用、禁用
                        getFieldDecorator={getFieldDecorator} // form双向绑定
                        name="account"   // 显示的名称  默认为name
                        code="account"   // 显示的编码  默认为code
                        url={''}     //  接口名称
                        params={{ account: ''}}  // 接口请求参数
                        rules={{    // rules规则  同Select组件
                            rules: [{
                                required: true, message: '请选择销售账号',
                            }]
                        }}
                        mode='multiple' // 是否支持多选
                        maxCount={5}  // 最大可选数  配合  multiple使用
                        apiListType={1} // 数组取值名称 0 默认data -> list  1 data -> data 2 data
                        onFocusBefore={this.handleFocusBefore} // return false or true
                        onFilters={this.handleFilters}  // 过滤
                        filterDataHandle={this.filterDataHandle} // 用于对获取到的数据做处理 返回值用于列表展示
                    /> 
                </FormItem>
            </div>
        </div>
        )
    }
}