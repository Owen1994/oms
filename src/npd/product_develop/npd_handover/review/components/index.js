import React from 'react';
import {
    Button,
    message,
    Form
} from 'antd'
import DeliverDetail from "../../common/component/deliverDetail"
import BasicInfo from "../../common/component/basicInfo"
import LogisticsInfo from "../../common/component/logisticsInfo"
import IPRInof from "../../common/component/IPRInof"
import IPRInofCom from "./IPRInof"
import Review from "../../common/component/review"
import Btnwrap from "../../../../common/components/btnwrap/index"
import Modal from "./modal"
import { getCookie,getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getDetailAsync({id})
    }
    state = {
        visible:false
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    reviewCallback = ()=>{
        var {getFieldValue} = this.props.form
        var {projectInfo} = this.props
        var { state } = projectInfo.deliverDetail
        if(state === 5001 && !getFieldValue("conclusion"))return message.warning("请先填写知识产权信息结论")
        this.setState({
            visible:true
        })
    }
    cancel = ()=>{
        this.setState({
            visible:false
        })
    }
    handleOk = (value)=>{
        var params ;
        var {reviewActionAsync,projectInfo,reviewIPRActionAsync} = this.props
        var { state } = projectInfo.deliverDetail
        if(state === 5001) {
            params = {
                comment:value.comment,
                auditResult:value.auditResult,
                bizId:[projectInfo.id],
                formId:"NpsProductDelivery"
            }
            var data = {
                data:{
                    conclusion:value.conclusion,
                    contraband:value.isProhibited,
                    tort:value.isTort,
                },
                id:projectInfo.id,
            }
            reviewIPRActionAsync(data)
            .then(result=>{
                if(result){
                    reviewActionAsync(params)
                    .then(result=>{
                        if(result){
                            message.success(result.msg)
                            this.cancel()
                            setTimeout(()=>{
                                this.goback()
                            },1500)
                        }
                    })
                }
            })
        }else {
            params =  value
            params.bizId = [projectInfo.id],
            params.formId = "NpsProductDelivery"
            
            reviewActionAsync(params)
            .then(result=>{
                if(result){
                    message.success(result.msg)
                    this.cancel()
                    setTimeout(()=>{
                        this.goback()
                    },1500)
                }
            })
        }
    }
    render(){
        var {visible} = this.state
        var {projectInfo} = this.props;
        var {state} = projectInfo.deliverDetail
        return (
            <div className={"npd-handover-create mb52"}>
                <DeliverDetail {...this.props} />
                <BasicInfo {...this.props}></BasicInfo>
                <LogisticsInfo {...this.props}></LogisticsInfo>
                {
                    state === 5001 ?
                    <IPRInofCom {...this.props}></IPRInofCom>
                    :
                    <IPRInof {...this.props}></IPRInof>
                }
                <Review {...this.props}></Review>
                <Btnwrap>
                    <Button onClick={this.goback} className="margin-ms-right">取消</Button>
                    <Button onClick={this.reviewCallback} type="primary" className="margin-ms-right">审核</Button>
                </Btnwrap>
                <Modal 
                {...this.props}
                cancel={this.cancel}
                handleOk={this.handleOk}
                visible={visible}></Modal>
            </div>
        )
    }
}

export default Form.create()(App)