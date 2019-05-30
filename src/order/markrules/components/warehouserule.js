/**
 *作者: 任贸华
 *功能描述: 指定发货仓增、查、改组件
 *参数说明:
 *时间: 2018/4/16 11:23
 */
import React, {Component} from 'react'
import {Form} from "antd"
import Modalmodel from '../../../components/modalmodel/searchmodel';
import {message} from 'antd'
import Bundle from '../../../common/components/bundle/bundle'
import observer from "../../../util/observer"

const RuleApp = (props) => (
    <Bundle load={() => import('./ruleApp')}>
        {(RuleApp) => <RuleApp {...props} />}
    </Bundle>
)

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps(next){
        if(next.warehouserule.visible && 
            next.warehouserule.ruleId && 
            next.warehouserule.ruleId !== this.props.warehouserule.ruleId){
                this.props.getMarkupActionAsync({ruleId:next.warehouserule.ruleId})
        }
    }
    handleOk = ()=>{
        var {markupActionAsync} = this.props;
        this.props.form.validateFieldsAndScroll((err,value)=>{
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            var restrictionJson = observer.emit("getFilterData")[0];
            console.log('restrictionJson: ', restrictionJson)
            value.restrictionJson = restrictionJson
            if(value.numberPoolType === 2 &&!value.appointChannels) {
                return  message.warning("请选择指定渠道")
            }
            if(value.appointChannels){
                value.appointChannels = value.appointChannels.join(",")
            }
            if(value.appointLogisticsTypes){
                value.appointLogisticsTypes = value.appointLogisticsTypes.join(",")
            }
            if(value.isPriorityMarkChannel === 0 &&
                !value.priorityChannelOne &&
                !value.priorityChannelTwo &&
                !value.priorityChannelThree ){
                    return message.warning("优先标记渠道必选一个") 
                }
            markupActionAsync(value)
            .then(result=>{
                this.props.getListData()
                message.success(result.msg) 
                this.ModalhandleCancel()
            })
        })
    }
    ModalhandleCancel = () =>{
        observer.remove("getFilterData");
        this.props.getMarkupAction({})
        this.props.selectPlatform('');
        this.props.changeOrdermodal({
            visible: false,
            ruleId : null
        })
    }
    render() {
        const content = <RuleApp {...this.props}/>
        return (

            <Modalmodel  {...{
                ...this.props.warehouserule,
                visible: this.props.warehouserule.visible,
                width: 600,
                title: `${this.props.warehouserule.title}`,
                ModalContent: content
            }}
            className={'modalmt10'} 
            maskClosable={false}
            destroyOnClose
            confirmLoading={this.props.warehouserule.confirmLoading}
            onOk={this.handleOk}
            onCancel={this.ModalhandleCancel}/>
        );
    }
}

export default Form.create()(UserForm);