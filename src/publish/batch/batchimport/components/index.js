import React from 'react'
import Search from "./newSearch"
import Tablelist from "./tablelist"
import Modal from "./modal"
import "../css/css.css"

export default class App extends React.Component {
    componentWillMount(){
        this.getList()
    }
    componentWillUnmount(){
        this.props.resetListParamsAction()
    }
    state = {
        visible:false
    }
    modalCancel = ()=>{
        this.setState({visible:false})
    }
    modalShow = ()=>{
        this.setState({visible:true})
    }
    getList = (params)=>{
        if(!params){
            params = this.props.paramsData
        }
        this.props.getListActionAsync(params)
    }
    render(){
        var {modalCancel,modalShow} =this
        var {visible} =this.state
        return (
            <div className="publish-batch">
                <Search {...this.props} getList={this.getList}></Search>
                <Tablelist modalShow={modalShow} {...this.props} getList={this.getList}></Tablelist>
                <Modal visible={visible} modalCancel={modalCancel} getList={this.getList} {...this.props}></Modal>
            </div>
        )
    }
}