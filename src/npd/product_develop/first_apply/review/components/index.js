import React from 'react';
import {
    Button,
    message,
    Form
} from 'antd'
import DeliverDetail from "../../common/component/deliverDetail"
import ProductInfo from "../../common/component/productInfo"
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
        if(!id) {
            message.warning("参数错误")
            setTimeout(this.goback,1500)
            return
        }
        getDetailAsync({id})
        this.setState({id})
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    
    state = {
        visible:false,
        id:null
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
        var {reviewActionAsync} = this.props
        var {id} = this.state
        if(!id) return;
        value.bizId = [id]
        value.formId = "firstOrderApplyProcess"
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
    render(){

        var {visible} = this.state

        return (
            <div className={"npd-fapply-create mb52"}>
                <DeliverDetail {...this.props} />
                <ProductInfo {...this.props} />
                <Review {...this.props} />
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