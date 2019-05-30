import React from 'react';
import {
    Form,
    message,
    Button
} from 'antd'
import {
    dataPack,
    getUrlParams
} from "../../../../../util/baseTool"
import DeliverDetail from "./editDeliverDetail"
import ProductInfo from "./editProductInfo"
import Btnwrap from "../../../../common/components/btnwrap/index"
class App extends React.Component {
    componentWillMount(){
        var {getDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        if(id){
            getDetailAsync({id})
            this.setState({id})
        }
    }
    state = {
        id:0
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    submit = ()=>{
        var {saveProductInfo,comReviewActionAsync} = this.props;
        var params = this.getParams()
        if(!params) return
        saveProductInfo(params)
        .then(data=>{
            if(data){
                return true
            }
            message.error(data.msg)
        })
        .then(data=>{
            if(data){
                comReviewActionAsync({
                    bizId:[params.data.id],
                    auditResult:1,
                    comment:"",
                    formId:"firstOrderApplyProcess"
                })
                .then(data=>{
                    if(data){
                        message.success(data.msg)
                        return  this.goback()
                    }
                    message.error(data.msg)
                })
            }
        })
    }
    save = ()=>{
        var {saveProductInfo} = this.props;
        var params = this.getParams()
        if(!params) return
        saveProductInfo(params)
        .then(data=>{
            if(data){
                message.success(data.msg)
                return  this.goback()
            }
            message.error(data.msg)
        })
    }
    getParams = ()=>{
        var { validateFields } = this.props.form;
        var {id} = this.state
        if(!id) return message.warning("详情获取错误，请尝试刷新")
        var params;
        validateFields((err,v)=>{
            if(!err){

                const template = {
                    productInfo: [{
                        firstOrderCount: "",
                        lowestCount: "",
                        predictSales: "",
                        unit: "",
                        id:"",
                        sku:"",
                        spu:"",
                        procurementPrice: "",
                        carriage: "",
                        sellingPrice: "",
                        carriageCurrency:"",
                        sellingPriceCurrency:"",
                        grossMargin:""
                    }],
                }
                var data = dataPack(template, v)
                var applyDetial = {
                    remark:v.remark,
                    remittanceType:v.remittanceType,
                    warehouseCode:v.warehouseCode,
                }
                data = {
                    ...applyDetial,
                    id:id,
                    list : data.productInfo
                }
                params = {
                    data
                }
            }
        })
        console.log(params)
        return params
    }
    render(){
        return (
            <div className={"npd-fapply-create mb52"}>
                <DeliverDetail {...this.props} />
                <ProductInfo {...this.props} />
                <Btnwrap>
                    <Button onClick={this.goback} className="margin-ms-right">返回</Button>
                    <Button onClick={this.save} className="margin-ms-right">保存</Button>
                    <Button onClick={this.submit} type="primary" className="margin-ms-right">提交</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default Form.create()(App)
