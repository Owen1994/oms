import React from 'react';
import {
    Button,
    message
} from 'antd'
import ProjectInfo from "../../common/component/projectInfo"
import NtsMarketplaceInfo from "../../common/component/ntsMarketplaceInfo"
import Supplier from "./supplier"
import Btnwrap from "../../../../common/components/btnwrap/index"
import { getUrlParams} from '../../../../../util/baseTool';
class App extends React.Component {
    componentWillMount(){
        var {getProductDetailAsync,classifyInfoActionAsync} = this.props
        var params = this.props.location.search
        params = getUrlParams(params)
        var id = params.id && Number(params.id)
        getProductDetailAsync({id})
    }
    
    state = {
        checkedList:[]
    }
    goback=()=>{
        var { history } = this.props
        history.goBack()
    }
    generationSamples = (list)=>{
        var {checkSpecimenSubmitActionAsync,projectInfo} = this.props
        return checkSpecimenSubmitActionAsync({id:projectInfo.id,list})
    }
    soleSubmit = (record)=>{
        this.generationSamples([record.id])
        .then(result=>{
            if(result){
                let {checkedList} = this.state;
                var {projectInfo} = this.props
                var {supplier} = projectInfo
                var i = checkedList.indexOf(record)
                if(i >-1){
                    checkedList.splice(i,1)
                }
                record.state = "2001"
                this.setState({})
                
            }
        })
    }
    submit = ()=>{
        var {checkedList} = this.state
        if(!checkedList || !checkedList.length) return message.warning("请先选择生成项")
        var ids = checkedList.map(v=>v.id)
        this.generationSamples(ids)
        .then(result=>{
            if(result){
                checkedList.forEach(v=>{
                    v.state = "2001"
                })
                this.setState({checkedList:[]})
            }
        })
    }
    changeCheckedList = (data,v)=>{
        var {checkedList} = this.state
        if(v){
            checkedList.push(data)
        }else {
            var i = checkedList.indexOf(data)
            if(i >-1){
                checkedList.splice(i,1)
            }
        }
        this.setState({
            checkedList:[...checkedList]
        })
    }
    componentWillUnmount(){
        this.props.clearDetailAction()
    }
    render(){
        var {checkedList} = this.state
        return (
            <div className={"npd-project-create mb52"}>
                <ProjectInfo {...this.props} ></ProjectInfo>
                <NtsMarketplaceInfo {...this.props}></NtsMarketplaceInfo>
                <Supplier 
                {...this.props} 
                checkedList={checkedList} 
                soleSubmit={this.soleSubmit}
                changeCheckedList={this.changeCheckedList}>
                </Supplier>
                <Btnwrap>
                    <Button onClick={this.submit} type="primary" className="margin-ms-right">批量生成样品</Button>
                    <Button onClick={this.goback} type="primary" className="margin-ms-right">返回</Button>
                </Btnwrap>
            </div>
        )
    }
}

export default App