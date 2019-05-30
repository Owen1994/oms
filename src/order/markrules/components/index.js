import React, { Component } from 'react'
import {
    Modal,
    message
} from 'antd'
import Search from './newSearch'   // 高级搜索组件
import Tablelist from "./tablelist"
import Warehouserule from "./warehouserule"
import '../css/css.css'
import {TYPEJSON} from "../constants/json"
class App extends Component {

    state = {
        ordervisible:false,
        solevisible:0,
        soleData:null,
        ordermodal:{
            title: "新增标记规则",
            ModalContent: '内容',
            ruleId:null ,
            visible: false,
        }
    }
    componentWillMount(){
        console.log(11111111111)
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel', key: 'newChannelCode'},false)
        this.props.getCommonSelectData({url: '/oms/order/grab/motan/OrderBadgeApi/getListLogisticsService', key: 'newServiceCode'},false)
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData', key: 'newCountryCode'},false)
        this.props.getCommonSelectData({url: '/oms/order/manage/motan/IOrderManageConfigApi/getPackageStatusList', key: 'newPackageStatus'},false)

        this.getListData()
        this.getPlatform()
    }
    changeOrdermodal = (params)=>{
        var {ordermodal} = this.state;
        this.setState({
            ordermodal:{
                ...ordermodal,
                ...params
            }
        })
    }
    getPlatform = ()=>{
        this.props.getPlatformActionAsync()
        .then(result=>{
            if(result){
                TYPEJSON[0].list = result.data
                this.setState({})
            }
        })
    }
    changeModal = (code,f)=>{
        this.setState({
            [code]:f
        })
    }
    // 获取列表数据
    getListData = ()=>{
        var {tableDataActionAsync,npdProjecListData} = this.props
        var params = npdProjecListData.params
        tableDataActionAsync(params)
    }
    render() {
        var {ordermodal} = this.state
        return (
            <div>
                <Search
                    {...this.props}
                />
                <div className="margin-sm-top">
                    <Tablelist
                    {...this.props}
                    changeOrdermodal={this.changeOrdermodal}
                    changeModal= {this.changeModal}
                    />
                </div>
                <Warehouserule
                {...this.props}
                getListData={this.getListData}
                changeOrdermodal={this.changeOrdermodal}
                warehouserule={ordermodal}>
                </Warehouserule>
            </div>
        )
    }
}

export default App
