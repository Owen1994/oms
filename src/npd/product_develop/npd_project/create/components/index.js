import React from 'react';
import {
    Form,
    Button
} from 'antd'
import ProjectInfo from "./projectInfo"
import NtsMarketplaceInfo from "./ntsMarketplaceInfo"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getCookie,getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {
            getDetailAsync,
            classifyInfoActionAsync,
            classifyInfoActionAsync,
            classify1,
            imgInfoAction
        } = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        if(id){
            getDetailAsync({id:id})
            .then(result=>{
                if(result && result.market){
                    var {classify1}  =this.props
                    var market = result.market
                    var {classifyCode1,classifyCode2,classifyCode3 } = market
                    this.setDefaultClassify(classify1,classifyCode1,classifyCode2,classifyCode3)
                    imgInfoAction(market.imageUrl)
                }
            })
            this.setState({
                id
            })
        }
        if(!classify1 || !classify1.length){
            classifyInfoActionAsync()
        }
        try{
            var userInfo =  JSON.parse(unescape(getCookie("session")))
            if(!userInfo || !typeof userInfo == "object"){
                message.warning("用户未登入")
                return 
            }
            this.setState({
                userInfo
            })
        }catch(e){
            message.warning(e.message)
        }
    }
    state = {
        userInfo:{},
        id:"",
    }
    componentWillReceiveProps(next){
        var {classify1,projectInfo} = this.props
        if(next.classify1 != classify1 || next.projectInfo.market !=projectInfo.market ){
            var {classifyCode1,classifyCode2,classifyCode3} = next.projectInfo.market
            this.setDefaultClassify(next.classify1,classifyCode1,classifyCode2,classifyCode3)
        }
    }
    setDefaultClassify = (arr,c1,c2,c3)=>{
        var {
            classifyInfoAction2,
            classifyInfoAction3,
        } = this.props
        var i=0,l,arr2 =[],arr3=[];
        if(c1){
            l = arr.length;
            for(;i<l;i++){
                if(arr[i].cateId == c1){
                    arr2 = arr[i].subCategorys || []
                    break;
                }
            }
        }
        if(c2 && arr2 && arr2.length){
            l = arr2.length;
            i = 0;
            for(;i<l;i++){
                if(arr2[i].cateId == c2){
                    arr3 = arr2[i].subCategorys || []
                    break;
                }
            }
        }
        classifyInfoAction2(arr2)
        classifyInfoAction3(arr3)
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    // 用于防止重复提交
    isSubmit = true ;
    getParams = ()=>{
        var {validateFields} = this.props.form
        var {id} = this.state
        validateFields((err,value)=>{
            if(!err){
                if(!this.isSubmit) return
                this.isSubmit = false ;
                var {imgData,save} = this.props
                var params = {}
                var projectflow = value.projectflowCode.split("//")
                var class1 = value.classify1.split("//")
                var class2 = value.classify2.split("//")
                var class3 = value.classify3 ? value.classify3.split("//") :["",""]
                
                var projectInfo = {
                    createTime:+new Date(),
                    developer:value.developer,
                    ntsType:value.ntsType,
                    projectflowCode:projectflow[1],
                    projectflowInfo:projectflow[0],
                    reason:value.reason,
                    state:value.state,
                }
                var ntsMarketplaceInfo = {
                    chineseName:value.chineseName,
                    classify1:class1[0],
                    classifyCode1:class1[1],
                    classify2:class2[0],
                    classifyCode2:class2[1],
                    classify3:class3[0],
                    classifyCode3:class3[1],
                    costing:value.costing,
                    hotsellCurrency:value.hotsellCurrency,
                    hotsellLink1:value.hotsellLink1,
                    hotsellLink2:value.hotsellLink2,
                    hotsellPrice:value.hotsellPrice,
                    imageUrl:imgData,
                    margin:value.margin,
                    predictCurrency:value.predictCurrency,
                    predictPrice:value.predictPrice,
                    saleroom:value.saleroom,
                    sales:value.sales,
                    sellBestLink:value.sellBestLink,
                    sellCurrency:value.sellCurrency,
                    sellLink:value.sellLink,
                    sellPrice:value.sellPrice,
                }
                if(id){
                    params.id = id;
                    projectInfo.projectCode = value.projectCode;
                }
                params.ntsMarketplaceInfo = ntsMarketplaceInfo;
                params.projectInfo = projectInfo;
                save(params)
                .then(result=>{
                    if(result){
                        setTimeout(()=>{
                            this.goback()
                        },1500)
                    }else {
                        this.isSubmit = true ;
                    }
                })
                .catch(err=>{
                    this.isSubmit = true ;
                })
                
            }
        })
    }
    componentWillUnmount(){
        this.props.clearDetailAction()
    }
    render(){
        var {userInfo,id} = this.state
        return (
            <div className={"npd-project-create mb52"}>
                <ProjectInfo {...this.props} userInfo={userInfo} id={id}></ProjectInfo>
                <NtsMarketplaceInfo {...this.props} id={id}></NtsMarketplaceInfo>
                <Btnwrap>
                    <Button onClick={this.goback} className="margin-ms-right">取消</Button>
                    <Button onClick={this.getParams} type="primary" className="margin-ms-right">确认</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default Form.create()(App)