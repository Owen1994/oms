import React from 'react';
import {
    Form,
    Table,
    Checkbox
} from 'antd'
import states from "../../../../constants/state"
import {currencys} from "../../common/json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
import {units} from '../../common/json'
const FormItem = Form.Item
class Supplier extends React.Component {
    checked = (val,record)=>{
        var {changeCheckedList} = this.props
        var v = val.target.checked
        changeCheckedList(record,v)
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'code',
            key: 'code',
            render:(t,r,i)=>{
                var {checkedList} = this.props
                var {state} = r
                if(!state){
                    return <Checkbox checked={checkedList.includes(r) } onChange={(val)=>this.checked(val,r)}></Checkbox>
                }
                return <Checkbox checked={false} disabled></Checkbox>
            }
        }, 
        {
            title: '意向供应商编码',
            dataIndex: 'supplierCode',
            key: 'supplierCode',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: '供应商名称',
            dataIndex: 'supplierName',
            key: 'supplierName',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: '联系人',
            dataIndex: 'linkman',
            key: 'linkman',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: 'QQ',
            dataIndex: 'QQ',
            key: 'QQ',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: '供应商地址',
            dataIndex: 'supplierAdress',
            key: 'supplierAdress',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: '1688供应商链接',
            dataIndex: 'linkOf1688',
            key: 'linkOf1688',
            render:(text, record, index)=>{
                return <a href={text} target="_blank">打开链接</a>
            }
        },
        {
            title: '产品单价',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: '币种',
            dataIndex: 'currency',
            key: 'currency',
            render:(text)=>{
                return currencys[text]
            }
        },
        {
            title: '交期',
            dataIndex: 'dealTime',
            key: 'dealTime',
        },
        {
            title: '交期单位',
            dataIndex: 'dealTimeUnit',
            key: 'dealTimeUnit',
            render: ()=>{
                return '天';
            }
        },
        {
            title: '起订量',
            dataIndex: 'minBooking',
            key: 'minBooking',
        },
        {
            title: '起订单位',
            dataIndex: 'minBookingUnit',
            key: 'minBookingUnit',
            render: (text, record) => {
                return units[Number(text)];
            }
        },
        {
            title: '样品单号',
            dataIndex: 'sampleCode',
            key: 'sampleCode',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        },
        {
            title: '对应状态',
            dataIndex: 'state',
            key: 'state',
            render:(text, record, index)=>{
                if(!text) return ""
                return "已生成"
            }
        },
        {
            title: '操作',
            dataIndex: 'handle',
            key: 'handle',
            render:(text, record, index)=>{
                var {soleSubmit} = this.props
                var {state} = record
                if(!state){
                    return <span className="blue" onClick={()=>soleSubmit(record)}>生成样品</span>
                }
                return null
            }
        },
    ];

    render(){
        var {projectInfo} = this.props
        if(!projectInfo.id) return null
        var {supplier} = projectInfo
        return (
            <div className="npd-project-create-info margin-ms-top">
                <div className="npd-project-create-title">意向供应商明细</div>
                <Table 
                bordered={true}
                size="small"
                pagination={false}
                dataSource={supplier} 
                columns={this.columns} />
            </div>
        )
    }
}

export default Supplier