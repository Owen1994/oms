import React from 'react';
import {
    Button,
    message
} from 'antd'
import ProjectInfo from "../../common/component/projectInfo"
import NtsMarketplaceInfo from "../../common/component/ntsMarketplaceInfo"
import Supplier from "../../common/component/supplier"
import Review from "../../common/component/review"
import Modal from "./modal"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getProductDetailAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getProductDetailAsync({id})
    }
    state = {
        visible:false
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    reviewCallback = ()=>{
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
        var {reviewActionAsync,projectInfo} = this.props
        value.bizId = [projectInfo.id]
        value.formId = "NpsApprovalProduct"
        reviewActionAsync(value)
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
    componentWillUnmount(){
        this.props.clearDetailAction()
    }
    render(){
        var {visible} = this.state
        return (
            <div className={"npd-project-create mb52"}>
                <ProjectInfo {...this.props} ></ProjectInfo>
                <NtsMarketplaceInfo {...this.props}></NtsMarketplaceInfo>
                <Supplier {...this.props}></Supplier>
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

export default App
// <div className="npd-project-create-submit">
//                 </div>