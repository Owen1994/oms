import React from 'react'
import RadioTags from './index'

const STATE_LIST = [
    {
        id: 0,
        name: "全部"
    },
    {
        id: 101,
        name: '待提交'
    },
    {
        id: 201,
        name: "待销售主管审核"
    },
    {
        id: 301,
        name: "待销售经理审核"
    },
    {
        id: 202,
        name: '销售主管驳回'
    },
    {
        id: 302,
        name: '销售经理驳回'
    },
    {
        id: 801,
        name: "待分派"
    },
    {
        id: 7001,
        name: "已完成"
    }
]
export default class Test extends React.Component {

    handleChange = () => {
        // 执行搜索
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return (
            <div className="list-filter-item">
            <div className="list-filter-item-title">审核状态:</div>
            <div className="list-filter-input">
                <FormItem>
                    <RadioTags
                            getFieldDecorator={getFieldDecorator}  // antd form双向绑定
                            onChange={this.handleChange} 
                            list={STATE_LIST}  // 源数据
                            name='state'  // form提交的名称
                        />
                </FormItem>
            </div>
        </div>
        )
    }
}