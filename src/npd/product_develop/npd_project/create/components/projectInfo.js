import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
    Select
} from 'antd'
import {ntsTypes,states} from "../../common/json"
const FormItem = Form.Item
const Option = Select.Option
class App extends React.Component {
    state = {
        isEdit:true,
        list:[]
    }
    thimrId = null
    searchProjectFlow = (v)=>{
        clearTimeout(this.thimrId)
        this.thimrId = setTimeout(() => {
            var { searchProjectFlow } = this.props
            searchProjectFlow({
                projectName:v,
                pageData:20,
                pageNumber:1
            })
            .then(result=>{
                if(result){
                    var list = result.map((v,k)=>{
                        return <Option value={v.name + "//" +v.code} key={k}>{v.name}</Option>
                    })
                    this.setState({list})
                }
            })
        }, 1000);
    }
    
    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 14}
    }
    
    render(){
        var {getFieldDecorator} = this.props.form
        var {userInfo,id,projectInfo} = this.props
        var {projectDetail} = projectInfo
        var {isEdit,list} = this.state
        if(!list.length && projectDetail.projectflowInfo){
            list.push(<Option value={projectDetail.projectflowInfo + "//" +projectDetail.projectflowCode} key={projectDetail.projectflowCode}>{projectDetail.projectflowInfo}</Option>)
        }
        var projectflowDefault = projectDetail.projectflowInfo?(projectDetail.projectflowInfo + "//" + projectDetail.projectflowCode) : undefined
        return (
            <div className="npd-project-create-info">
                <div className="npd-project-create-title">立项主明细</div>
                <Row >
                    <Col span={ 6}  >
                        {
                            id?
                            (<FormItem
                                label="立项单号"  {...this.formItemLayout} 
                            >
                                {getFieldDecorator('projectCode',{
                                    initialValue:projectDetail.projectCode
                                })(
                                    <Input maxLength={100} disabled={true}/>
                                )}
                            </FormItem>)
                            :
                            (<FormItem
                                label="立项单号"  {...this.formItemLayout} 
                            >
                                <Input placeholder={"系统自动生成"} maxLength={100} disabled={true}/>
                            </FormItem>)
                        }
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="新品类型"  {...this.formItemLayout} 
                        >
                            <Input disabled value={ntsTypes[projectDetail.ntsType || 2]}/>
                            {getFieldDecorator('ntsType', {
                                initialValue:projectDetail.ntsType || 2
                            })(
                                <Input type={"hidden"} maxLength={100}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={ 6}  >
                        <FormItem
                            label="项目流信息"  {...this.formItemLayout} 
                        >
                            {getFieldDecorator('projectflowCode', {
                                rules: [{required: true, message: '请输入搜索项目流名称'}],
                                initialValue:projectflowDefault
                            })(
                                <Select 
                                style ={{width:"100%"}}
                                showSearch
                                placeholder="请输入搜索项目流名称"
                                defaultActiveFirstOption={false}
                                showArrow = {false}
                                filterOption = {false}
                                allowClear
                                onSearch={this.searchProjectFlow} 
                                notFoundContent={null}>
                                    {list}
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="状态"  {...this.formItemLayout} 
                        >
                            <Input disabled value={states["101"]}/>
                            {getFieldDecorator('state',{
                                initialValue:projectDetail.state || projectDetail.type || 101
                            })(
                                <Input type={"hidden"}  maxLength={100}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span={ 6}  >
                        <FormItem
                            label="开发员"  {...this.formItemLayout} 
                        >
                            <Input disabled value={projectDetail.developer || userInfo.userName}/>
                            {getFieldDecorator('developer',{initialValue:projectDetail.developer || userInfo.userName})(
                                <Input type={"hidden"}/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={ 6}  >
                        <FormItem
                            label="开发理由"  {...this.formItemLayout} 
                        >
                            {getFieldDecorator('reason', {
                                rules: [{required: false, message: '请输入开发理由'}],
                                initialValue:projectDetail.reason
                            })(
                                <Input placeholder={"请输入开发理由"} maxLength={100} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default App