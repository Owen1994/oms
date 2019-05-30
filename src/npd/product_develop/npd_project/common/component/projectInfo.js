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
class App extends React.Component {
    formItemLayout = {
        labelCol: {span: 11},
        wrapperCol: {span: 11}
    }
    render(){
        var {projectInfo} = this.props
        if(!projectInfo.id) return null
        var {projectDetail} = projectInfo
        return (
            <div className="npd-project-create-info">
                <div className="npd-project-create-title">立项主明细</div>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="立项单号"  {...this.formItemLayout}
                        >
                            <span>{projectDetail.projectCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="新品类型"  {...this.formItemLayout}
                        >
                            <span>{ntsTypes[projectDetail.ntsType]}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="项目流名称"  {...this.formItemLayout}
                        >
                            <span className="limit-lineheight">{projectDetail.projectflowInfo}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="状态"  {...this.formItemLayout}
                        >
                            <span>{states[projectDetail.state]}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="新增时间"  {...this.formItemLayout}
                        >
                            <span>{timestampFromat(projectDetail.createTime)}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="热销申请单号"  {...this.formItemLayout}
                        >
                            <span>{projectDetail.hotsellCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="开发员"  {...this.formItemLayout}
                        >
                            <span>{projectDetail.developer}</span>
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="销售员"  {...this.formItemLayout}
                        >
                            <span>{projectDetail.salesman}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row style={{padding:"0 3.8%"}}>
                    <Col span={ 24}  >
                        <FormItem
                            label="开发理由"
                            labelCol= {{span: 2}}
                            wrapperCol= {{span: 22}}
                        >
                            <span>{projectDetail.reason}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App