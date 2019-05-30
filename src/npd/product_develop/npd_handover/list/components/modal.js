import React from 'react';
import {
    Modal,
    Input,
    Form,
    Radio,
    message
} from 'antd'
import { states } from "../../common/json"
const TextArea = Input.TextArea
const FormItem = Form.Item
const RadioGroup = Radio.Group;
class App extends React.Component {
    state = {
        type:["","提交","审核"]
    }
    componentWillMount(){
    }
    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
    }
    handleOk = ()=>{
        var {handleOk,visible} = this.props
        if(!visible) return
        if(visible == 1){
            handleOk(undefined)
        }else {
            var {validateFields} = this.props.form
            validateFields((err,value)=>{
                if(!err){
                    handleOk(value)
                }else {
                    var msg = err[Object.keys(err)[0]].errors[0].message
                    message.warning(msg)
                }
            })
        }
    }
    render(){
        var {type} = this.state
        var { visible,cancel} = this.props
        var {getFieldDecorator} =this.props.form
        
        var submit = (
            <div className="npd-project-text">确认提交</div>
        )
        var review = (
            <div>
                <FormItem
                    label="审核意见"  {...this.formItemLayout} className="test"
                >
                    {getFieldDecorator('comment',{
                        rules: [{required: true,  message: '请输入审核意见'}]
                    })(
                        <TextArea autosize={{ minRows: 3}}  maxLength="100"/>
                    )}
                </FormItem>
                <FormItem wrapperCol= {{offset:4,span: 18}} className="test"
                >
                    {getFieldDecorator('auditResult',{
                        initialValue:1
                    })(
                        <RadioGroup>
                            <Radio value={1}>通过</Radio>
                            <Radio value={0}>不通过</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
            </div>
        )
        var content = visible == 1 ? submit
                      :
                      visible == 2 ? review
                      :
                      null
        return (
            <Modal
                title={`批量${type[visible]}`}
                visible={!!visible}
                onOk={this.handleOk}
                onCancel={cancel}>
                {
                    content
                }
            </Modal>
        )
    }
}

export default Form.create()(App)