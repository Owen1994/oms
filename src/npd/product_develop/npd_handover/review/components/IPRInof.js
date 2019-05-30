import React from 'react';
import {
    Form,
    Row,
    Col,
    Table,
    Select,
    Input
} from 'antd'
import {whetherSelect} from "../../common/json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
const Option = Select.Option
class IPRInof extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    rowSelection = {}
    options = whetherSelect.map((v,k)=>{
        return <Option key={k} value={v.v}>{v.n}</Option>
    })
    columns = ()=>{
        var {getFieldDecorator} = this.props.form
        return [
            {
                title: '是否侵权',
                dataIndex: 'isTort',
                key: 'isTort',
                width:100,
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('isTort',{
                            initialValue:0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否违禁',
                dataIndex: 'isProhibited',
                key: 'isProhibited',
                width:100,
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('isProhibited',{
                            initialValue:0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '结论',
                width:300,
                dataIndex: 'conclusion',
                key: 'conclusion',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('conclusion',{
                            rules:[{required:true,message:"结论为必填"}]
                        })(
                            <Input />
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '产权操作列',
                width:200,
                dataIndex: 'handle',
                key: 'handle',
            }
        ]
    }

    render(){
        var {projectInfo} = this.props
        var {IPRInof} = projectInfo
        IPRInof.key = 0
        var data = [IPRInof]
        return (
            <div className="npd-handover-create-info margin-ms-top">
                <div className="npd-handover-create-title">知识产权信息</div>
                <Table 
                bordered={true}
                size="small"
                pagination={false}
                dataSource={data} 
                columns={this.columns()} />
            </div>
        )
    }
}

export default IPRInof