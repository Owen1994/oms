import React from 'react';
import {
    Form,
    Row,
    Col,
} from 'antd'
import {ntsTypes} from "../json"
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
        var {deliverDetail} = projectInfo
        return (
            <div className="npd-handover-create-info">
                <div className="npd-handover-create-title">交接主明细</div>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="交接单号"  {...this.formItemLayout}
                        >
                            <span>{deliverDetail.deliverCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="新品类型"  {...this.formItemLayout}
                        >
                            <span>{ntsTypes[deliverDetail.ntsType]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="项目流名称"  {...this.formItemLayout}
                        >
                            <span className="limit-lineheight">{deliverDetail.projectflowInfo}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="状态"  {...this.formItemLayout}
                        >
                            <span>{states[deliverDetail.state]}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="立项单号"  {...this.formItemLayout}
                        >
                            <span>{deliverDetail.projectCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="样品单号"  {...this.formItemLayout}
                        >
                            <span>{deliverDetail.sampleCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="新增时间"  {...this.formItemLayout}
                        >
                            <span>{timestampFromat(deliverDetail.createTime)}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="开发员"  {...this.formItemLayout}
                        >
                            <span>{deliverDetail.developer}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 24}  >
                        <FormItem
                            label="开发理由"
                            labelCol= {{span: 2}}
                            wrapperCol= {{span: 22}}
                        >
                            <span>{deliverDetail.reason}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BeliverDetail