/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {Form,Button} from "antd"
import Modalmodel from '../../../../components/modalmodel/searchmodel';
import {message} from 'antd'
import Bundle from '../../../../common/components/bundle/bundle'
import $ from "../../../../components/jqueryfilter";
import observer from "../../../../util/observer"

const RuleApp = (props) => (
    <Bundle load={() => import('./ruleApp')}>
        {(RuleApp) => <RuleApp {...props} />}
    </Bundle>
)

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        ruleData : null 
    }
    /**
     *作者: 任贸华
     *功能描述: 关闭弹窗
     *参数说明:
     *时间: 2018/4/17 10:24
     */
    ModalhandleCancel = (value) => () => {
        this.props.changeOrdermodal({[value]: false})
    }
    // 启动
    startHandle = () => {
        const filter = this.props.filtertable.filter
        const group = filter.getData();
        const val = $.ligerui.toJSON(group)
        if (!val || val === '{"op":"and"}') {
            message.warning('条件配置为空，请设置当前规则后提交！')
            return false
        }
        this.props.controlTrackingAction({
            rule:val,
            status:1
        })
        .then(result=>{
            if(result){
                message.success(result.msg)
                this.ModalhandleCancel()
            }
        })

    }
    
    // 终止
    stopHandle = ()=>{
        this.props.controlTrackingAction({
            // rule:val,
            status:0
        })
        .then(result=>{
            if(result){
                message.success(result.msg)
                this.ModalhandleCancel()
            }
        })
    }
    componentWillReceiveProps(next){
        if(next.warehouserule != this.props.warehouserule && next.warehouserule.visible) {
            this.props.getTrackingJobAction()
            .then(result=>{
                if(result){
                    this.setState({
                        ruleData:result
                    })
                }
            })
        }
    }
    render() {
        let {ruleData} = this.state
        const content = <RuleApp ruleData={ruleData} {...this.props}/>
        const footer = (
            <div>
                <Button onClick={this.startHandle} >启动</Button>
                <Button onClick={this.stopHandle}>终止</Button>
            </div>
        )

        
        return (

            <Modalmodel  {...{
                ...this.props.warehouserule,
                visible: this.props.warehouserule.visible,
                width: 800,
                title: `${this.props.warehouserule.title}`,
                ModalContent: content
            }}
            className={'modalmt10'} 
            footer={footer}
            maskClosable={false}
            destroyOnClose
            confirmLoading={this.props.warehouserule.confirmLoading}
            onCancel={this.ModalhandleCancel('visible')}/>
        );
    }
}

export default Form.create()(UserForm);