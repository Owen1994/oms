import React from 'react';
import {
    Form,
    Select,
    Row,
    Col,
    Input,
    InputNumber
} from 'antd'
import {ntsTypes,remittanceSelect} from "../../common/json"
import states from "../../../../constants/state"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input;
class BeliverDetail extends React.Component {
    state = {
        searchList:[]
    }
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    timerId = 0
    search=(v)=>{
        clearTimeout(this.timerId)
        this.timerId = setTimeout(()=>{
            var params = {
                pageData:20,
                pageNumber:1,
                name:v,
                state:1
            }
            return this.props.searchWarehouse(params)
            .then(result=>{
                if(result&&result.length){
                    this.setState({searchList:result})
                }
            })
        },1000)
    }
    render(){
        var {projectInfo} = this.props
        var {searchList} = this.state
        var {getFieldDecorator} = this.props.form
        var {applyDetail} = projectInfo
        var data = searchList&&searchList.length?searchList:[{name:applyDetail && applyDetail.warehouseName,code:applyDetail && applyDetail.warehouseCode}]
        data = data.map((item,k)=>{
            return <Option value={item.code} key={item.id}>{item.name}</Option>
        })
        var remittanceSelects = remittanceSelect.map((item,k)=>{
            return <Option value={item.v} key={k}>{item.n}</Option>
        })
        return (
            <div className="npd-fapply-create-info">
                <div className="npd-fapply-create-title">申请主明细</div>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="首单申请号"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.firstOrderNo}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="供应商"  {...this.formItemLayout}
                        >
                            <span className="limit-lineheight">{applyDetail.supplierName?(applyDetail.supplierName + " + " + applyDetail.supplierCode) : ""}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="项目流信息"  {...this.formItemLayout}
                        >
                            <span className="limit-lineheight">{applyDetail.projectFlowName?(applyDetail.projectFlowName +"("+ applyDetail.projectFlowCode+")"):""}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="仓库"  {...this.formItemLayout}
                        >
                            {getFieldDecorator('warehouseCode',{
                                initialValue:applyDetail.warehouseCode
                            })(
                                <Select 
                                style={{width:"100%"}}
                                showSearch
                                placeholder="请输入搜索条件"
                                defaultActiveFirstOption={false}
                                filterOption = {false}
                                allowClear
                                onSearch={this.search} 
                                notFoundContent={null}>
                                    {data}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="付款方式"  {...this.formItemLayout}
                        >
                            {getFieldDecorator('remittanceType',{
                                initialValue:applyDetail.remittanceType
                            })(
                                <Select 
                                style={{width:"100%"}}
                                defaultActiveFirstOption={false}
                                filterOption = {false}
                                notFoundContent={null}>
                                    {remittanceSelects}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="总金额"  {...this.formItemLayout}
                        >
                            <span className="margin-ss-left">{applyDetail.totalFee?(applyDetail.totalFee + applyDetail.grossFreight):0}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="采购总金额"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.totalFee}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="总运费"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.grossFreight}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                
                    
                    <Col span={ 6}  >
                        <FormItem
                            label="状态"  {...this.formItemLayout}
                        >
                            <span>{states[applyDetail.state]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="开发员"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.developer}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="创建时间"  {...this.formItemLayout}
                        >
                            <span>{timestampFromat(applyDetail.createTime)}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={6}  >
                        <FormItem
                            label="备注"
                            labelCol= {{span: 8}}
                            wrapperCol= {{span: 16}}
                        >
                            {getFieldDecorator('remark',{
                                initialValue:applyDetail.remark
                            })(
                                <TextArea autosize = {{ minRows: 2, maxRows: 6 }} style={{width:"100%"}}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BeliverDetail


// <Col span={ 6}  >
//     <FormItem
//         label="交期"  {...this.formItemLayout}
//     >
//         {getFieldDecorator('deliveryTime',{
//             initialValue:applyDetail.deliveryTime
//         })(
//             <InputNumber style={{width:"80px"}}/>
//         )}
//         <span className="margin-ss-left">天</span>
//     </FormItem>
// </Col>