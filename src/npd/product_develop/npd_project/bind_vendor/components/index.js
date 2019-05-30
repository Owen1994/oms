import React from 'react';
import {
    Button,
    message
} from 'antd'
import Btnwrap from "../../../../common/components/btnwrap/index"
import ProjectInfo from "../../common/component/projectInfo"
import NtsMarketplaceInfo from "../../common/component/ntsMarketplaceInfo"
import {getUrlParams} from '../../../../../util/baseTool';
import Supplier from "./Supplier"

class App extends React.Component {
    state = {
        id:0
    }
    componentWillMount(){
        var {getProductDetailAsync,bindvendordefualtDataAction} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getProductDetailAsync({id})
        .then(result=>{
            if(result && result.length){
                result.forEach((v,k) => {
                    v.key = "default" + k;
                    v.isDefault = true;
                });
                bindvendordefualtDataAction(result)
            }
        })
        this.setState({
            id
        })
    }
    componentWillUnmount(){
        this.props.clearDetailAction()
        this.props.bindvendorClearAction()
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    submit = ()=>{
        let {id} = this.state
        let {bindvendorParamsData,bindvendorSubmitActionAsync,projectInfo}= this.props
        let i=0,l=bindvendorParamsData.length,supplierList =[]
        for(;i<l;i++){
            let v = bindvendorParamsData[i];
            if(!v.supplierName) return message.warning("请核实意向供应商编码是否正确")
            if(!v.price) return message.warning("产品单价为必填，请核实")
            console.log('v ',v);
            let obj = {
                currency:v.currency,
                linkOf1688:v.linkOf1688,
                price:v.price,
                supplierCode:v.supplierCode,
                dealTime: v.dealTime,
                minBooking: v.minBooking,
                minBookingUnit: v.minBookingUnit
            }
            if(v.id){
                obj.id = v.id
            }
            supplierList.push(obj)
        }
        let params = {
            projectCode:projectInfo.projectDetail && projectInfo.projectDetail.projectCode,
            supplierList:supplierList,
            id
        }
        bindvendorSubmitActionAsync(params)
        .then(result=>{
            result && setTimeout(this.goback,1500)
        })
    }
    render(){
        return (
            <div className={"npd-project-create mb52"}>
                <ProjectInfo {...this.props} ></ProjectInfo>
                <NtsMarketplaceInfo {...this.props}></NtsMarketplaceInfo>
                <Supplier {...this.props}></Supplier>
                <Btnwrap>
                    <Button onClick={this.goback} className="margin-ms-right">取消</Button>
                    <Button onClick={this.submit} type="primary" className="margin-ms-right">确定</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App