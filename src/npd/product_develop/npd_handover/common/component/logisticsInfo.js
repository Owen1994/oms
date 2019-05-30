import React from 'react';
import {
    Form,
    Row,
    Col,
    Table
} from 'antd'
import {currencys,whether} from "../json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
class Supplier extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    rowSelection = {}
    columns = [
        {
            title: '产品发货是否带电池',
            dataIndex: 'withBatteries',
            key: 'withBatteries',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否为内置电池（不可手动拆卸）',
            dataIndex: 'isDetachable',
            key: 'isDetachable',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否为配套电池（与其他物品一起包装）',
            dataIndex: 'isSupporting',
            key: 'isSupporting',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否带粉末/膏状/胶',
            dataIndex: 'withPowder',
            key: 'withPowder',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否含液体',
            dataIndex: 'withFluid',
            key: 'withFluid',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否含金属',
            dataIndex: 'withMetal',
            key: 'withMetal',
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否含磁',
            dataIndex: 'isMagnetism',
            key: 'isMagnetism',
            render:(text, record, index)=>{
                return whether[text]
            }
        }
    ];

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
                columns={this.columns} />
            </div>
        )
    }
}

export default Supplier