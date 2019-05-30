import React from 'react';
import {
    Form,
    Row,
    Col,
} from 'antd'
import {ntsTypes,remittances} from "../json"
import states from "../../../../constants/state"
import {
    datasaddkey,
    timestampFromat
} from "../../../../../util/baseTool"
const FormItem = Form.Item
class BeliverDetail extends React.Component {
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    render(){
        var {projectInfo} = this.props
        var {applyDetail} = projectInfo
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
                            <span className="limit-lineheight">{applyDetail.projectFlowName?(applyDetail.projectFlowName + "("+applyDetail.projectFlowCode + ")"):""}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="仓库"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.warehouseName}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="付款方式"  {...this.formItemLayout}
                        >
                            <span>{remittances[applyDetail.remittanceType]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="交期"  {...this.formItemLayout}
                        >
                            <span>{applyDetail.deliveryTime}</span>
                            <span className="margin-ss-left">天</span>
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
                            label="创建时间"  {...this.formItemLayout}
                        >
                            <span>{timestampFromat(applyDetail.createTime)}</span>
                        </FormItem>
                    </Col>
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
                </Row>
                <Row >
                    <Col span={ 24}  >
                        <FormItem
                            label="备注"
                            labelCol= {{span: 2}}
                            wrapperCol= {{span: 22}}
                        >
                            <span>{applyDetail.remark}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BeliverDetail