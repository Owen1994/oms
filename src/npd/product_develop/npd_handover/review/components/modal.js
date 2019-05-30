import React from 'react';
import {
    Modal,
    Input,
    Form,
    Radio,
    message
} from 'antd'
// import { states } from "../../common/json"
import states from "../../../../constants/state"
const TextArea = Input.TextArea
const FormItem = Form.Item
const RadioGroup = Radio.Group;
class App extends React.Component {
    componentWillMount(){
    }
    formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 18}
    }
    handleOk = ()=>{
        var {handleOk} = this.props
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
    render(){
        var { visible,cancel,projectInfo} = this.props
        var {getFieldDecorator} =this.props.form
        var { state } = projectInfo.deliverDetail
        return (
            <Modal
                title={`审核(${states[state]})`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={cancel}>
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
            </Modal>
        )
    }
}

export default Form.create()(App)