import React from 'react';
import {
    Form,
    Row,
    Col,
    Table,
    Select
} from 'antd'
import {currencys,whetherSelect} from "../../common/json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
const Option = Select.Option
class LogisticsInfo extends React.Component {
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
        var { projectInfo} = this.props
        var {logisticsInfo} = projectInfo
        return [
            {
                title: '产品发货是否带电池',
                dataIndex: 'withBatteries',
                key: 'withBatteries',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('withBatteries',{
                            initialValue:logisticsInfo.withBatteries !== undefined ?logisticsInfo.withBatteries : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否为内置电池（不可手动拆卸）',
                dataIndex: 'isDetachable',
                key: 'isDetachable',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('isDetachable',{
                            initialValue:logisticsInfo.isDetachable !== undefined ?logisticsInfo.isDetachable : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否为配套电池（与其他物品一起包装）',
                dataIndex: 'isSupporting',
                key: 'isSupporting',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('isSupporting',{
                            initialValue:logisticsInfo.isSupporting !== undefined ?logisticsInfo.isSupporting : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否带粉末/膏状/胶',
                dataIndex: 'withPowder',
                key: 'withPowder',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('withPowder',{
                            initialValue:logisticsInfo.withPowder !== undefined ?logisticsInfo.withPowder : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否含液体',
                dataIndex: 'withFluid',
                key: 'withFluid',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('withFluid',{
                            initialValue:logisticsInfo.withFluid !== undefined ?logisticsInfo.withFluid : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否含金属',
                dataIndex: 'withMetal',
                key: 'withMetal',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('withMetal',{
                            initialValue:logisticsInfo.withMetal !== undefined ?logisticsInfo.withMetal : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }, 
            {
                title: '是否含磁',
                dataIndex: 'isMagnetism',
                key: 'isMagnetism',
                render:(text, record, index)=>{
                    return (<FormItem>
                        {getFieldDecorator('isMagnetism',{
                            initialValue:logisticsInfo.isMagnetism !== undefined ?logisticsInfo.isMagnetism : 0
                        })(
                            <Select>
                                {this.options}
                            </Select>
                        )}
                    </FormItem>)
                }
            }
        ]
    }

    render(){
        var {projectInfo} = this.props
        var {logisticsInfo} = projectInfo
        logisticsInfo.key = 0
        var data = [logisticsInfo]
        return (
            <div className="npd-handover-create-info margin-ms-top">
                <div className="npd-handover-create-title">产品物流信息</div>
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

export default LogisticsInfo