import React from 'react';
import {
    Form,
    Row,
    Col,
    Table
} from 'antd'
import {whether} from "../json"
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
            title: '是否侵权',
            dataIndex: 'isTort',
            key: 'isTort',
            width:100,
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '是否违禁',
            dataIndex: 'isProhibited',
            key: 'isProhibited',
            width:100,
            render:(text, record, index)=>{
                return whether[text]
            }
        }, 
        {
            title: '结论',
            width:300,
            dataIndex: 'conclusion',
            key: 'conclusion',
        }, 
        {
            title: '产权操作列',  
            width:200,
            dataIndex: 'handle',
            key: 'handle',
        }
    ];

    render(){
        var {projectInfo} = this.props
        var {IPRInof} = projectInfo
        var data = null;
        if(Object.keys(IPRInof).length){
            IPRInof.key = 0;
            data = [IPRInof]
        }
        return (
            <div className="npd-handover-create-info margin-ms-top">
                <div className="npd-handover-create-title">知识产权信息</div>
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