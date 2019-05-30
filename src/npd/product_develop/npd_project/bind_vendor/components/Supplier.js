import React from 'react';
import {
    Form,
    Row,
    Col,
    message,
    Table,
    Input,
    InputNumber,
    Select,
    DatePicker 
} from 'antd'
import moment from 'moment';
import {currencys,currencySelect,minBookingUnitSelect} from "../../common/json"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
const Option = Select.Option;
class Supplier extends React.Component {
    state = {}
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    rowSelection = {}

    changeData = (val,i,type)=>{
        var {bindvendorChangeAction,bindvendorParamsData} = this.props
        var v;
        console.log(val)
        if(type == "price" || type === "dealTime" || type === "minBooking"){
            v = val
        }else {
            v = val.target.value
        }
        if(type == "supplierCode"){
            for(let l=0;l<bindvendorParamsData.length;l++){
                if(v === bindvendorParamsData[l][type]){
                    bindvendorChangeAction("",i,type)
                    return message.warning("请勿输入相同意向供应商编码")
                }
            }
            bindvendorChangeAction(v,i,type)
            this.changeSupplierCode(v,i)
        }else {
            bindvendorChangeAction(v,i,type)
        }
    }
    timerId = null
    changeSupplierCode = (val,i)=>{
        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            var {bindvendorParamsActionAsync} = this.props;
            bindvendorParamsActionAsync(val,i)
            .then(result=>{

            })
        },1500)
    }
    // 添加
    addData = ()=>{
        var {bindvendorAddAction } = this.props
        bindvendorAddAction()
    }
    // 删除
    removeData = (record)=>{
        var i = record.key;
        var { bindvendorRemoveAction,delDindvendorActionAsync} = this.props
        // if(record.id){
        //     delDindvendorActionAsync()
        //     .then(result=>{
        //         if(result){
        //             bindvendorRemoveAction(i)
        //             message.success("删除成功")
        //         }
        //     })
        // }else {
            bindvendorRemoveAction(i)
            // message.success("删除成功")
        // }
    }
    // 选择币种
    changeCurrency = (val,i,type)=>{
        console.log(val)
        var {bindvendorChangeAction} = this.props
        bindvendorChangeAction(val,i,type)
    }
    currencyOption = currencySelect.map((v,k)=>{
        return <Option key={k} value={v.v}>{v.n}</Option>
    })
    //选择起订量单位
    minBookingUnitOption = minBookingUnitSelect.map((v,k)=>{
        return <Option key={k} value={v.v}>{v.n}</Option>
    })
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
            title: '意向供应商编码',
            dataIndex: 'supplierCode',
            key: 'supplierCode',
            render:(t,r,i)=>{
                var {state } = r
                return <Input  disabled={!!state} value={t} onChange={(value)=>this.changeData(value,i,"supplierCode")}/>
            }
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
            render: text => <div style={{wordWrap:'break-word', width: '100px'}}>{text}</div>,
        }, 
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            render: text => <div style={{wordWrap:'break-word'}}>{text}</div>,
        }, 
        {
            title: 'QQ',
            dataIndex: 'qq',
            key: 'qq',
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
            render:(t,r,i)=>{
                var {state } = r
                return <Input value={t} disabled={!!state} onChange={(value)=>this.changeData(value,i,"linkOf1688")}/>
            }
        },
        {
            title: '产品单价',
            dataIndex: 'price',
            key: 'price',
            render:(t,r,i)=>{
                var {state } = r
                return <InputNumber disabled={!!state} style={{width: '100%'}} precision={2} value={t} onChange={(value)=>this.changeData(value,i,"price")}/>
            }
        },
        {
            title: '币种',
            dataIndex: 'currency',
            key: 'currency',
            width: 90,
            render:(t,r,i)=>{
                var {state } = r
                t = Number(t)
                return  <Select disabled={!!state} defaultValue={t} onChange={(val)=>this.changeCurrency(val,i,"currency")}>
                            {this.currencyOption}
                        </Select>
            }
        },
        {
            title: '交期',
            dataIndex: 'dealTime',
            key: 'dealTime',
            render: (t,r,i)=>{
                var {state } = r
                return <InputNumber disabled={!!state} style={{width: '100%'}} value={t} onChange={(value)=>this.changeData(value,i,"dealTime")}/>
            }
        },
        {
            title: '交期单位',
            dataIndex: 'dealTimeUnit',
            key: 'dealTimeUnit',
            render: ()=>{
                return '天'
            }
        },
        {
            title: '起订量',
            dataIndex: 'minBooking',
            key: 'minBooking',
            render:(t,r,i)=>{
                var {state } = r
                return <InputNumber disabled={!!state} style={{width: '100%'}} precision={0} defaultValue={t} onChange={(value)=>this.changeData(value,i,"minBooking")}/>
            }
        },
        {
            title: '起订单位',
            dataIndex: 'minBookingUnit',
            key: 'minBookingUnit',
            width: 100,
            render: (t,r,i) => {
                var {state } = r
                t = Number(t) || 0;
                return  <Select disabled={!!state} defaultValue={t} onChange={(val)=>this.changeCurrency(val,i,"minBookingUnit")}>
                            {this.minBookingUnitOption}
                        </Select>
            }
        },
        {
            title: '操作',
            dataIndex: 'handle',
            key: 'handle',
            render:(text, record, index)=>{
                var {isDefault } = record
                if( index == 0){
                    return <span className="blue" onClick={this.addData}>添加</span>
                }else if(isDefault){
                    return null
                }
                return <span className="blue" onClick={()=>this.removeData(record)}>删除</span>
            }
        },
    ];

    render(){
        var {bindvendorParamsData} = this.props
        return (
            <div className="npd-project-create-info margin-ms-top">
                <div className="npd-project-create-title">意向供应商明细</div>
                <Table 
                bordered={true}
                size="small"
                pagination={false}
                dataSource={bindvendorParamsData} 
                columns={this.columns} />
            </div>
        )
    }
}

export default Form.create()(Supplier)