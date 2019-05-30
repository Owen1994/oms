import React from 'react';
import {
    Table
} from 'antd'
import {ntsTypes,states} from "../json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
class Review extends React.Component {
    columns = [
        {
            title: '序号',
            dataIndex: 'code',
            key: 'code',
            render:(text, record, index)=>{
                return index + 1
            }
        }, 
        {
            title: '流程节点',
            dataIndex: 'auditNodeName',
            key: 'auditNodeName',
        }, 
        {
            title: '处理人',
            dataIndex: 'operator',
            key: 'operator',
        }, 
        {
            title: '操作处理',
            dataIndex: 'operated',
            key: 'operated',
        }, 
        {
            title: '处理意见',
            dataIndex: 'comment',
            key: 'comment'
        }, 
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            render:(text)=>{
                return timestampFromat(text,false)
            }
        }, 
        {
            title: '处理时间',
            dataIndex: 'endTime',
            key: 'endTime',
            render:(text)=>{
                return timestampFromat(text,false)
            }
        }, 
        {
            title: '处理状态',
            dataIndex: 'result',
            key: 'result',
        },
      
    ];

    render(){
        var {projectInfo} = this.props
        if(!projectInfo.id) return null
        var {review} = projectInfo
        return (
            <div className="npd-project-create-info margin-ms-top">
                <div className="npd-project-create-title">审核轨迹</div>
                <Table 
                bordered={true}
                size="small"
                pagination={false}
                dataSource={review} 
                columns={this.columns} />
            </div>
        )
    }
}

export default Review