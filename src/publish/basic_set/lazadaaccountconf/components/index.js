import React from 'react'
import Search from "./newSearch"
import Tablelist from "./tablelist"
import "../css/css.css"

export default class App extends React.Component {
    componentWillMount(){
        this.getList()
    }
    state = {
    }
    getList = (params)=>{
        if(!params){
            params = this.props.paramsData
        }
        this.props.getListActionAsync(params)
    }
    render(){
        return (
            <div className="lazadaaccountconf">
                <Search {...this.props} getList={this.getList}></Search>
                <Tablelist {...this.props} getList={this.getList}></Tablelist>
            </div>
        )
    }
}