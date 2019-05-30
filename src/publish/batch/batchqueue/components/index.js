import React from 'react'
import Search from "./newSearch"
import Tablelist from "./tablelist"
import "../css/css.css"
import { message, Form } from "antd"

class App extends React.Component {
    componentWillMount() {
        this.getList()
    }
    componentWillUnmount() {
        this.props.resetListParamsAction()
    }

    getParams = () => {
        var { paramsData } = this.props
        const value = this.props.form.getFieldsValue();
        const obj = {
            ...paramsData
        };
        Object.keys(value).forEach(k => {
            if (value[k]) {
                obj[k] = value[k]
            }else {
                delete obj[k]
            }
        })
        if (!obj.createTime || !obj.createTime.length) {
            delete obj.createTime
        } else {
            obj.createTime = [
                obj.createTime[0].valueOf(),
                obj.createTime[1].valueOf()
            ]
        }

        if(!obj.searchContent){
            delete obj.searchType
        }else {
            obj.searchContent = obj.searchContent.split("\n").filter(v => !!v).map(v => v.trim())
        }
        return obj
    }
    
    getList = (params) => {
        if (!params) {
            params = this.getParams();
        }
        this.props.getListActionAsync(params)
    }
    render() {
        return (
            <div className="publish-batch">
                <Search getParams={this.getParams} {...this.props} getList={this.getList}></Search>
                <Tablelist getParams={this.getParams} {...this.props}></Tablelist>
            </div>
        )
    }
}


export default Form.create()(App)