import React from 'react';
import {
    Form,
    Button,
    message
} from 'antd'
import {
    getUrlParams
} from "../../../../../util/baseTool"
import DeliverDetail from "../../common/component/deliverDetail"
import BasicInfo from "./basicInfo"
import LogisticsInfo from "./logisticsInfo"
import Btnwrap from "../../../../common/components/btnwrap/index"
class App extends React.Component {
    componentWillMount(){
        var {getDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getDetailAsync({id})
    }
    
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    submit = ()=>{
        
        var params = this.getParams()
        if(!params) return 

        var {saveProductInfo,comReviewActionAsync} = this.props;
        return saveProductInfo(params)
        .then(data=>{
            if(data){
                return params
            }
        })
        .then(params=>{
            if(params){
                comReviewActionAsync({
                    auditResult:1,
                    bizId:[params.id],
                    comment:"",
                    formId:"NpsProductDelivery"
                })
                .then(result=>{
                    if(result){
                        this.finally(result)
                    }
                })
            }
        })
        .catch(err=>console.log(err))
    }
    save = ()=>{
        var params = this.getParams()
        if(!params) return 

        var {saveProductInfo} = this.props;
        return saveProductInfo(params)
        .then(data=>{
            if(data){
                this.finally(data)
            }
        })
    }
    finally = (data)=>{
        message.success(data.msg)
        setTimeout(this.goback,1500)
    }
    getParams = ()=>{
        var { validateFields } = this.props.form;
        var {projectInfo,saveProductInfo} = this.props;
        if(!projectInfo.id) return message.warning("详情获取错误，请尝试刷新")
        var params = null;
        validateFields((err,v)=>{
            if(!err){
                var data =  {
                    basicInfo:{
                        developlinks:v.developlinks,
                        prepareGoods:v.prepareGoods,
                        productRemark:v.productRemark
                    },
                    logisticsInfo:{
                        isDetachable:v.isDetachable,
                        isMagnetism:v.isMagnetism,
                        isSupporting:v.isSupporting,
                        withBatteries:v.withBatteries,
                        withFluid:v.withFluid,
                        withMetal:v.withMetal,
                        withPowder:v.withPowder,
                    }
                }
                params = {
                    data,
                    id:projectInfo.id
                }
            }
        })
        return params
    }
    render(){
        return (
            <div className={"npd-handover-create mb52"}>
                <DeliverDetail {...this.props} />
                <BasicInfo {...this.props}></BasicInfo>
                <LogisticsInfo {...this.props}></LogisticsInfo>
                <Btnwrap>
                    <Button onClick={this.goback} className="margin-ms-right">取消</Button>
                    <Button onClick={this.save} className="margin-ms-right">保存</Button>
                    <Button onClick={this.submit}  type="primary" className="margin-ms-right">提交</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default Form.create()(App)

// <IPRInof {...this.props}></IPRInof>